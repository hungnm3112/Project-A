# TÀI LIỆU API - MODULE 01: QUẢN LÝ NGƯỜI DÙNG VÀ PHÂN QUYỀN

> Đề bài: `md/LessonTwo/bài_tập_api.txt`. Database: `drawio/LessonTwo/Database.drawio`. Chức năng: `md/LessonTwo/so-do-phan-ra-chuc-nang-module-1-2.md` (mục 1.1 → 1.4).
> Collection Thunder Client: `drawio/LessonTwo/api/warehouse-api-module-01.postman_collection.json` (import trong Thunder Client → Collections → Import).
> Trạng thái: tài liệu thiết kế, CHƯA có code.

---

## 1. Quy ước chung

| Mục | Quy ước |
|---|---|
| Base URL | `{{base_url}}` = `http://localhost:8060/api/v1` |
| Xác thực | Header `Authorization: Bearer {{access_token}}` (trừ API đánh dấu Public) |
| Method cập nhật | Luôn dùng `PUT`, không dùng `PATCH` |
| Tên trường body / response | snake_case, trùng tên trường trong database (`role_id`, `warehouse_ids`) |
| Tham số query | `page`, `limit`, `keyword`, `status`, `roleId`, `warehouseId`, `fromDate`, `toDate` |

**Response thành công:**
```json
{ "data": { "_id": "...", "name": "..." } }
```

**Response danh sách có phân trang:**
```json
{
  "data": {
    "items": [],
    "pagination": { "page": 1, "limit": 20, "total": 100, "totalPages": 5 }
  }
}
```

