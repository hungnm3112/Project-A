# SƠ ĐỒ NGỮ CẢNH TÁC NHÂN (DFD LEVEL 0) - MODULE 01 & MODULE 02

> **Tài liệu phân tích Actor cho Bài tập API:** Dành cho 2 module nền tảng của Hệ thống quản lý kho tập trung Công ty ABC (file đề bài: `md/LessonTwo/bài_tập_api.txt`).
> **File sơ đồ đồ họa tương ứng:** `drawio/LessonTwo/Actor.drawio`

---

## 1. Phạm vi phân tích (Scope)

Hệ thống quản lý kho tập trung giải quyết bài toán quản lý 3 kho hàng vật lý, bắt đầu từ 2 module nền móng:
* **Module 01: Quản lý người dùng và phân quyền (Users & RBAC):** Đăng nhập, đăng xuất, refresh token; quản lý tài khoản nhân viên; phân quyền vai trò; gán nhân viên phụ trách kho.
* **Module 02: Quản lý danh mục (Master Data Management):** CRUD Sản phẩm, Danh mục sản phẩm, Đơn vị tính, Nhà cung cấp, Khách hàng, Kho hàng; Quản lý mã SKU và Barcode.

---

## 2. Danh sách 4 Tác nhân (Actors) & Trách nhiệm hệ thống

Theo đặc tả đề bài, hệ thống có **4 vai trò (Actors)** tương tác trực tiếp với API:

| # | Actor | Tên tiếng Việt | Quyền hạn & Trách nhiệm chính trong Module 01 & 02 |
|---|---|---|---|
| 1 | **Admin** | Quản trị viên | • Toàn quyền hệ thống (Superuser).<br>• CRUD tài khoản nhân viên, gán vai trò RBAC.<br>• Gán nhân viên phụ trách kho.<br>• Quản trị toàn bộ danh mục dùng chung (Kho, Danh mục, ĐVT, Nhà cung cấp, Khách hàng, Sản phẩm). |
| 2 | **Warehouse Manager** | Quản lý kho | • Quản lý sản phẩm, mã SKU, barcode.<br>• Tra cứu toàn bộ danh mục nền tảng (Master Data) để phục vụ điều hành kho. |
| 3 | **Warehouse Staff** | Nhân viên kho | • Tra cứu thông tin sản phẩm bằng cách tìm kiếm SKU hoặc quét mã Barcode.<br>• Tra cứu danh sách kho mình được phân công phụ trách. |
| 4 | **Accountant** | Kế toán | • Xem / tra cứu toàn bộ danh mục (Sản phẩm, Kho, Khách hàng, Nhà cung cấp, Đơn vị tính) ở chế độ chỉ đọc (Read-only) phục vụ đối soát, hạch toán. |

---

## 3. Bảng Actor - Hành động (Dữ liệu Input / Output cho DFD Level 0)

Toàn bộ các hành động trên sơ đồ `drawio/LessonTwo/Actor.drawio` được chuẩn hóa theo quy tắc `[Tên vai trò - STT]` và cặp dữ liệu gửi vào / nhận lại:

### 3.1. Admin (Quản trị viên)
| Mã | Tên hành động | Dữ liệu Input (Gửi vào hệ thống) | Dữ liệu Output (Hệ thống phản hồi) |
|---|---|---|---|
| `[Quản trị - 01]` | Đăng nhập & Refresh Token | Số điện thoại, mật khẩu (hoặc Refresh Token) | Access Token (JWT), Refresh Token, thông tin quyền Admin |
| `[Quản trị - 02]` | Quản lý tài khoản nhân viên | Thông tin tài khoản (Mã NV, họ tên, sđt, trạng thái kích hoạt/khóa) | Danh sách nhân viên, thông tin chi tiết tài khoản đã lưu |
| `[Quản trị - 03]` | Phân quyền vai trò | ID nhân viên, vai trò gán (`role_id`) | Xác nhận phân quyền thành công, danh sách quyền hiệu lực |
| `[Quản trị - 04]` | Gán nhân viên phụ trách kho | ID nhân viên, danh sách ID kho hàng (`warehouse_ids`) | Danh sách kho nhân viên được phân công phụ trách |
| `[Quản trị - 05]` | Quản lý kho hàng | Mã kho, tên kho, địa chỉ, số điện thoại (CRUD 3 kho) | Danh sách kho hàng, chi tiết kho đã lưu |
| `[Quản trị - 06]` | Quản lý danh mục sản phẩm | Tên danh mục, danh mục cha (`parent_id`) | Cây danh mục sản phẩm đa cấp |
| `[Quản trị - 07]` | Quản lý đơn vị tính | Tên ĐVT (cái, chiếc, hộp, bộ...) | Danh mục đơn vị tính hợp lệ |
| `[Quản trị - 08]` | Quản lý nhà cung cấp | Mã NCC, tên NCC, mã số thuế, số điện thoại, địa chỉ, email | Hồ sơ nhà cung cấp đã lưu |
| `[Quản trị - 09]` | Quản lý khách hàng | Mã KH, tên khách hàng, số điện thoại, địa chỉ, email | Hồ sơ khách hàng đã lưu |
| `[Quản trị - 10]` | Quản lý sản phẩm & SKU/Barcode | Tên SP, danh mục, ĐVT, giá bán, bảo hành, mã SKU, Barcode | Hồ sơ sản phẩm kèm mã SKU/Barcode duy nhất |

