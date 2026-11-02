# SƠ ĐỒ PHÂN RÃ CHỨC NĂNG (FDD) - CÔNG TY TNHH ABC

> **Tài liệu đặc tả kiến trúc chức năng:** Phân rã từ mục tiêu kinh doanh và kết quả phân tích Actor (`md/LessonOne/bo-cau-hoi-a.md`, `bo-cau-hoi-b.md`) thành cây phân rã chức năng 3 cấp hoàn chỉnh theo nguyên tắc **MECE** và cú pháp chuẩn **`Động từ + Danh từ`**.

---

## 1. Cấu trúc cây phân rã chức năng 3 cấp (FDD Tree)

### [0] Quản lý bán hàng tập trung Công ty ABC

#### 1. Quản lý đơn hàng và bán hàng
* **1.1 Gửi yêu cầu đặt hàng** (`[Khách hàng - 01]`)
  * 1.1.1 Nhập thông tin liên hệ và địa chỉ nhận hàng
  * 1.1.2 Chọn sản phẩm và số lượng đặt mua
  * 1.1.3 Gửi biểu mẫu yêu cầu đặt hàng
* **1.2 Xử lý yêu cầu đặt hàng từ website** (`[Bán hàng - 03]`)
  * 1.2.1 Tiếp nhận danh sách yêu cầu form chờ xử lý
  * 1.2.2 Xác nhận hoặc hủy yêu cầu sau tư vấn
  * 1.2.3 Chuyển đổi yêu cầu hợp lệ thành đơn hàng chính thức
* **1.3 Tạo đơn hàng đa kênh** (`[Bán hàng - 02]`)
  * 1.3.1 Chọn chi nhánh bán và kênh tiếp nhận (Cửa hàng / Điện thoại / Zalo)
  * 1.3.2 Kiểm tra tồn khả dụng và giữ chỗ tồn kho tạm thời
  * 1.3.3 Lưu thông tin đơn hàng và ghi nhận nhân viên phụ trách
* **1.4 Tra cứu tồn kho liên chi nhánh** (`[Bán hàng - 01]`)
  * 1.4.1 Tìm kiếm sản phẩm theo mã hoặc tên
  * 1.4.2 Xem số lượng tồn thực tế, đang giữ chỗ và khả dụng theo từng kho
* **1.5 Quản lý hồ sơ khách hàng** (`[Bán hàng - 04]`)
  * 1.5.1 Thêm mới và cập nhật thông tin khách hàng
  * 1.5.2 Tra cứu lịch sử mua hàng và hạn mức công nợ
* **1.6 Tạo yêu cầu đổi trả hàng** (`[Bán hàng - 05]`)
  * 1.6.1 Tra cứu đơn hàng gốc cần đổi trả
  * 1.6.2 Chọn sản phẩm, số lượng trả và ghi nhận lý do
  * 1.6.3 Phát hành phiếu yêu cầu đổi trả
* **1.7 Cập nhật trạng thái giao hàng** (`[Bán hàng - 06]` / `[Kho - 04]`)
  * 1.7.1 Cập nhật trạng thái bàn giao đơn hàng
  * 1.7.2 Xác nhận hoàn tất giao hàng cho khách
* **1.8 Giải phóng tồn kho giữ chỗ quá hạn** (`[Tự động - 01]`)
  * 1.8.1 Quét danh sách đơn hàng hết thời hạn giữ chỗ
  * 1.8.2 Hủy giữ chỗ và hoàn trả số lượng vào tồn khả dụng

#### 2. Quản lý sản phẩm và kho hàng
* **2.1 Quản lý thông tin sản phẩm** (`[Kho - 01]` / `[Quản trị - 03]`)
  * 2.1.1 Thêm mới hồ sơ và thuộc tính sản phẩm
  * 2.1.2 Cập nhật giá bán, thông số và trạng thái kinh doanh
* **2.2 Nhập kho hàng hóa** (`[Kho - 02]`)
  * 2.2.1 Lập phiếu nhập kho theo kho nhận
  * 2.2.2 Ghi nhận số lượng thực nhập và chứng từ gốc
  * 2.2.3 Cộng tồn kho thực tế và tồn khả dụng
* **2.3 Xuất kho chuẩn bị hàng** (`[Kho - 03]`)
  * 2.3.1 Tiếp nhận danh sách đơn hàng chờ xuất tại kho
  * 2.3.2 Lập phiếu xuất kho và trừ tồn thực tế (kèm giải phóng tồn giữ chỗ)
* **2.4 Kiểm kê và điều chỉnh tồn kho** (`[Kho - 05]`)
  * 2.4.1 Lập biên bản kiểm đếm số lượng thực tế tại kho
  * 2.4.2 Lập phiếu điều chỉnh chênh lệch và ghi nhận lý do
