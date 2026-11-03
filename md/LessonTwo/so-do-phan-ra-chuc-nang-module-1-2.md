# SƠ ĐỒ PHÂN RÃ CHỨC NĂNG (FDD) - MODULE 01 & MODULE 02

> **Tài liệu phân rã chức năng (Functional Decomposition Diagram):** Hệ thống quản lý kho tập trung Công ty ABC (file đề bài: `md/LessonTwo/bài_tập_api.txt`).
> **File sơ đồ đồ họa tương ứng:** `drawio/LessonTwo/FDD.drawio`

---

## 1. Cấu trúc cây phân rã chức năng 3 cấp (FDD Tree)

### [0] Hệ thống quản lý kho tập trung Công ty ABC (Module 01 & Module 02)

#### 1. Quản lý người dùng và phân quyền (Module 01)
* **1.1 Xác thực và phiên làm việc (`auth` / `refresh_tokens`)**
  * 1.1.1 Đăng nhập hệ thống (Xác thực số điện thoại, mật khẩu `sha512` và cấp Access/Refresh Token)
  * 1.1.2 Cấp mới phiên làm việc (Xác thực Refresh Token và cấp Access Token mới)
  * 1.1.3 Đăng xuất hệ thống (Vô hiệu hóa Refresh Token và kết thúc phiên)
* **1.2 Quản lý tài khoản nhân viên (`employees`)**
  * 1.2.1 Tạo mới tài khoản nhân viên (Thiết lập mã nhân viên, họ tên, số điện thoại, mật khẩu khởi tạo)
  * 1.2.2 Cập nhật thông tin tài khoản (Chỉnh sửa họ tên, số điện thoại)
  * 1.2.3 Khóa hoặc mở khóa tài khoản nhân viên (Quản lý trạng thái hoạt động `status`)
* **1.3 Phân quyền vai trò hệ thống (`roles`)**
  * 1.3.1 Thiết lập danh mục vai trò (`ADMIN`, `WAREHOUSE_MANAGER`, `WAREHOUSE_STAFF`, `ACCOUNTANT`)
  * 1.3.2 Gán hoặc thay đổi vai trò cho nhân viên (`role_id`)
  * 1.3.3 Kiểm tra quyền truy cập tài nguyên API (RBAC Guard)
* **1.4 Gán nhân viên phụ trách kho (`employees.warehouse_ids`)**
  * 1.4.1 Phân công danh sách kho làm việc cho nhân viên (`warehouse_ids`)
  * 1.4.2 Điều chỉnh hoặc gỡ bỏ quyền phụ trách kho
  * 1.4.3 Kiểm tra phạm vi dữ liệu theo kho phân công (Warehouse Scope Guard)

#### 2. Quản lý danh mục nền tảng (Module 02 - Master Data)
* **2.1 Quản lý cơ sở kho hàng (`warehouses`)**
  * 2.1.1 Khởi tạo danh mục kho hàng (Quản lý danh sách 3 kho: Mã kho `ID`, tên kho, địa chỉ, SĐT, `branch_id`)
  * 2.1.2 Cập nhật thông tin vận hành kho hàng
  * 2.1.3 Khóa hoặc ngừng hoạt động kho hàng (`status`)
* **2.2 Quản lý nhà cung cấp (`customers` - `type = 2`)**
  * 2.2.1 Lưu trữ hồ sơ nhà cung cấp (Mã NCC `ID`, tên, mã số thuế, SĐT, địa chỉ, email)
  * 2.2.2 Cập nhật thông tin giao dịch và liên hệ
  * 2.2.3 Quản lý trạng thái hợp tác của nhà cung cấp (`status`)
* **2.3 Quản lý hồ sơ khách hàng (`customers` - `type = 1, 3`: khách hàng & khách thợ)**
  * 2.3.1 Tạo mới hồ sơ khách hàng (Mã KH `ID`, tên khách hàng, SĐT, email, địa chỉ giao hàng)
  * 2.3.2 Cập nhật thông tin liên hệ khách hàng
  * 2.3.3 Tra cứu hồ sơ và quản lý trạng thái khách hàng (`status`)
* **2.4 Quản lý thông tin sản phẩm (`subcategories` - Bảng sản phẩm chung)**
  * 2.4.1 Khởi tạo hồ sơ sản phẩm (Tên sản phẩm, danh mục `category_id`, đơn vị tính `unit_id`, mã `sku`, giá bán, bảo hành)
  * 2.4.2 Cập nhật thông tin sản phẩm và chính sách giá
  * 2.4.3 Chuyển đổi trạng thái kinh doanh của sản phẩm (`status`)
