# SƠ ĐỒ PHÂN RÃ CHỨC NĂNG (FDD) - MODULE 01 & MODULE 02

> **Tài liệu phân rã chức năng (Functional Decomposition Diagram):** Hệ thống quản lý kho tập trung Công ty ABC / Laptop24h (file đề bài: `md/LessonTwo/bài_tập_api.txt`).
> **File sơ đồ đồ họa tương ứng:** `drawio/LessonTwo/FDD.drawio`
> **Đồng bộ thiết kế Database:** `drawio/LessonTwo/Database.drawio`, `md/LessonTwo/thiet-ke-database-bai-tap-2.md`

---

## 1. Cấu trúc cây phân rã chức năng 3 cấp (FDD Tree — Chuẩn MECE Đơn nhiệm)

> **Nguyên tắc MECE:** Mỗi nhánh Cấp 2 chỉ quản lý **đúng 1 đối tượng / chức năng độc lập**, tuyệt đối không gộp 2 thực thể vào chung 1 ô và không lặp lại cùng 1 nghiệp vụ ở 2 nhánh khác nhau.

### [0] Hệ thống quản lý kho tập trung Công ty ABC / Laptop24h (Module 01 & Module 02)

#### 1. Quản lý người dùng và phân quyền (Module 01)
* **1.1 Xác thực và phiên làm việc (`refresh_tokens`)**
  * 1.1.1 Đăng nhập hệ thống (Xác thực số điện thoại, mật khẩu `sha512` và cấp Access/Refresh Token)
  * 1.1.2 Cấp mới phiên làm việc (Kiểm tra hạn Refresh Token, thu hồi token cũ và cấp cặp Token mới)
  * 1.1.3 Đăng xuất hệ thống (Vô hiệu hóa Refresh Token về trạng thái ngừng hiệu lực và kết thúc phiên)
* **1.2 Quản lý tài khoản nhân viên (`employees`)**
  * 1.2.1 Tạo mới tài khoản nhân viên (Thiết lập mã nhân viên, họ tên, số điện thoại, mật khẩu `sha512`)
  * 1.2.2 Cập nhật hồ sơ nhân viên (Chỉnh sửa họ tên, số điện thoại và tự động đồng bộ từ khóa tìm kiếm)
  * 1.2.3 Khóa hoặc mở khóa tài khoản nhân viên (Thu hồi toàn bộ phiên đăng nhập khi khóa; không xóa cứng)
  * 1.2.4 Đặt lại mật khẩu nhân viên (Admin cấp mật khẩu mới, thu hồi toàn bộ phiên cũ)
  * 1.2.5 Đổi mật khẩu của chính mình (Xác thực mật khẩu cũ, lưu mật khẩu mới dạng `sha512`)
* **1.3 Phân quyền vai trò hệ thống (`roles`)**
  * 1.3.1 Thiết lập danh mục 4 vai trò (`ADMIN`, `WAREHOUSE_MANAGER`, `WAREHOUSE_STAFF`, `ACCOUNTANT` và danh sách quyền)
  * 1.3.2 Gán hoặc thay đổi vai trò cho nhân viên (`role_id`)
  * 1.3.3 Kiểm soát quyền truy cập tài nguyên API theo vai trò (RBAC Guard)
* **1.4 Gán nhân viên phụ trách kho (`employees.warehouse_ids`)**
  * 1.4.1 Phân công danh sách kho làm việc cụ thể cho từng nhân viên (`warehouse_ids`)
  * 1.4.2 Điều chỉnh hoặc gỡ bỏ danh sách kho phụ trách của nhân viên
  * 1.4.3 Kiểm soát phạm vi dữ liệu kho được phép truy cập (Warehouse Scope Guard)

#### 2. Quản lý danh mục nền tảng (Module 02 - Master Data)
* **2.8 Quản lý chi nhánh hoạt động (`branches`)**
  * 2.8.1 Khởi tạo hồ sơ chi nhánh (Mã chi nhánh, tên chi nhánh, địa chỉ hoạt động)
  * 2.8.2 Cập nhật thông tin tên và địa chỉ chi nhánh
  * 2.8.3 Ngừng hoạt động hoặc xóa chi nhánh chưa có kho hàng và phiếu nhập kho trực thuộc
* **2.1 Quản lý cơ sở kho hàng (`warehouses`)**
  * 2.1.1 Khởi tạo danh mục kho hàng (Mã kho, tên kho, số điện thoại, địa chỉ, gán chi nhánh trực thuộc)
  * 2.1.2 Cập nhật thông tin liên hệ và địa chỉ vận hành kho hàng
  * 2.1.3 Khóa/mở khóa hoạt động hoặc xóa kho chưa phát sinh nhân viên phụ trách và phiếu nhập kho
* **2.2 Quản lý nhà cung cấp (`customers` - `type = 2`)**
  * 2.2.1 Tạo mới hồ sơ nhà cung cấp (Mã nhà cung cấp, tên đơn vị, SĐT, mã số thuế, địa chỉ, email)
  * 2.2.2 Cập nhật thông tin giao dịch và địa chỉ liên hệ của nhà cung cấp
  * 2.2.3 Khóa/mở khóa hợp tác hoặc xóa nhà cung cấp chưa phát sinh phiếu nhập kho, thanh toán, công nợ
* **2.3 Quản lý hồ sơ khách hàng (`customers` - `type = 1` Khách lẻ, `type = 3` Khách thợ)**
  * 2.3.1 Tạo mới hồ sơ khách hàng theo nhóm Khách lẻ hoặc Khách thợ (Mã KH, tên, SĐT, giới tính, ngày sinh, địa chỉ)
  * 2.3.2 Cập nhật thông tin liên hệ và danh sách địa chỉ nhận hàng
  * 2.3.3 Khóa/mở khóa trạng thái hoặc xóa hồ sơ khách hàng chưa phát sinh giao dịch, công nợ
