# TÀI LIỆU API - MODULE 02: QUẢN LÝ DANH MỤC

> Đề bài: `drawio/LessonTwo/bài_tập_api.txt`. Database: `drawio/LessonTwo/Database.drawio`. Chức năng: `md/LessonTwo/so-do-phan-ra-chuc-nang-module-1-2.md` (mục 2.1 → 2.7).
> Collection Thunder Client: `md/LessonTwo/api/warehouse-api-module-02.postman_collection.json`. Environment dùng chung: `md/LessonTwo/api/warehouse-api.postman_environment.json`.
> Quy ước chung (base URL, token, response, mã lỗi): giống Module 01, xem `md/LessonTwo/api-module-01.md` mục 1.
> Trạng thái: tài liệu thiết kế, CHƯA có code.

---

## 1. Quy ước riêng của Module 02

| Mục | Quy ước |
|---|---|
| Tên endpoint | Trùng tên collection: `/warehouses`, `/categories`, `/units`, `/customers`, `/subcategories` |
| Sản phẩm | "CRUD sản phẩm" của đề bài = collection `subcategories` (mẫu sản phẩm, chứa `sku`, `barcode`). Không dùng `/products` vì tên này dành cho bảng sản phẩm cuối + QR ở module nhập kho |
| Nhà cung cấp | Lưu chung trong `customers`, phân biệt bằng `type` (1 khách hàng, 2 nhà cung cấp) |
| Khóa / mở khóa | `PUT /:id/status` với body `{ "status": 0 }` hoặc `{ "status": 1 }` |
| Xóa | `DELETE /:id` chỉ xóa được khi bản ghi chưa được bản ghi khác tham chiếu; nếu đã được dùng trả 409 `CONFLICT` và phải khóa bằng `status = 0` |
| Danh sách | Luôn có `page`, `limit`, `keyword` (tìm trong `unsign_search` hoặc `name`), `status`, `fromDate`, `toDate` (lọc theo `createdAt`) |
| Sinh `unsign_search` | Service tự sinh mỗi lần tạo / sửa, client không gửi |

**Phân quyền** (theo ma trận RBAC trong FDD):

| Resource | Admin | Warehouse Manager | Warehouse Staff | Accountant |
|---|:---:|:---:|:---:|:---:|
| warehouses | Toàn quyền | Xem | Xem kho được gán | Xem |
| categories | Toàn quyền | Xem | Xem | Xem |
| units | Toàn quyền | Xem | Xem | Xem |
| customers (khách hàng + nhà cung cấp) | Toàn quyền | Xem | Không | Xem |
| subcategories (sản phẩm, SKU, barcode) | Toàn quyền | Toàn quyền | Xem, tra cứu barcode | Xem |

## 2. Danh sách API

| # | Method | Endpoint | Chức năng (FDD) |
|---|---|---|---|
| **Kho hàng** | | | **2.1** |
| 1 | GET | `/warehouses` | Danh sách kho |
| 2 | GET | `/warehouses/:id` | Chi tiết kho |
| 3 | POST | `/warehouses` | 2.1.1 Tạo kho |
| 4 | PUT | `/warehouses/:id` | 2.1.2 Cập nhật kho |
| 5 | PUT | `/warehouses/:id/status` | 2.1.3 Khóa / mở khóa kho |
| 6 | DELETE | `/warehouses/:id` | Xóa kho chưa sử dụng |
| **Khách hàng / nhà cung cấp** | | | **2.2, 2.3** |
| 7 | GET | `/customers` | Danh sách (lọc `type`) |
| 8 | GET | `/customers/:id` | Chi tiết |
| 9 | POST | `/customers` | 2.2.1, 2.3.1 Tạo khách hàng / nhà cung cấp |
| 10 | PUT | `/customers/:id` | 2.2.2, 2.3.2 Cập nhật |
| 11 | PUT | `/customers/:id/status` | 2.2.3 Khóa / mở khóa |
| 12 | DELETE | `/customers/:id` | Xóa bản ghi chưa sử dụng |
| **Danh mục sản phẩm** | | | **2.5** |
| 13 | GET | `/categories` | Danh sách (lọc `parentId`) |
| 14 | GET | `/categories/tree` | Cây danh mục |
| 15 | GET | `/categories/:id` | Chi tiết |
| 16 | POST | `/categories` | 2.5.1 Tạo danh mục |
| 17 | PUT | `/categories/:id` | 2.5.2 Cập nhật tên, danh mục cha |
| 18 | PUT | `/categories/:id/status` | 2.5.3 Ẩn / hiện danh mục |
| 19 | DELETE | `/categories/:id` | 2.5.3 Xóa danh mục |
| **Đơn vị tính** | | | **2.6** |
| 20 | GET | `/units` | Danh sách |
| 21 | GET | `/units/:id` | Chi tiết |
| 22 | POST | `/units` | 2.6.1 Tạo đơn vị tính |
| 23 | PUT | `/units/:id` | 2.6.2 Cập nhật |
| 24 | PUT | `/units/:id/status` | 2.6.3 Vô hiệu hóa / kích hoạt |
| 25 | DELETE | `/units/:id` | Xóa đơn vị tính chưa sử dụng |
| **Sản phẩm, SKU, barcode** | | | **2.4, 2.7** |
| 26 | GET | `/subcategories` | Danh sách sản phẩm |
| 27 | GET | `/subcategories/lookup` | 2.7.3 Tra cứu theo SKU / barcode (máy quét) |
| 28 | GET | `/subcategories/:id` | Chi tiết sản phẩm |
| 29 | POST | `/subcategories` | 2.4.1, 2.7.1, 2.7.2 Tạo sản phẩm kèm SKU, barcode |
| 30 | PUT | `/subcategories/:id` | 2.4.2 Cập nhật sản phẩm, SKU, barcode |
| 31 | PUT | `/subcategories/:id/status` | 2.4.3 Ngừng / mở kinh doanh |
| 32 | DELETE | `/subcategories/:id` | Xóa sản phẩm chưa phát sinh giao dịch |