* **2.5 Kiểm tra và nhập kho hàng trả** (`[Kho - 06]`)
  * 2.5.1 Tiếp nhận hàng trả và đánh giá tình trạng vật lý
  * 2.5.2 Lập biên bản kiểm hàng và nhập lại kho tương ứng (kho tốt / kho lỗi)
* **2.6 Điều chuyển kho liên chi nhánh** (`[Kho - 07]`)
  * 2.6.1 Lập phiếu điều chuyển giữa kho xuất và kho nhận
  * 2.6.2 Xác nhận xuất chuyển kho và xác nhận nhập kho đích
* **2.7 Cảnh báo tồn kho tối thiểu** (`[Tự động - 02]`)
  * 2.7.1 Quét định kỳ số lượng tồn theo ngưỡng tối thiểu từng kho
  * 2.7.2 Phát cảnh báo danh sách mặt hàng sắp hết hàng

#### 3. Quản lý tài chính và công nợ
* **3.1 Ghi nhận thanh toán đơn hàng** (`[Kế toán - 01]`)
  * 3.1.1 Lập phiếu thu theo phương thức thanh toán (toàn phần / từng phần)
  * 3.1.2 Cập nhật trạng thái thanh toán đơn hàng và dư nợ khách hàng
* **3.2 Đối chiếu giá trị hàng trả** (`[Kế toán - 04]`)
  * 3.2.1 Đối chiếu biên bản kiểm hàng trả với hóa đơn bán gốc
  * 3.2.2 Xác định số tiền được hoàn hoặc cấn trừ công nợ
* **3.3 Hoàn tiền cho khách hàng** (`[Kế toán - 02]`)
  * 3.3.1 Lập phiếu chi hoàn tiền hoặc hạch toán giảm trừ công nợ
  * 3.3.2 Cập nhật hoàn tất hồ sơ đổi trả
* **3.4 Đối soát công nợ khách hàng** (`[Kế toán - 03]`)
  * 3.4.1 Tổng hợp dư nợ phát sinh và đã thu theo kỳ / chi nhánh
  * 3.4.2 Theo dõi danh sách khoản nợ đến hạn và quá hạn

#### 4. Báo cáo và thống kê quản trị
* **4.1 Xem báo cáo tổng hợp kinh doanh** (`[Quản lý - 01]`)
  * 4.1.1 Tra cứu báo cáo doanh thu và lợi nhuận dự kiến theo chi nhánh / kênh bán
  * 4.1.2 Tra cứu báo cáo tổng hợp tồn kho và công nợ toàn công ty
* **4.2 Theo dõi hiệu quả bán hàng nhân viên** (`[Quản lý - 02]`)
  * 4.2.1 Thống kê số lượng đơn và doanh số thực hiện theo nhân viên
  * 4.2.2 Đánh giá tỷ lệ đơn thành công và đơn đổi trả theo kỳ
* **4.3 Tổng hợp dữ liệu báo cáo cuối ngày** (`[Tự động - 03]`)
  * 4.3.1 Chốt số liệu doanh thu, công nợ và biến động tồn kho cuối ngày
  * 4.3.2 Lưu trữ dữ liệu tổng hợp phục vụ truy xuất báo cáo nhanh

#### 5. Quản trị hệ thống và danh mục dùng chung
* **5.1 Quản lý tài khoản và phân quyền** (`[Quản trị - 01]`)
  * 5.1.1 Tạo lập, khóa và cập nhật tài khoản nhân viên
  * 5.1.2 Phân quyền vai trò và gán chi nhánh làm việc
* **5.2 Quản lý danh mục ngành hàng** (`[Quản trị - 02]`)
  * 5.2.1 Thiết lập cấu trúc danh mục sản phẩm đa cấp (cha - con)
  * 5.2.2 Cập nhật thông tin và trạng thái hiển thị danh mục
* **5.3 Quản lý chi nhánh và kho hàng** (`[Quản trị - 04]`)
  * 5.3.1 Khởi tạo và cập nhật thông tin chi nhánh hoạt động
  * 5.3.2 Thiết lập danh sách kho hàng trực thuộc từng chi nhánh

---

## 2. Ma trận ánh xạ Chức năng FDD & Phân quyền Actor (Traceability Matrix)

