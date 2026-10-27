# BỘ B - BÓC TÁCH ACTOR: CÔNG TY TNHH ABC

> Bản nháp trả lời checklist B1-B7. Phạm vi: **nằm trong kết quả Bộ A** ([bo-cau-hoi-a.md](bo-cau-hoi-a.md)), không mở rộng ngoài đề.
> Mục đánh dấu **[Giả định]** là suy luận vì đề không nói thẳng, cần xác nhận hoặc chỉnh sửa.
> Phương pháp: xem `md/tong-hop-actor.md`.

---

## 1. Quét checklist B1-B7

### B1. Ai trực tiếp đưa dữ liệu vào hệ thống?

| Bằng chứng (trong đề / Bộ A) | Dữ liệu được tạo | Actor tìm được |
|---|---|---|
| Đơn từ website qua **form đặt hàng** | Yêu cầu đặt hàng chờ xác nhận | Khách hàng **[Đã xác nhận]** |
| Đơn từ cửa hàng, điện thoại, Zalo (nhân viên đặt hộ) | Đơn hàng đa kênh, thông tin khách | Nhân viên bán hàng (gồm CSKH) |
| Mục tiêu 1: quản lý sản phẩm | Sản phẩm | Nhân viên kho, Quản trị viên **[Đã xác nhận]** |
| Mục tiêu 1: quản lý danh mục | Danh mục | Quản trị viên **[Giả định]** |
| Mục tiêu 1: quản lý nhân viên | Tài khoản, vai trò | Quản trị viên |
| Mục tiêu 1: quản lý khách hàng | Hồ sơ khách hàng | Nhân viên bán hàng |
| "đổi trả hàng" | Yêu cầu đổi trả | Nhân viên bán hàng |
| Điều chỉnh tồn kho, nhập hàng | Phiếu nhập, phiếu điều chỉnh | Nhân viên kho **[Giả định]** |

### B2. Ai tiếp nhận, xử lý các bước tiếp theo?

Vòng đời đơn hàng: (form) xác nhận → tạo đơn → duyệt → xuất kho → giao → thanh toán → đổi trả.

| Bước | Ai đảm nhiệm | Actor |
|---|---|---|
| Liên hệ lại khách, xác nhận yêu cầu form, xin bổ sung thông tin | Nhân viên bán hàng (CSKH) **[Đã xác nhận]** | Nhân viên bán hàng |
| Duyệt đơn | Quản lý (nếu có quy tắc duyệt) **[Giả định]** | Quản lý |
| Chuẩn bị, xuất kho, giao hàng | Nhân viên kho | Nhân viên kho |
| Thu tiền, ghi nhận thanh toán | Kế toán | Kế toán |
| Kiểm hàng trả, nhập lại kho | Nhân viên kho, Kế toán | Nhân viên kho, Kế toán |
| Hoàn tiền | Kế toán | Kế toán |

### B3. Ai xem báo cáo, giám sát, ra quyết định?

| Bằng chứng | Actor |
|---|---|
| "Người quản lý phải tổng hợp dữ liệu thủ công để lập báo cáo" | Quản lý |
| Theo dõi công nợ, doanh thu, hiệu quả từng nhân viên | Quản lý, Kế toán |

### B4. Khách hàng tương tác trực tiếp hay gián tiếp?

- **[Đã xác nhận]** Kênh **form đặt hàng website**: khách **trực tiếp** gửi dữ liệu vào hệ thống (yêu cầu đặt hàng chờ xác nhận). Nhân viên bán hàng (CSKH) liên hệ lại để xác nhận, xin bổ sung thông tin.
- Kênh **Zalo, cửa hàng, điện thoại**: khách liên hệ gián tiếp, Nhân viên bán hàng đặt hộ đơn.
- Khách **không** có đăng nhập, theo dõi đơn hay tài khoản (ngoài mục tiêu). Actor không cần cổng đăng nhập, chỉ cần đưa dữ liệu vào hệ thống.
- **Kết luận:** Khách hàng là **Actor** (một hành động [KH1] Gửi form đặt hàng). Đồng thời hồ sơ khách là **Entity** do [BH4] quản lý.