**Response lỗi** (HTTP status nằm ở header, không có `statusCode` trong body):
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ",
    "details": [{ "field": "phone", "message": "Số điện thoại đã tồn tại" }]
  }
}
```

| Mã lỗi (`code`) | HTTP | Khi nào |
|---|---|---|
| `VALIDATION_ERROR` | 400 | Body / query sai định dạng |
| `UNAUTHORIZED` | 401 | Thiếu token, token sai hoặc hết hạn, sai số điện thoại / mật khẩu |
| `FORBIDDEN` | 403 | Không đủ quyền, hoặc tài khoản đã bị khóa (`status = 0`) |
| `NOT_FOUND` | 404 | Không tìm thấy bản ghi |
| `CONFLICT` | 409 | Trùng `ID` hoặc `phone` |
| `TOO_MANY_REQUESTS` | 429 | Gọi đăng nhập quá 5 lần / 60 giây |

## 2. Danh sách API

| # | Method | Endpoint | Chức năng (FDD) | Quyền |
|---|---|---|---|---|
| 1 | POST | `/auth/login` | 1.1.1 Đăng nhập | Public |
| 2 | POST | `/auth/refresh-token` | 1.1.2 Cấp mới phiên làm việc | Public |
| 3 | POST | `/auth/logout` | 1.1.3 Đăng xuất | Đã đăng nhập |
| 4 | GET | `/employees` | 1.2 Danh sách nhân viên | Admin |
| 5 | GET | `/employees/:id` | 1.2 Chi tiết nhân viên | Admin |
| 6 | POST | `/employees` | 1.2.1 Tạo tài khoản nhân viên | Admin |
| 7 | PUT | `/employees/:id` | 1.2.2 Cập nhật thông tin tài khoản | Admin |
| 8 | PUT | `/employees/:id/status` | 1.2.3 Khóa / mở khóa tài khoản | Admin |
| 9 | GET | `/roles` | 1.3.1 Danh sách vai trò | Admin |
| 10 | GET | `/roles/:id` | 1.3.1 Chi tiết vai trò | Admin |
| 11 | PUT | `/roles/:id` | 1.3.1 Cập nhật tên, quyền của vai trò | Admin |
| 12 | PUT | `/employees/:id/role` | 1.3.2 Gán vai trò cho nhân viên | Admin |
| 13 | PUT | `/employees/:id/warehouses` | 1.4.1, 1.4.2 Gán / gỡ kho phụ trách | Admin |
| 14 | PUT | `/employees/:id/password` | 1.2.4 Đặt lại mật khẩu nhân viên | Admin |
| 15 | PUT | `/auth/password` | 1.2.5 Đổi mật khẩu của chính mình | Đã đăng nhập |

> 4 vai trò (`ADMIN`, `WAREHOUSE_MANAGER`, `WAREHOUSE_STAFF`, `ACCOUNTANT`) được seed sẵn khi khởi tạo hệ thống, nên không có API tạo / xóa vai trò.
> Nhân viên không bị xóa cứng, chỉ khóa bằng `status = 0` (quy ước 3.3 của leader).

## 3. Chi tiết từng API

### 3.1. POST `/auth/login` - Đăng nhập
**Body:**
```json
{ "phone": "0901234567", "password": "123456" }
```
**Xử lý:** tìm nhân viên theo `phone` → so khớp mật khẩu sha512 → kiểm tra `status = 1` → tạo access token (15-30 phút) và refresh token (7 ngày) → lưu refresh token vào `refresh_tokens`.

**200 OK:**
```json
{
  "data": {
    "access_token": "eyJhbGciOi...",
    "refresh_token": "d2f1c3...",
    "employee": {
      "_id": "6720f1a2b3c4d5e6f7a8b901",
      "ID": "NV001",
      "name": "Nguyễn Văn A",
      "phone": "0901234567",
      "role": { "_id": "6720f1a2b3c4d5e6f7a8b801", "ID": "WAREHOUSE_STAFF", "name": "Nhân viên kho" },
      "warehouse_ids": ["6720f1a2b3c4d5e6f7a8b701"]
    }
  }
}
```
**Lỗi:** 400, 401 (sai số điện thoại / mật khẩu), 403 (tài khoản bị khóa), 429.

### 3.2. POST `/auth/refresh-token` - Cấp mới phiên làm việc
**Body:** `{ "refresh_token": "d2f1c3..." }`

**Xử lý:** tìm token trong `refresh_tokens` có `status = 1` và chưa quá `expired_at` → thu hồi token cũ (`status = 0`) → cấp access token và refresh token mới.

**200 OK:** `{ "data": { "access_token": "...", "refresh_token": "..." } }`

**Lỗi:** 400, 401 (token không tồn tại, đã thu hồi hoặc hết hạn).

### 3.3. POST `/auth/logout` - Đăng xuất
**Body:** `{ "refresh_token": "d2f1c3..." }`

**Xử lý:** chuyển refresh token về `status = 0`.

**200 OK:** `{ "data": { "message": "Đăng xuất thành công" } }`

**Lỗi:** 401.

### 3.4. GET `/employees` - Danh sách nhân viên
**Query:** `page=1&limit=20&keyword=nguyen&status=1&roleId=...&warehouseId=...&fromDate=2026-11-01&toDate=2026-11-30`
- `keyword`: tìm trong `unsign_search` (tên, ID, số điện thoại — lưu cả có dấu và không dấu).
- `fromDate`, `toDate`: lọc theo `createdAt`.

**200 OK:** danh sách có phân trang, mỗi phần tử gồm `_id, ID, name, phone, role, warehouse_ids, status, createdAt`. Không bao giờ trả `password`.

### 3.5. GET `/employees/:id` - Chi tiết nhân viên
**200 OK:** thông tin nhân viên, kèm `role` và danh sách kho (`warehouses: [{ _id, ID, name }]`).

**Lỗi:** 400 (`id` sai định dạng ObjectId), 404.

### 3.6. POST `/employees` - Tạo tài khoản nhân viên
**Body:**
```json
{
  "ID": "NV001",
  "name": "Nguyễn Văn A",
  "phone": "0901234567",
  "password": "123456",
  "role_id": "6720f1a2b3c4d5e6f7a8b801",
  "warehouse_ids": ["6720f1a2b3c4d5e6f7a8b701"]
}
```
| Trường | Bắt buộc | Kiểm tra |
|---|---|---|
| ID | Có | String, không trùng |
| name | Có | String, không chứa thẻ HTML |
| phone | Có | Số điện thoại hợp lệ, không trùng |
| password | Có | Tối thiểu 6 ký tự, lưu dạng sha512 |
| role_id | Có | ObjectId, vai trò tồn tại và đang hoạt động |
| warehouse_ids | Không | Mảng ObjectId, các kho tồn tại; mặc định `[]` |

**Xử lý:** sinh `unsign_search` (lưu cả có dấu và không dấu) từ tên, ID, số điện thoại; `status = 1`.

**201 Created:** thông tin nhân viên vừa tạo (không có `password`).

**Lỗi:** 400, 404 (vai trò / kho không tồn tại), 409 (trùng `ID` hoặc `phone`).

### 3.7. PUT `/employees/:id` - Cập nhật thông tin tài khoản
**Body (gửi trường nào cập nhật trường đó):** `{ "name": "Nguyễn Văn B", "phone": "0907654321" }`

Không cập nhật `password`, `role_id`, `warehouse_ids`, `status` ở API này (đã có API riêng). Cập nhật lại `unsign_search`.

**200 OK:** thông tin sau cập nhật. **Lỗi:** 400, 404, 409 (trùng `phone`).

### 3.8. PUT `/employees/:id/status` - Khóa / mở khóa tài khoản
**Body:** `{ "status": 0 }` (`0` khóa, `1` mở khóa)

**Xử lý:** khi khóa, thu hồi toàn bộ refresh token đang hiệu lực của nhân viên. Admin không được tự khóa chính mình.

**200 OK:** `{ "data": { "_id": "...", "status": 0 } }`. **Lỗi:** 400, 403 (tự khóa chính mình), 404.

### 3.9. GET `/roles` - Danh sách vai trò
**200 OK:** danh sách có phân trang theo quy tắc chung. **Query:** `page=1&limit=20&keyword=quan ly&status=1&fromDate=2026-11-01&toDate=2026-11-30` (`keyword` tìm theo `ID`, `name`). Mỗi phần tử: `{ "_id": "...", "ID": "ADMIN", "name": "Quản trị viên", "permissions": [], "status": 1 }`. Hệ thống seed sẵn 4 vai trò.

### 3.10. GET `/roles/:id` - Chi tiết vai trò
**200 OK:** thông tin vai trò. **Lỗi:** 400, 404.

### 3.11. PUT `/roles/:id` - Cập nhật vai trò
**Body:** `{ "name": "Quản lý kho", "permissions": ["subcategories.read", "subcategories.write", "warehouses.read", "customers.read"] }`

Không cho sửa `ID` của vai trò (code đang dùng `ID` để kiểm tra quyền). Mỗi phần tử `permissions` phải thuộc danh mục quyền chuẩn ở mục 5, gửi mã ngoài danh mục trả 400.

**200 OK:** vai trò sau cập nhật. **Lỗi:** 400, 404.

### 3.12. PUT `/employees/:id/role` - Gán vai trò
**Body:** `{ "role_id": "6720f1a2b3c4d5e6f7a8b802" }`

**200 OK:** `{ "data": { "_id": "...", "role": { "_id": "...", "ID": "WAREHOUSE_MANAGER", "name": "Quản lý kho" } } }`

**Lỗi:** 400, 404 (nhân viên / vai trò không tồn tại).

### 3.13. PUT `/employees/:id/warehouses` - Gán kho phụ trách
**Body:** `{ "warehouse_ids": ["6720f1a2b3c4d5e6f7a8b701", "6720f1a2b3c4d5e6f7a8b702"] }`

**Xử lý:** thay toàn bộ danh sách kho phụ trách bằng mảng gửi lên. Gửi `[]` để gỡ hết kho.

**200 OK:** `{ "data": { "_id": "...", "warehouses": [{ "_id": "...", "ID": "KHO01", "name": "Kho Hà Nội" }] } }`

**Lỗi:** 400, 404 (nhân viên / kho không tồn tại).

## 4. Kiểm tra phạm vi kho (FDD 1.4.3)
Áp dụng cho các API nghiệp vụ kho ở các module sau: nhân viên có vai trò `WAREHOUSE_STAFF` chỉ được thao tác với dữ liệu thuộc các kho nằm trong `warehouse_ids` của mình, ngược lại trả 403.



## 3b. API bổ sung: mật khẩu (FDD 1.2.4, 1.2.5)

### 3.14. PUT `/employees/:id/password` - Đặt lại mật khẩu nhân viên
**Quyền:** Admin. Dùng khi nhân viên quên mật khẩu.

**Body:** `{ "password": "Abc@1234" }` (bắt buộc, tối thiểu 6 ký tự)

**Xử lý:** lưu mật khẩu mới dạng sha512 → thu hồi toàn bộ refresh token đang hiệu lực của nhân viên (`status = 0`) để bắt buộc đăng nhập lại.

**200 OK:** `{ "data": { "_id": "...", "message": "Đặt lại mật khẩu thành công" } }`. **Lỗi:** 400, 401, 403, 404.

### 3.15. PUT `/auth/password` - Đổi mật khẩu của chính mình
**Quyền:** đã đăng nhập (mọi vai trò). Nhân viên lấy từ access token, không truyền `id`.

**Body:** `{ "old_password": "123456", "new_password": "Abc@1234" }`

**Xử lý:** so khớp `old_password` (sha512) → `new_password` tối thiểu 6 ký tự và khác mật khẩu cũ → lưu sha512 → thu hồi các refresh token khác của nhân viên.

**200 OK:** `{ "data": { "message": "Đổi mật khẩu thành công" } }`. **Lỗi:** 400, 401 (sai mật khẩu cũ).

## 5. Danh mục quyền chuẩn (`roles.permissions`)

Mã quyền có dạng `<resource>.<action>`. `action` gồm `read` (xem), `write` (tạo, sửa, đổi trạng thái), `delete` (xóa). Mọi giá trị trong `permissions` phải thuộc bảng dưới.

| Resource | Bảng DB | Quyền hợp lệ |
|---|---|---|
| `employees` | `employees` | `employees.read`, `employees.write` |
| `roles` | `roles` | `roles.read`, `roles.write` |
| `branches` | `branches` | `branches.read`, `branches.write`, `branches.delete` |
| `warehouses` | `warehouses` | `warehouses.read`, `warehouses.write`, `warehouses.delete` |
| `customers` | `customers` | `customers.read`, `customers.write`, `customers.delete` |
| `categories` | `categories` | `categories.read`, `categories.write`, `categories.delete` |
| `units` | `units` | `units.read`, `units.write`, `units.delete` |
| `subcategories` | `subcategories` | `subcategories.read`, `subcategories.write`, `subcategories.delete` |
| `type-payments` | `type_payments` | `type-payments.read`, `type-payments.write`, `type-payments.delete` |
| `content-payments` | `content_payments` | `content-payments.read`, `content-payments.write`, `content-payments.delete` |

> `employees` và `roles` không có quyền `delete` vì nhân viên chỉ khóa, vai trò được seed sẵn.