| STT | Mã FDD | Tên chức năng Cấp 2 | Nguồn Actor / Tác vụ gốc | Vai trò được phân quyền sử dụng |
|---|---|---|---|---|
| 1 | 1.1 | Gửi yêu cầu đặt hàng | `[Khách hàng - 01]` | Khách hàng |
| 2 | 1.2 | Xử lý yêu cầu đặt hàng từ website | `[Bán hàng - 03]` | Nhân viên bán hàng |
| 3 | 1.3 | Tạo đơn hàng đa kênh | `[Bán hàng - 02]` | Nhân viên bán hàng |
| 4 | 1.4 | Tra cứu tồn kho liên chi nhánh | `[Bán hàng - 01]` | Nhân viên bán hàng |
| 5 | 1.5 | Quản lý hồ sơ khách hàng | `[Bán hàng - 04]` | Nhân viên bán hàng |
| 6 | 1.6 | Tạo yêu cầu đổi trả hàng | `[Bán hàng - 05]` | Nhân viên bán hàng |
| 7 | 1.7 | Cập nhật trạng thái giao hàng | `[Bán hàng - 06]`, `[Kho - 04]` | Nhân viên bán hàng, Nhân viên kho |
| 8 | 1.8 | Giải phóng tồn kho giữ chỗ quá hạn | `[Tự động - 01]` | Hệ thống tự động |
| 9 | 2.1 | Quản lý thông tin sản phẩm | `[Kho - 01]`, `[Quản trị - 03]` | Nhân viên kho, Quản trị viên |
| 10 | 2.2 | Nhập kho hàng hóa | `[Kho - 02]` | Nhân viên kho |
| 11 | 2.3 | Xuất kho chuẩn bị hàng | `[Kho - 03]` | Nhân viên kho |
| 12 | 2.4 | Kiểm kê và điều chỉnh tồn kho | `[Kho - 05]` | Nhân viên kho |
| 13 | 2.5 | Kiểm tra và nhập kho hàng trả | `[Kho - 06]` | Nhân viên kho |
| 14 | 2.6 | Điều chuyển kho liên chi nhánh | `[Kho - 07]` | Nhân viên kho |
| 15 | 2.7 | Cảnh báo tồn kho tối thiểu | `[Tự động - 02]` | Hệ thống tự động |
| 16 | 3.1 | Ghi nhận thanh toán đơn hàng | `[Kế toán - 01]` | Kế toán |
| 17 | 3.2 | Đối chiếu giá trị hàng trả | `[Kế toán - 04]` | Kế toán |
| 18 | 3.3 | Hoàn tiền cho khách hàng | `[Kế toán - 02]` | Kế toán |
| 19 | 3.4 | Đối soát công nợ khách hàng | `[Kế toán - 03]` | Kế toán |
| 20 | 4.1 | Xem báo cáo tổng hợp kinh doanh | `[Quản lý - 01]` | Quản lý |
| 21 | 4.2 | Theo dõi hiệu quả bán hàng nhân viên | `[Quản lý - 02]` | Quản lý |
| 22 | 4.3 | Tổng hợp dữ liệu báo cáo cuối ngày | `[Tự động - 03]` | Hệ thống tự động |
| 23 | 5.1 | Quản lý tài khoản và phân quyền | `[Quản trị - 01]` | Quản trị viên |
| 24 | 5.2 | Quản lý danh mục ngành hàng | `[Quản trị - 02]` | Quản trị viên |
| 25 | 5.3 | Quản lý chi nhánh và kho hàng | `[Quản trị - 04]` | Quản trị viên |

---

## 3. Kiểm định chất lượng thiết kế (Quality Checklist)

1. **Nguyên tắc MECE:**
   * *Mutually Exclusive (Không trùng lặp):* Mỗi chức năng Cấp 2 chỉ xuất hiện ở 1 phân hệ duy nhất. Các hành động dùng chung (`Quản lý sản phẩm`, `Cập nhật giao hàng`) được hợp nhất thành 1 ô duy nhất trên sơ đồ.
   * *Collectively Exhaustive (Không bỏ sót):* Bao quát 100% 6 mục tiêu của đề bài, 23 hành động của Actor và 3 tác vụ tự động.
2. **Cú pháp đặt tên:** 100% các ô chức năng từ Cấp 1, Cấp 2 đến Cấp 3 đều bắt đầu bằng **`Động từ + Danh từ`** (như: *Gửi yêu cầu*, *Tra cứu tồn kho*, *Nhập kho*, *Ghi nhận thanh toán*...).
3. **Phân rã luồng Đổi trả & Hoàn tiền:** Được định tuyến tuần tự và tự nhiên qua 3 phân hệ theo đúng bản chất: *Bán hàng (Khởi tạo yêu cầu) $\rightarrow$ Kho hàng (Kiểm tra & Nhập kho) $\rightarrow$ Kế toán (Đối chiếu & Hoàn tiền)*.