### B5. Có trao đổi dữ liệu với hệ thống ngoài không?

- **[Đã xác nhận ở Bộ A]** Không có. Không tích hợp đơn vị vận chuyển hay cổng thanh toán.
- Giao hàng do Nhân viên kho cập nhật trạng thái; thanh toán do Kế toán ghi nhận trực tiếp.
- Kết quả: **không có Actor hệ thống ngoài.**

### B6. Có nghiệp vụ nào tự chạy theo thời gian không?

- **[Giả định]** Có: nhả tồn giữ chỗ hết hạn, cảnh báo tồn kho thấp, tổng hợp báo cáo cuối ngày.
- **[Đã xác nhận]** Các tác vụ này chạy bên trong hệ thống nên **không phải Actor**. Chúng được ghi ở mục 5 như chức năng của hệ thống.

### B7. Ai quản trị tài khoản, phân quyền, cấu hình?

- **[Đã xác nhận ở Bộ A]** Quản trị viên tạo tài khoản, phân quyền (từ mục tiêu 1 "quản lý nhân viên").

---

## 2. Danh sách Actor chuẩn hóa (6 Actor)

| # | Actor | Loại | Xuất hiện ở |
|---|---|---|---|
| 1 | Khách hàng | Người gửi form đặt hàng website | B1, B4 |
| 2 | Nhân viên bán hàng (gồm CSKH) | Người nhập liệu, xác nhận form, đặt hộ đơn Zalo/cửa hàng/điện thoại | B1, B2 |
| 3 | Nhân viên kho | Người xử lý vận hành | B1, B2 |
| 4 | Kế toán | Người xử lý tài chính và công nợ | B2, B3 |
| 5 | Quản lý | Người giám sát và ra quyết định | B2, B3 |
| 6 | Quản trị viên | Quản trị tài khoản, danh mục, sản phẩm | B1, B7 |

## 3. Chuẩn hóa: các thứ đã loại hoặc gộp

| Mục | Xử lý | Lý do |
|---|---|---|
| CSKH | Gộp | Chỉ là chức danh, cùng quyền với Nhân viên bán hàng |
| Cổng đăng nhập, theo dõi đơn của khách | Loại | Ngoài mục tiêu bài toán |
| Bộ lập lịch (Scheduler) | Loại | Chạy bên trong hệ thống, không đứng ngoài ranh giới. Chuyển thành chức năng hệ thống (mục 5) |
| Hóa đơn, đơn hàng, sản phẩm, kho, báo cáo | Loại | Là Entity, không phải Actor |
| Đơn vị vận chuyển, Cổng thanh toán | Loại | Không tích hợp hệ thống ngoài (đã xác nhận) |
| Sàn TMĐT | Loại | Đề không nhắc đến |
| Kỹ thuật viên, đặt lịch sửa chữa | Loại | Ngoài phạm vi đề ABC |
| Excel, phần mềm rời rạc | Loại | Là công cụ cũ sẽ được thay thế |

## 4. Bảng Actor - Hành động (nhãn cho DFD Level 0)

> Mỗi hành động một dòng, tên = **động từ + danh từ**. Trên DFD Level 0 mỗi hành động có 1 mũi tên **Input** (nhãn = tên action) và 1 mũi tên **Output** (nhãn = "Kết quả" + tên action). Hai cột **Dữ liệu Input / Dữ liệu Output** liệt kê dữ liệu cụ thể để hiểu rõ và làm đầu vào cho FDD / đặc tả chức năng, KHÔNG ghi trên DFD Level 0. Mã hành động dùng chung với `drawio/Actor.drawio`.

