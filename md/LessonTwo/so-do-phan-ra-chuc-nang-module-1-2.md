# SƠ ĐỒ PHÂN RÃ CHỨC NĂNG (FDD) - MODULE 01 & MODULE 02

> **Tài liệu phân rã chức năng (Functional Decomposition Diagram):** Hệ thống quản lý kho tập trung Công ty ABC (file đề bài: `md/bài_tập_api-1793586028228-585016149.txt`).
> **File sơ đồ đồ họa tương ứng:** `drawio/LessonTwo/FDD.drawio`

---

## 1. Cấu trúc cây phân rã chức năng 3 cấp (FDD Tree)

### [0] Hệ thống quản lý kho tập trung Công ty ABC (Module 01 & Module 02)

#### 1. Quản lý người dùng và phân quyền (Module 01)
* **1.1 Xác thực và phiên làm việc**
  * 1.1.1 Đăng nhập hệ thống (Xác thực email, mật khẩu bcrypt và cấp Access/Refresh Token)
  * 1.1.2 Cấp mới phiên làm việc (Xác thực Refresh Token và cấp Access Token mới)
  * 1.1.3 Đăng xuất hệ thống (Vô hiệu hóa Refresh Token và kết thúc phiên)
* **1.2 Quản lý tài khoản nhân viên**
  * 1.2.1 Tạo mới tài khoản nhân viên (Thiết lập họ tên, email, mật khẩu khởi tạo)
  * 1.2.2 Cập nhật thông tin tài khoản (Chỉnh sửa số điện thoại, thông tin liên hệ)
  * 1.2.3 Khóa hoặc mở khóa tài khoản nhân viên (Quản lý trạng thái hoạt động)
* **1.3 Phân quyền vai trò hệ thống**
  * 1.3.1 Thiết lập danh mục vai trò (Admin, Warehouse Manager, Warehouse Staff, Accountant)
  * 1.3.2 Gán hoặc thu hồi vai trò cho nhân viên
  * 1.3.3 Kiểm tra quyền truy cập tài nguyên API (RBAC Guard)
* **1.4 Gán nhân viên phụ trách kho**
  * 1.4.1 Phân công danh sách kho làm việc cho nhân viên (`warehouseIds`)
  * 1.4.2 Điều chỉnh hoặc gỡ bỏ quyền phụ trách kho
  * 1.4.3 Kiểm tra phạm vi dữ liệu theo kho phân công (Warehouse Scope Guard)

#### 2. Quản lý danh mục nền tảng (Module 02 - Master Data)
* **2.1 Quản lý thông tin sản phẩm**
  * 2.1.1 Khởi tạo hồ sơ sản phẩm (Tên sản phẩm, mô tả, danh mục, đơn vị tính, NCC)
  * 2.1.2 Cập nhật thông tin sản phẩm và chính sách giá
  * 2.1.3 Chuyển đổi trạng thái kinh doanh của sản phẩm
* **2.2 Quản lý danh mục sản phẩm**
  * 2.2.1 Thiết lập cấu trúc danh mục đa cấp (Pattern Materialized Path: ancestors, path, level)
  * 2.2.2 Cập nhật tên, mã slug và phân cấp danh mục
  * 2.2.3 Ẩn hoặc xóa danh mục sản phẩm
* **2.3 Quản lý đơn vị tính**
  * 2.3.1 Khai báo đơn vị tính hàng hóa (Mã ĐVT, tên ĐVT: cái, chiếc, hộp, mét...)
  * 2.3.2 Chỉnh sửa thông tin đơn vị tính
  * 2.3.3 Vô hiệu hóa đơn vị tính không còn áp dụng
* **2.4 Quản lý nhà cung cấp**
  * 2.4.1 Lưu trữ hồ sơ nhà cung cấp (Mã NCC, tên, mã số thuế, SĐT, địa chỉ, email)
  * 2.4.2 Cập nhật thông tin giao dịch và người đại diện
  * 2.4.3 Quản lý trạng thái hợp tác của nhà cung cấp