* **2.9 Quản lý hình thức thanh toán (`type_payments`)**
  * 2.9.1 Khai báo danh mục hình thức thanh toán động (Tiền mặt, chuyển khoản, quẹt thẻ...)
  * 2.9.2 Cập nhật tên hình thức thanh toán
  * 2.9.3 Kích hoạt/ngừng sử dụng hoặc xóa hình thức thanh toán chưa gắn với phiếu thanh toán nào
* **2.4 Quản lý thông tin sản phẩm chung (`subcategories`)**
  * 2.4.1 Khởi tạo hồ sơ mẫu sản phẩm chung (Tên sản phẩm, danh mục loại hàng, đơn vị tính, giá bán, bảo hành)
  * 2.4.2 Cập nhật thông tin sản phẩm, chính sách giá bán niêm yết và thời hạn bảo hành (tháng)
  * 2.4.3 Ngừng/mở kinh doanh hoặc xóa mẫu sản phẩm chưa phát sinh phiếu nhập kho và cá thể hàng hóa
* **2.5 Quản lý danh mục sản phẩm (`categories`: Pin, RAM, CPU, Main...)**
  * 2.5.1 Thiết lập cấu trúc danh mục loại sản phẩm đa cấp cha - con (`parent_id`)
  * 2.5.2 Cập nhật tên danh mục và điều chỉnh phân cấp danh mục cha (chống trỏ vòng lặp)
  * 2.5.3 Ẩn/hiện trạng thái hoặc xóa danh mục chưa có danh mục con và chưa gắn sản phẩm nào
* **2.6 Quản lý đơn vị tính (`units`)**
  * 2.6.1 Khai báo danh mục đơn vị tính hàng hóa không trùng lặp (Cái, chiếc, thanh, bộ, hộp...)
  * 2.6.2 Chỉnh sửa tên đơn vị tính
  * 2.6.3 Vô hiệu hóa/kích hoạt hoặc xóa đơn vị tính chưa được sử dụng bởi sản phẩm nào
* **2.7 Quản lý mã SKU và tra cứu mã quét (`subcategories.sku` & `products.ID`)**
  * 2.7.1 Khai báo, cập nhật và kiểm soát tính duy nhất của mã SKU trên mẫu sản phẩm chung (mặc định để trống)
  * 2.7.2 Liên kết định danh với mã QR cá thể từng chiếc sản phẩm (tự sinh theo mã NCC hoặc thời gian thực khi nhập kho)
  * 2.7.3 Quét và tra cứu nhanh thông tin sản phẩm qua máy quét mã SKU hoặc mã QR cá thể (`/subcategories/lookup`)
* **2.10 Quản lý nội dung thanh toán (`content_payments`)**
  * 2.10.1 Khai báo danh mục nội dung thanh toán động (Thanh toán nhà cung cấp, thanh toán phòng ban nội bộ...)
  * 2.10.2 Cập nhật tên nội dung thanh toán
  * 2.10.3 Kích hoạt/ngừng sử dụng hoặc xóa nội dung thanh toán chưa gắn với phiếu thanh toán nào

---

## 2. Ma trận đối chiếu Chức năng FDD & Phân quyền Actor (RBAC Matrix)

| STT | Mã FDD | Tên chức năng Cấp 2 (Đơn nhiệm) | Bảng DB tương ứng | Admin | Warehouse Manager | Warehouse Staff | Accountant |
|---|---|---|---|:---:|:---:|:---:|:---:|
| 1 | 1.1 | Xác thực và phiên làm việc | `refresh_tokens` | Full | Full | Full | Full |
| 2 | 1.2 | Quản lý tài khoản nhân viên | `employees` | Full | - | - | - |
| 3 | 1.3 | Phân quyền vai trò hệ thống | `roles` | Full | - | - | - |
| 4 | 1.4 | Gán nhân viên phụ trách kho | `employees.warehouse_ids` | Full | - | - | - |
| 5 | 2.8 | Quản lý chi nhánh hoạt động | `branches` | Full | View | View | View |
| 6 | 2.1 | Quản lý cơ sở kho hàng | `warehouses` | Full | View | View (Kho gán) | View |
| 7 | 2.2 | Quản lý nhà cung cấp | `customers` (`type = 2`) | Full | View | - | View |
| 8 | 2.3 | Quản lý hồ sơ khách hàng (Khách lẻ & Khách thợ) | `customers` (`type = 1, 3`) | Full | View | - | View |
| 9 | 2.9 | Quản lý hình thức thanh toán | `type_payments` | Full | View | - | Full / View |
| 10 | 2.4 | Quản lý thông tin sản phẩm chung | `subcategories` | Full | Full | View | View |
| 11 | 2.5 | Quản lý danh mục sản phẩm | `categories` | Full | View | View | View |
| 12 | 2.6 | Quản lý đơn vị tính | `units` | Full | View | View | View |
| 13 | 2.7 | Quản lý mã SKU và tra cứu mã quét | `subcategories.sku` / `products.ID` | Full | Full | Quét/Tra cứu | View |
| 14 | 2.10 | Quản lý nội dung thanh toán | `content_payments` | Full | View | - | Full / View |

*Chú thích:*
* `Full`: Toàn quyền Tạo, Đọc, Sửa, Khóa/Xóa (CRUD).
* `View`: Quyền xem / tra cứu dữ liệu (Read-only).
* `View (Kho gán)`: Chỉ xem được thông tin kho mà mình được Admin phân công phụ trách.
* `-`: Không có quyền truy cập.