| Actor | Mã | Hành động | Nhãn Input (DFD) | Dữ liệu Input (Actor gửi vào) | Nhãn Output (DFD) | Dữ liệu Output (Actor nhận lại) |
|---|---|---|---|---|---|---|
| **1. Khách hàng** | [KH1] | Gửi form đặt hàng | Gửi form đặt hàng | Tên, SĐT, địa chỉ, sản phẩm và số lượng, ghi chú | Kết quả gửi form đặt hàng | Xác nhận đã nhận yêu cầu, mã yêu cầu |
| **2. Nhân viên bán hàng (gồm CSKH)** | [BH1] | Tra cứu tồn kho | Tra cứu tồn kho | Mã / tên sản phẩm | Kết quả tra cứu tồn kho | Tồn thực tế (On-hand), tồn khả dụng (Available) |
| | [BH2] | Tạo đơn hàng (đặt hộ Zalo / cửa hàng / điện thoại) | Tạo đơn hàng | Thông tin khách đã xác nhận, sản phẩm, số lượng, kênh bán | Kết quả tạo đơn hàng | Mã đơn hàng, cảnh báo nếu vượt tồn khả dụng |
| | [BH3] | Xử lý yêu cầu đặt hàng (từ form) | Xử lý yêu cầu đặt hàng | Mã yêu cầu, thông tin bổ sung đã xác nhận, xác nhận / hủy | Kết quả xử lý yêu cầu đặt hàng | Danh sách yêu cầu form chờ xử lý, mã đơn, cảnh báo vượt tồn |
| | [BH4] | Quản lý khách hàng | Quản lý khách hàng | Tên, số điện thoại, địa chỉ | Kết quả quản lý khách hàng | Hồ sơ khách, lịch sử mua hàng, công nợ hiện tại |
| | [BH5] | Tạo yêu cầu đổi trả | Tạo yêu cầu đổi trả | Mã đơn cũ, sản phẩm trả, lý do | Kết quả tạo yêu cầu đổi trả | Phiếu yêu cầu đổi trả (mã phiếu) |
| **3. Nhân viên kho** | [KHO1] | Quản lý sản phẩm (tạo, sửa) | Quản lý sản phẩm | Tên, mã, giá, danh mục sản phẩm | Kết quả quản lý sản phẩm | Hồ sơ sản phẩm đã lưu |
| | [KHO2] | Nhập kho | Nhập kho | Mã sản phẩm, số lượng nhập, chứng từ nhập | Kết quả nhập kho | Phiếu nhập kho, tồn sau nhập |
| | [KHO3] | Xuất kho (chuẩn bị hàng) | Xuất kho | Mã đơn cần xuất, số lượng thực xuất | Kết quả xuất kho | Danh sách đơn chờ xuất, phiếu xuất kho |
| | [KHO4] | Cập nhật trạng thái giao hàng | Cập nhật trạng thái giao hàng | Mã đơn, trạng thái giao thực tế | Kết quả cập nhật trạng thái giao hàng | Xác nhận đã cập nhật trạng thái đơn |
| | [KHO5] | Kiểm kê kho (điều chỉnh tồn) | Kiểm kê kho | Số lượng đếm thực tế, lý do chênh lệch | Kết quả kiểm kê kho | Biên bản kiểm kê, phiếu điều chỉnh |
| | [KHO6] | Kiểm tra hàng trả | Kiểm tra hàng trả | Mã phiếu đổi trả, tình trạng hàng trả | Kết quả kiểm tra hàng trả | Biên bản kiểm hàng, phiếu nhập lại kho |
| **4. Kế toán** | [KT1] | Ghi nhận thanh toán | Ghi nhận thanh toán | Mã đơn, số tiền thu, phương thức | Kết quả ghi nhận thanh toán | Phiếu thu, trạng thái thanh toán của đơn |
| | [KT2] | Hoàn tiền khách hàng | Hoàn tiền khách hàng | Mã phiếu đổi trả, số tiền, hình thức hoàn | Kết quả hoàn tiền khách hàng | Phiếu chi hoàn tiền |
| | [KT3] | Đối soát công nợ | Đối soát công nợ | Khách hàng, kỳ đối soát | Kết quả đối soát công nợ | Bảng công nợ, đơn còn nợ / quá hạn |
| | [KT4] | Đối chiếu hàng trả (phần tiền) | Đối chiếu hàng trả | Mã phiếu đổi trả, kết quả đối chiếu hóa đơn bán | Kết quả đối chiếu hàng trả | Biên bản đối chiếu hàng trả, số tiền được hoàn |
| **5. Quản lý** | [QL1] | Duyệt đơn hàng **[Giả định]** | Duyệt đơn hàng | Quyết định duyệt / từ chối, lý do | Kết quả duyệt đơn hàng | Danh sách đơn chờ duyệt, kết quả duyệt |
| | [QL2] | Xem báo cáo | Xem báo cáo | Tiêu chí lọc (thời gian, kênh bán, danh mục) | Kết quả xem báo cáo | Báo cáo doanh thu, lợi nhuận, tồn kho, công nợ |
| | [QL3] | Theo dõi hiệu quả nhân viên | Theo dõi hiệu quả nhân viên | Kỳ đánh giá, nhân viên cần xem | Kết quả theo dõi hiệu quả nhân viên | Bảng doanh số, hiệu quả từng nhân viên |
| **6. Quản trị viên** | [QT1] | Quản lý tài khoản (và phân quyền) | Quản lý tài khoản | Họ tên, email, vai trò | Kết quả quản lý tài khoản | Tài khoản đã cấp, quyền đã lưu |
| | [QT2] | Quản lý danh mục **[Giả định]** | Quản lý danh mục | Tên danh mục, mã, cấp cha - con | Kết quả quản lý danh mục | Cây danh mục đã lưu |
| | [QT3] | Quản lý sản phẩm (tạo, sửa) | Quản lý sản phẩm | Tên, mã, giá, danh mục sản phẩm | Kết quả quản lý sản phẩm | Hồ sơ sản phẩm đã lưu |