> Thứ tự khai báo route trong NestJS: `/categories/tree` và `/subcategories/lookup` phải khai báo trước `/:id` để không bị nhận nhầm là `id`.

## 3. Chi tiết theo từng resource

### 3.1. Kho hàng - `/warehouses`

**Body tạo (POST):**
```json
{
  "ID": "KHO01",
  "name": "Kho Hà Nội",
  "phone": "0241234567",
  "address": "Số 1 Cầu Giấy, Hà Nội",
  "branch_id": null
}
```
| Trường | Bắt buộc | Kiểm tra |
|---|---|---|
| ID | Có | String, không trùng |
| name | Có | String, không chứa thẻ HTML |
| phone | Không | Số điện thoại hợp lệ |
| address | Không | String |
| branch_id | Không | ObjectId hoặc `null` (mặc định `null`) |

- **PUT `/:id`:** gửi trường nào cập nhật trường đó (trừ `status`).
- **GET danh sách:** nhân viên `WAREHOUSE_STAFF` chỉ nhận các kho có trong `warehouse_ids` của mình; gọi `GET /:id` kho khác trả 403.
- **DELETE:** trả 409 nếu kho đang được gán cho nhân viên (`employees.warehouse_ids`).
- **Lỗi:** 400, 401, 403, 404, 409 (trùng `ID`).

**201 / 200:**
```json
{ "data": { "_id": "6720f1a2b3c4d5e6f7a8b701", "ID": "KHO01", "name": "Kho Hà Nội", "phone": "0241234567", "address": "Số 1 Cầu Giấy, Hà Nội", "branch_id": null, "status": 1, "createdAt": "2026-11-02T10:00:00.000Z", "updatedAt": "2026-11-02T10:00:00.000Z" } }
```

### 3.2. Khách hàng / nhà cung cấp - `/customers`

**Body tạo (POST):**
```json
{
  "ID": "NCC001",
  "type": 2,
  "name": "Công ty TNHH Linh Kiện Việt",
  "phone": "0281234567",
  "gender": 0,
  "birthday": null,
  "address": ["12 Lý Thường Kiệt, Q.10, TP.HCM"],
  "email": "lienhe@linhkienviet.vn",
  "tax": "0312345678"
}
```
| Trường | Bắt buộc | Kiểm tra |
|---|---|---|
| ID | Có | String, không trùng |
| type | Có | `1` khách hàng, `2` nhà cung cấp |
| name | Có | String, không chứa thẻ HTML |
| phone | Có | Số điện thoại hợp lệ |
| gender | Không | Number, mặc định `0` |
| birthday | Không | Date (ISO) hoặc `null` |
| address | Không | Mảng String, mặc định `[]` |
| email | Không | Email hợp lệ |
| tax | Không | String (mã số thuế) |

- **GET danh sách:** thêm query `type=1` (khách hàng) hoặc `type=2` (nhà cung cấp); `keyword` tìm theo tên, mã, số điện thoại.
- **PUT `/:id`:** không cho đổi `type` sau khi tạo.
- **DELETE:** trả 409 nếu đã phát sinh chứng từ (áp dụng khi có module nhập / xuất).
- **Lỗi:** 400, 401, 403 (`WAREHOUSE_STAFF` không có quyền), 404, 409 (trùng `ID`).