### 3.2. Warehouse Manager (Quản lý kho)
| Mã | Tên hành động | Dữ liệu Input (Gửi vào hệ thống) | Dữ liệu Output (Hệ thống phản hồi) |
|---|---|---|---|
| `[Quản lý kho - 01]` | Đăng nhập & Refresh Token | Số điện thoại, mật khẩu (hoặc Refresh Token) | Access Token (JWT), Refresh Token, danh sách kho phụ trách |
| `[Quản lý kho - 02]` | Quản lý sản phẩm, SKU & Barcode | Thông tin sản phẩm, cấu hình mã SKU và mã vạch Barcode | Sản phẩm đã cập nhật, xác nhận mã SKU/Barcode hợp lệ |
| `[Quản lý kho - 03]` | Tra cứu danh mục Master Data | Từ khóa tìm kiếm, bộ lọc danh mục/kho/NCC | Danh sách danh mục, đơn vị tính, kho, nhà cung cấp |

### 3.3. Warehouse Staff (Nhân viên kho)
| Mã | Tên hành động | Dữ liệu Input (Gửi vào hệ thống) | Dữ liệu Output (Hệ thống phản hồi) |
|---|---|---|---|
| `[Nhân viên kho - 01]` | Đăng nhập & Refresh Token | Số điện thoại, mật khẩu (hoặc Refresh Token) | Access Token (JWT), Refresh Token, kho làm việc |
| `[Nhân viên kho - 02]` | Quét Barcode / Tra cứu SKU sản phẩm | Chuỗi mã vạch Barcode (từ máy quét) hoặc mã SKU | Chi tiết sản phẩm (Tên, danh mục, ĐVT, giá bán) |
| `[Nhân viên kho - 03]` | Tra cứu thông tin kho phụ trách | Yêu cầu xem phạm vi làm việc | Danh sách và địa chỉ kho nhân viên được phân công |

### 3.4. Accountant (Kế toán)
| Mã | Tên hành động | Dữ liệu Input (Gửi vào hệ thống) | Dữ liệu Output (Hệ thống phản hồi) |
|---|---|---|---|
| `[Kế toán - 01]` | Đăng nhập & Refresh Token | Số điện thoại, mật khẩu (hoặc Refresh Token) | Access Token (JWT), Refresh Token, quyền xem dữ liệu |
| `[Kế toán - 02]` | Tra cứu danh mục Master Data | Điều kiện lọc danh mục, NCC, khách hàng, sản phẩm | Dữ liệu danh mục phục vụ kiểm tra và đối soát chứng từ |

---

## 4. Các quy tắc nghiệp vụ cốt lõi áp dụng vào API

1. **Quy tắc xác thực (Authentication):**
   * Sử dụng JWT: Access Token (thời hạn ngắn: 15–30 phút) + Refresh Token (lưu mã hóa `sha512` trong bảng `refresh_tokens`, thời hạn 7 ngày).
   * Mật khẩu mã hóa bằng `sha512` (theo chuẩn leader trong `.agents/rules/database_design.md` mục 3.5).
2. **Quy tắc phân quyền (RBAC) & Phân quyền theo kho:**
   * Sử dụng Guard trong NestJS: `@UseGuards(JwtAuthGuard, RolesGuard)` kết hợp decorator `@Roles(...)`.
   * Nhân viên kho (`Warehouse Staff`) chỉ được phép thao tác/truy vấn dữ liệu thuộc các kho mà Admin đã gán qua mảng `warehouse_ids`.
3. **Quy tắc tính duy nhất (Uniqueness) của Master Data:**
   * Mã SKU và mã Barcode của sản phẩm (`subcategories`) là **duy nhất toàn hệ thống (Unique Index)**.
   * Mã kho hàng (`ID`), tên đơn vị tính (`name`), mã đối tác (`ID` khách hàng / nhà cung cấp) không được trùng lặp.