Ghi chú: [KHO1] và [QT3] là cùng một chức năng, cả Nhân viên kho và Quản trị viên đều được dùng **[Đã xác nhận]**.

## 5. Tác vụ tự động của hệ thống (không phải Actor)

Các tác vụ này không có Actor kích hoạt. Chúng sẽ được đưa vào sơ đồ phân rã chức năng (FDD) như chức năng nội bộ.

| Mã | Tác vụ | Kết quả |
|---|---|---|
| [TĐ1] | Nhả tồn giữ chỗ khi đơn hết hạn **[Giả định]** | Tồn khả dụng được cộng lại |
| [TĐ2] | Cảnh báo tồn kho tối thiểu **[Giả định]** | Danh sách mặt hàng sắp hết, gửi Nhân viên kho / Quản lý |
| [TĐ3] | Tổng hợp báo cáo cuối ngày **[Giả định]** | Số liệu doanh thu, tồn kho trong ngày, phục vụ [QL2] |

## 6. Tự kiểm tra

Với mỗi mục tiêu trong đề, hỏi "Chức năng này do ai kích hoạt?":

| Mục tiêu | Có Actor kích hoạt? |
|---|---|
| 1. Quản lý sản phẩm, danh mục, khách hàng, nhân viên | Có: Nhân viên kho, Quản trị viên (sản phẩm, danh mục, tài khoản nhân viên); Nhân viên bán hàng ([BH4] khách hàng) |
| 2. Tiếp nhận đơn từ nhiều kênh | Có: Khách hàng ([KH1]), Nhân viên bán hàng ([BH2], [BH3]) |
| 3. Kiểm soát tồn kho | Có: Nhân viên bán hàng ([BH1], [BH2]), Nhân viên kho ([KHO2], [KHO3], [KHO5]) |
| 4. Thanh toán, giao hàng, đổi trả, hoàn tiền | Có: Kế toán, Nhân viên kho, Nhân viên bán hàng |
| 5. Theo dõi doanh thu, công nợ | Có: Quản lý, Kế toán |
| 6. Báo cáo hỗ trợ quyết định | Có: Quản lý |

Kết quả: mọi mục tiêu đều có Actor kích hoạt, chưa phát hiện Actor thiếu.

---

## 7. Phụ thuộc vào câu hỏi còn mở của Bộ A

| Câu hỏi mở | Nếu trả lời "Không" thì thay đổi gì |
|---|---|
| Q1. Giữ chỗ tồn có thời hạn? | Bỏ tác vụ [TĐ1] |
| Q2. Nhiều kho / chi nhánh? | Thêm phân quyền theo chi nhánh cho các Actor nội bộ |
| Q3. Cần duyệt đơn? | Bỏ hành động [QL1] của Quản lý |