* **2.5 Quản lý danh mục sản phẩm (`categories`: Pin, RAM, CPU, Main...)**
  * 2.5.1 Thiết lập cấu trúc danh mục đa cấp cha - con (`parent_id`)
  * 2.5.2 Cập nhật tên và phân cấp danh mục
  * 2.5.3 Ẩn hoặc xóa danh mục sản phẩm chưa sử dụng (`status`)
* **2.6 Quản lý đơn vị tính (`units`)**
  * 2.6.1 Khai báo đơn vị tính hàng hóa (Tên ĐVT: cái, chiếc, hộp, bộ...)
  * 2.6.2 Chỉnh sửa thông tin đơn vị tính
  * 2.6.3 Vô hiệu hóa đơn vị tính không còn áp dụng (`status`)
* **2.7 Quản lý mã SKU và tra cứu mã quét (`subcategories.sku` / `products.ID`)**
  * 2.7.1 Khai báo và kiểm soát mã sản phẩm chung `sku` (`default: null`) trên `subcategories`
  * 2.7.2 Quy ước mã QR / Barcode cá thể (`products.ID`: mã NCC hoặc `timestamp` `Date.now` khi nhập kho)
  * 2.7.3 Tra cứu và định danh sản phẩm qua mã quét (`/subcategories/lookup`)

---

## 2. Ma trận đối chiếu Chức năng FDD & Phân quyền Actor (RBAC Matrix)

| STT | Mã FDD | Tên chức năng Cấp 2 | Admin | Warehouse Manager | Warehouse Staff | Accountant |
|---|---|---|:---:|:---:|:---:|:---:|
| 1 | 1.1 | Xác thực và phiên làm việc | Full | Full | Full | Full |
| 2 | 1.2 | Quản lý tài khoản nhân viên | Full | - | - | - |
| 3 | 1.3 | Phân quyền vai trò hệ thống | Full | - | - | - |
| 4 | 1.4 | Gán nhân viên phụ trách kho | Full | - | - | - |
| 5 | 2.1 | Quản lý cơ sở kho hàng (`warehouses`) | Full | View | View (Kho gán) | View |
| 6 | 2.2 | Quản lý nhà cung cấp (`customers` type 2) | Full | View | - | View |
| 7 | 2.3 | Quản lý hồ sơ khách hàng (`customers` type 1, 3) | Full | View | - | View |
| 8 | 2.4 | Quản lý thông tin sản phẩm (`subcategories`) | Full | Full | View | View |
| 9 | 2.5 | Quản lý danh mục sản phẩm (`categories`) | Full | View | View | View |
| 10 | 2.6 | Quản lý đơn vị tính (`units`) | Full | View | View | View |
| 11 | 2.7 | Quản lý mã SKU & tra cứu mã quét (`subcategories`) | Full | Full | Quét/Tra cứu | View |

*Chú thích:*
* `Full`: Toàn quyền Tạo, Đọc, Sửa, Xóa (CRUD).
* `View`: Quyền xem / tra cứu dữ liệu (Read-only).
* `View (Kho gán)`: Chỉ xem được thông tin kho mà mình được Admin phân công phụ trách.
* `-`: Không có quyền truy cập.

---

## 3. Kiểm định chất lượng thiết kế chuẩn mực

1. **Chuẩn MECE (Không trùng lặp - Không bỏ sót):**
   * *Không trùng lặp:* Tách bạch giữa Phân hệ 1 (Con người & Quyền hạn) và Phân hệ 2 (Dữ liệu danh mục & Hàng hóa).
   * *Không bỏ sót:* Bao quát đầy đủ 100% tất cả các yêu cầu CRUD và 4 vai trò trong file đề bài `bài_tập_api.txt`.
2. **Cú pháp quy ước:** 100% tên chức năng từ Cấp 1, Cấp 2 đến Cấp 3 đều bắt đầu bằng cụm **`Động từ + Danh từ`** (như: *Xác thực phiên làm việc*, *Tạo mới tài khoản*, *Khởi tạo hồ sơ*, *Khai báo mã SKU*...).
3. **Sẵn sàng cho giai đoạn thiết kế CSDL (Mongoose):** Các chức năng Cấp 2 ở Phân hệ 1 và Phân hệ 2 ánh xạ trực tiếp sang 8 Collection trong MongoDB theo chuẩn leader (`roles`, `employees`, `refresh_tokens`, `warehouses`, `customers` [dùng chung cho KH, NCC & Khách thợ], `categories`, `units`, `subcategories` [bảng sản phẩm chung kèm `sku` `default: null`]).