### 3.3. Danh mục sản phẩm - `/categories`

**Body tạo (POST):**
```json
{ "name": "Laptop Gaming", "parent_id": "6720f1a2b3c4d5e6f7a8b601" }
```
| Trường | Bắt buộc | Kiểm tra |
|---|---|---|
| name | Có | String, không chứa thẻ HTML |
| parent_id | Không | ObjectId của danh mục đang hoạt động, hoặc `null` (danh mục gốc) |

- **GET `/categories`:** query thêm `parentId` (lấy danh mục con trực tiếp; `parentId=null` lấy danh mục gốc).
- **GET `/categories/tree`:** trả cây lồng nhau:
  ```json
  { "data": [{ "_id": "...", "name": "Laptop", "children": [{ "_id": "...", "name": "Laptop Gaming", "children": [] }] }] }
  ```
- **PUT `/:id`:** đổi `parent_id` không được trỏ về chính nó hoặc danh mục con của nó (trả 400).
- **DELETE:** trả 409 nếu còn danh mục con hoặc còn sản phẩm (`subcategories.category_id`).
- **Lỗi:** 400, 401, 403, 404 (danh mục cha không tồn tại), 409.

### 3.4. Đơn vị tính - `/units`

**Body tạo (POST):** `{ "name": "Chiếc" }`

| Trường | Bắt buộc | Kiểm tra |
|---|---|---|
| name | Có | String, không trùng (không phân biệt hoa thường) |

- **DELETE:** trả 409 nếu còn sản phẩm dùng đơn vị tính này.
- **Lỗi:** 400, 401, 403, 404, 409 (trùng `name`).

### 3.5. Sản phẩm, SKU, barcode - `/subcategories`

**Body tạo (POST):**
```json
{
  "category_id": "6720f1a2b3c4d5e6f7a8b602",
  "unit_id": "6720f1a2b3c4d5e6f7a8b501",
  "name": "Laptop ASUS ROG Strix G16",
  "sku": "LAP-ASUS-G16-001",
  "barcode": "8934567890123",
  "price": 32990000,
  "warranty": 24
}
```
| Trường | Bắt buộc | Kiểm tra |
|---|---|---|
| category_id | Có | ObjectId, danh mục tồn tại và đang hoạt động |
| unit_id | Có | ObjectId, đơn vị tính tồn tại và đang hoạt động |
| name | Có | String, không chứa thẻ HTML |
| sku | Có | String, chỉ gồm chữ, số, `-`, `_`; lưu chữ hoa; không trùng |
| barcode | Không | String số (EAN-8 / EAN-13 / UPC); không trùng; mặc định `null` |
| price | Không | Number ≥ 0, mặc định `0` |
| warranty | Không | Number ≥ 0 (tháng), mặc định `0` |

- **GET danh sách:** query thêm `categoryId`, `unitId`; `keyword` tìm theo tên, SKU, barcode. Mỗi phần tử trả kèm `category: { _id, name }` và `unit: { _id, name }`.
- **GET `/subcategories/lookup?code=8934567890123`:** tìm chính xác theo `barcode` hoặc `sku`, dùng cho máy quét. Trả 1 sản phẩm hoặc 404.
- **PUT `/:id`:** gửi trường nào cập nhật trường đó; đổi `sku` / `barcode` vẫn kiểm tra trùng.
- **DELETE:** trả 409 nếu sản phẩm đã phát sinh phiếu nhập / xuất (áp dụng khi có module nhập / xuất).
- **Lỗi:** 400, 401, 403, 404 (danh mục / đơn vị tính không tồn tại), 409 (trùng `sku` hoặc `barcode`).

**201 / 200:**
```json
{
  "data": {
    "_id": "6720f1a2b3c4d5e6f7a8b401",
    "category": { "_id": "6720f1a2b3c4d5e6f7a8b602", "name": "Laptop Gaming" },
    "unit": { "_id": "6720f1a2b3c4d5e6f7a8b501", "name": "Chiếc" },
    "name": "Laptop ASUS ROG Strix G16",
    "sku": "LAP-ASUS-G16-001",
    "barcode": "8934567890123",
    "price": 32990000,
    "warranty": 24,
    "status": 1,
    "createdAt": "2026-11-02T10:00:00.000Z",
    "updatedAt": "2026-11-02T10:00:00.000Z"
  }
}
```