* **2.5 Quản lý hồ sơ khách hàng**
  * 2.5.1 Tạo mới hồ sơ khách hàng (Tên khách hàng, SĐT, email, địa chỉ giao hàng)
  * 2.5.2 Cập nhật thông tin liên hệ và phân nhóm khách hàng
  * 2.5.3 Tra cứu hồ sơ và thông tin mua hàng của khách
* **2.6 Quản lý cơ sở kho hàng**
  * 2.6.1 Khởi tạo danh mục kho hàng (Quản lý danh sách 3 kho: Mã kho, tên kho, địa chỉ, thủ kho)
  * 2.6.2 Cập nhật thông tin vận hành kho
  * 2.6.3 Khóa hoặc ngừng hoạt động kho hàng
* **2.7 Quản lý mã SKU và Barcode**
  * 2.7.1 Sinh và kiểm soát tính duy nhất của mã SKU (Stock Keeping Unit)
  * 2.7.2 Khởi tạo và liên kết mã vạch Barcode với từng mặt hàng
  * 2.7.3 Tra cứu và định danh sản phẩm qua máy quét Barcode Scanner

---

## 2. Ma trận đối chiếu Chức năng FDD & Phân quyền Actor (RBAC Matrix)

| STT | Mã FDD | Tên chức năng Cấp 2 | Admin | Warehouse Manager | Warehouse Staff | Accountant |
|---|---|---|:---:|:---:|:---:|:---:|
| 1 | 1.1 | Xác thực và phiên làm việc | Full | Full | Full | Full |
| 2 | 1.2 | Quản lý tài khoản nhân viên | Full | - | - | - |
| 3 | 1.3 | Phân quyền vai trò hệ thống | Full | - | - | - |
| 4 | 1.4 | Gán nhân viên phụ trách kho | Full | - | - | - |
| 5 | 2.1 | Quản lý thông tin sản phẩm | Full | Full | View | View |
| 6 | 2.2 | Quản lý danh mục sản phẩm | Full | View | View | View |
| 7 | 2.3 | Quản lý đơn vị tính | Full | View | View | View |
| 8 | 2.4 | Quản lý nhà cung cấp | Full | View | - | View |
| 9 | 2.5 | Quản lý hồ sơ khách hàng | Full | View | - | View |
| 10 | 2.6 | Quản lý cơ sở kho hàng | Full | View | View (Kho gán) | View |
| 11 | 2.7 | Quản lý mã SKU và Barcode | Full | Full | Quét/Tra cứu | View |

*Chú thích:*
* `Full`: Toàn quyền Tạo, Đọc, Sửa, Xóa (CRUD).
* `View`: Quyền xem / tra cứu dữ liệu (Read-only).
* `View (Kho gán)`: Chỉ xem được thông tin kho mà mình được Admin phân công phụ trách.
* `-`: Không có quyền truy cập.

---

## 3. Kiểm định chất lượng thiết kế chuẩn mực

1. **Chuẩn MECE (Không trùng lặp - Không bỏ sót):**
   * *Không trùng lặp:* Tách bạch giữa Phân hệ 1 (Con người & Quyền hạn) và Phân hệ 2 (Dữ liệu danh mục & Hàng hóa).
   * *Không bỏ sót:* Bao quát đầy đủ 100% tất cả các yêu cầu CRUD và 4 vai trò trong file đề bài `bài_tập_api-1793586028228-585016149.txt`.
2. **Cú pháp quy ước:** 100% tên chức năng từ Cấp 1, Cấp 2 đến Cấp 3 đều bắt đầu bằng cụm **`Động từ + Danh từ`** (như: *Xác thực phiên làm việc*, *Tạo mới tài khoản*, *Khởi tạo hồ sơ*, *Sinh mã SKU*...).
3. **Sẵn sàng cho giai đoạn thiết kế CSDL (Mongoose):** Mỗi chức năng Cấp 2 ở Phân hệ 2 tương ứng 1-1 với 1 Collection trong MongoDB (`users`, `roles`, `categories`, `units`, `suppliers`, `customers`, `warehouses`, `products`).

