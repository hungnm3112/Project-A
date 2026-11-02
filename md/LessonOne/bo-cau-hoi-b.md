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
| Mục tiêu 1: quản lý nhân viên | Tài khoản, vai trò, chi nhánh làm việc | Quản trị viên |
| Mục tiêu 1: quản lý khách hàng | Hồ sơ khách hàng | Nhân viên bán hàng |
| Đa kho, đa chi nhánh (Đã chốt A2) | Danh sách chi nhánh, kho hàng | Quản trị viên **[Đã xác nhận]** |
| "đổi trả hàng" | Yêu cầu đổi trả | Nhân viên bán hàng |
| Điều chỉnh tồn kho, nhập hàng | Phiếu nhập, phiếu điều chỉnh | Nhân viên kho **[Giả định]** |
| Điều chuyển kho (Đã chốt A2) | Phiếu điều chuyển kho liên chi nhánh | Nhân viên kho **[Đã xác nhận]** |

### B2. Ai tiếp nhận, xử lý các bước tiếp theo?

Vòng đời đơn hàng: (form) xác nhận → tạo đơn (kích hoạt giữ chỗ tồn) → xuất kho → giao → thanh toán → đổi trả.

| Bước | Ai đảm nhiệm | Actor |
|---|---|---|
| Liên hệ lại khách, xác nhận yêu cầu form, xin bổ sung thông tin | Nhân viên bán hàng (CSKH) **[Đã xác nhận]** | Nhân viên bán hàng |
| Duyệt đơn | **Không áp dụng** (Đã chốt A3: không cần duyệt đơn, đơn chuyển thẳng sang Kho và Kế toán) | *(Không có)* |
| Chuẩn bị, xuất kho, giao hàng | Nhân viên kho, Nhân viên bán hàng (cập nhật giao hàng) | Nhân viên kho, Nhân viên bán hàng |
| Điều chuyển hàng giữa các kho/chi nhánh | Nhân viên kho **[Đã xác nhận A2]** | Nhân viên kho |
| Thu tiền, ghi nhận thanh toán | Kế toán | Kế toán |
| Kiểm hàng trả, nhập lại kho | Nhân viên kho, Kế toán | Nhân viên kho, Kế toán |
| Hoàn tiền | Kế toán | Kế toán |

### B3. Ai xem báo cáo, giám sát, ra quyết định?

| Bằng chứng | Actor |
|---|---|
| "Người quản lý phải tổng hợp dữ liệu thủ công để lập báo cáo" | Quản lý |
| Theo dõi công nợ, doanh thu, hiệu quả từng nhân viên theo từng chi nhánh và toàn công ty (Đã chốt A2) | Quản lý, Kế toán |

### B4. Khách hàng tương tác trực tiếp hay gián tiếp?

- **[Đã xác nhận]** Kênh **form đặt hàng website**: khách **trực tiếp** gửi dữ liệu vào hệ thống (yêu cầu đặt hàng chờ xác nhận). Nhân viên bán hàng (CSKH) liên hệ lại để xác nhận, xin bổ sung thông tin.
- Kênh **Zalo, cửa hàng, điện thoại**: khách liên hệ gián tiếp, Nhân viên bán hàng đặt hộ đơn.
- Khách **không** có đăng nhập, theo dõi đơn hay tài khoản (ngoài mục tiêu). Actor không cần cổng đăng nhập, chỉ cần đưa dữ liệu vào hệ thống.
- **Kết luận:** Khách hàng là **Actor** (một hành động [Khách hàng - 01] Gửi form đặt hàng). Đồng thời hồ sơ khách là **Entity** do [Bán hàng - 04] quản lý.

### B5. Có trao đổi dữ liệu với hệ thống ngoài không?

- **[Đã xác nhận ở Bộ A]** Không có. Không tích hợp đơn vị vận chuyển hay cổng thanh toán.
- Giao hàng do Nhân viên kho và Nhân viên bán hàng cập nhật trạng thái; thanh toán do Kế toán ghi nhận trực tiếp.
- Kết quả: **không có Actor hệ thống ngoài.**

### B6. Có nghiệp vụ nào tự chạy theo thời gian không?

- **[Đã xác nhận A1]** Nhả tồn giữ chỗ khi đơn hết hạn: tự động hoàn trả số lượng khả dụng nếu đơn giữ chỗ quá thời gian quy định.
- **[Giả định]** Cảnh báo tồn kho tối thiểu, tổng hợp báo cáo cuối ngày.
- **[Đã xác nhận]** Các tác vụ này chạy bên trong hệ thống nên **không phải Actor**. Chúng được ghi ở mục 5 như chức năng của hệ thống.

### B7. Ai quản trị tài khoản, phân quyền, cấu hình?

- **[Đã xác nhận ở Bộ A]** Quản trị viên tạo tài khoản, phân quyền (từ mục tiêu 1 "quản lý nhân viên"), cấu hình danh mục, sản phẩm, chi nhánh và kho hàng.

---

## 2. Danh sách Actor chuẩn hóa (6 Actor)

| # | Actor | Loại | Xuất hiện ở |
|---|---|---|---|
| 1 | Khách hàng | Người gửi form đặt hàng website | B1, B4 |
| 2 | Nhân viên bán hàng (gồm CSKH) | Người nhập liệu, xác nhận form, đặt hộ đơn Zalo/cửa hàng/điện thoại | B1, B2 |
| 3 | Nhân viên kho | Người xử lý vận hành | B1, B2 |
| 4 | Kế toán | Người xử lý tài chính và công nợ | B2, B3 |
| 5 | Quản lý | Người giám sát và ra quyết định | B2, B3 |
| 6 | Quản trị viên | Quản trị tài khoản, danh mục, sản phẩm, chi nhánh và kho hàng | B1, B7 |

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

> **Quy tắc định danh mã hành động rõ nghĩa:** Toàn bộ mã hành động được chuẩn hóa dưới dạng đầy đủ `[Tên vai trò - STT]` (ví dụ: `[Khách hàng - 01]`, `[Bán hàng - 02]`, `[Kho - 07]`, `[Quản trị - 04]`, `[Tự động - 01]`) thay vì dùng ký hiệu viết tắt 2-3 chữ cái (như `[BH1]`, `[QT4]`) dễ gây nhầm lẫn và khó theo dõi.
> Mỗi hành động một dòng, tên = **động từ + danh từ**. Trên DFD Level 0 mỗi hành động có 1 mũi tên **Input** (nhãn = tên action kèm mã) và 1 mũi tên **Output** (nhãn = "Kết quả" + tên action kèm mã). Hai cột **Dữ liệu Input / Dữ liệu Output** liệt kê dữ liệu cụ thể để hiểu rõ và làm đầu vào cho FDD / đặc tả chức năng, KHÔNG ghi trên DFD Level 0. Mã hành động dùng chung với `drawio/Actor.drawio`.

| Actor | Mã | Hành động | Nhãn Input (DFD) | Dữ liệu Input (Actor gửi vào) | Nhãn Output (DFD) | Dữ liệu Output (Actor nhận lại) |
|---|---|---|---|---|---|---|
| **1. Khách hàng** | [Khách hàng - 01] | Gửi form đặt hàng | [Khách hàng - 01] Gửi form đặt hàng | Tên, SĐT, địa chỉ, sản phẩm và số lượng, ghi chú | [Khách hàng - 01] Kết quả gửi form đặt hàng | Xác nhận đã nhận yêu cầu, mã yêu cầu |
| **2. Nhân viên bán hàng (gồm CSKH)** | [Bán hàng - 01] | Tra cứu tồn kho (liên chi nhánh) | [Bán hàng - 01] Tra cứu tồn kho | Mã / tên sản phẩm, chi nhánh / kho cần tra cứu | [Bán hàng - 01] Kết quả tra cứu tồn kho | Tồn thực tế (On-hand), tồn đang giữ chỗ (Reserved), tồn khả dụng (Available) theo từng kho |
| | [Bán hàng - 02] | Tạo đơn hàng (đặt hộ Zalo / cửa hàng / điện thoại) | [Bán hàng - 02] Tạo đơn hàng | Thông tin khách đã xác nhận, sản phẩm, số lượng, kênh bán, chi nhánh xử lý | [Bán hàng - 02] Kết quả tạo đơn hàng | Mã đơn hàng, trạng thái giữ chỗ tồn kho, cảnh báo nếu vượt tồn khả dụng |
| | [Bán hàng - 03] | Xử lý yêu cầu đặt hàng (từ form) | [Bán hàng - 03] Xử lý yêu cầu đặt hàng | Mã yêu cầu, thông tin bổ sung đã xác nhận, chi nhánh xử lý, xác nhận / hủy | [Bán hàng - 03] Kết quả xử lý yêu cầu đặt hàng | Danh sách yêu cầu form chờ xử lý, mã đơn (kèm giữ chỗ tồn), cảnh báo vượt tồn |
| | [Bán hàng - 04] | Quản lý khách hàng | [Bán hàng - 04] Quản lý khách hàng | Tên, số điện thoại, địa chỉ | [Bán hàng - 04] Kết quả quản lý khách hàng | Hồ sơ khách, lịch sử mua hàng, công nợ hiện tại |
| | [Bán hàng - 05] | Tạo yêu cầu đổi trả | [Bán hàng - 05] Tạo yêu cầu đổi trả | Mã đơn cũ, sản phẩm trả, lý do | [Bán hàng - 05] Kết quả tạo yêu cầu đổi trả | Phiếu yêu cầu đổi trả (mã phiếu) |
| | [Bán hàng - 06] | Cập nhật trạng thái giao hàng | [Bán hàng - 06] Cập nhật trạng thái giao hàng | Mã đơn, trạng thái giao thực tế / xác nhận của khách | [Bán hàng - 06] Kết quả cập nhật trạng thái giao hàng | Xác nhận đã cập nhật trạng thái đơn |
| **3. Nhân viên kho** | [Kho - 01] | Quản lý sản phẩm (tạo, sửa) | [Kho - 01] Quản lý sản phẩm | Tên, mã, giá, danh mục sản phẩm | [Kho - 01] Kết quả quản lý sản phẩm | Hồ sơ sản phẩm đã lưu |
| | [Kho - 02] | Nhập kho | [Kho - 02] Nhập kho | Mã sản phẩm, số lượng nhập, chứng từ nhập, kho nhận | [Kho - 02] Kết quả nhập kho | Phiếu nhập kho, tồn sau nhập của kho |
| | [Kho - 03] | Xuất kho (chuẩn bị hàng) | [Kho - 03] Xuất kho | Mã đơn cần xuất, kho xuất, số lượng thực xuất | [Kho - 03] Kết quả xuất kho | Danh sách đơn chờ xuất, phiếu xuất kho |
| | [Kho - 04] | Cập nhật trạng thái giao hàng | [Kho - 04] Cập nhật trạng thái giao hàng | Mã đơn, trạng thái giao thực tế | [Kho - 04] Kết quả cập nhật trạng thái giao hàng | Xác nhận đã cập nhật trạng thái đơn |
| | [Kho - 05] | Kiểm kê kho (điều chỉnh tồn) | [Kho - 05] Kiểm kê kho | Kho kiểm kê, số lượng thực tế, lý do chênh lệch | [Kho - 05] Kết quả kiểm kê kho | Biên bản kiểm kê, phiếu điều chỉnh tồn kho |
| | [Kho - 06] | Kiểm tra hàng trả | [Kho - 06] Kiểm tra hàng trả | Mã phiếu đổi trả, tình trạng hàng trả, kho nhập lại | [Kho - 06] Kết quả kiểm tra hàng trả | Biên bản kiểm hàng, phiếu nhập lại kho |
| | [Kho - 07] | Điều chuyển kho liên chi nhánh | [Kho - 07] Điều chuyển kho | Kho xuất, kho nhận, mã sản phẩm, số lượng chuyển | [Kho - 07] Kết quả điều chuyển kho | Phiếu điều chuyển kho, trạng thái xuất/nhập chuyển kho |
| **4. Kế toán** | [Kế toán - 01] | Ghi nhận thanh toán | [Kế toán - 01] Ghi nhận thanh toán | Mã đơn, số tiền thu, phương thức, chi nhánh | [Kế toán - 01] Kết quả ghi nhận thanh toán | Phiếu thu, trạng thái thanh toán của đơn |
| | [Kế toán - 02] | Hoàn tiền khách hàng | [Kế toán - 02] Hoàn tiền khách hàng | Mã phiếu đổi trả, số tiền, hình thức hoàn | [Kế toán - 02] Kết quả hoàn tiền khách hàng | Phiếu chi hoàn tiền |
| | [Kế toán - 03] | Đối soát công nợ | [Kế toán - 03] Đối soát công nợ | Khách hàng, chi nhánh, kỳ đối soát | [Kế toán - 03] Kết quả đối soát công nợ | Bảng công nợ, danh sách đơn nợ / quá hạn |
| | [Kế toán - 04] | Đối chiếu hàng trả (phần tiền) | [Kế toán - 04] Đối chiếu hàng trả | Mã phiếu đổi trả, kết quả đối chiếu hóa đơn bán | [Kế toán - 04] Kết quả đối chiếu hàng trả | Biên bản đối chiếu hàng trả, số tiền được hoàn |
| **5. Quản lý** | [Quản lý - 01] | Xem báo cáo | [Quản lý - 01] Xem báo cáo | Tiêu chí lọc (thời gian, chi nhánh, kênh bán, danh mục) | [Quản lý - 01] Kết quả xem báo cáo | Báo cáo doanh thu, lợi nhuận, tồn kho, công nợ theo chi nhánh & toàn công ty |
| | [Quản lý - 02] | Theo dõi hiệu quả nhân viên | [Quản lý - 02] Theo dõi hiệu quả nhân viên | Kỳ đánh giá, chi nhánh, nhân viên cần xem | [Quản lý - 02] Kết quả theo dõi hiệu quả nhân viên | Bảng doanh số, hiệu quả từng nhân viên theo chi nhánh |
| **6. Quản trị viên** | [Quản trị - 01] | Quản lý tài khoản (và phân quyền) | [Quản trị - 01] Quản lý tài khoản | Họ tên, email, vai trò, chi nhánh phân công | [Quản trị - 01] Kết quả quản lý tài khoản | Tài khoản đã cấp, phân quyền chi nhánh đã lưu |
| | [Quản trị - 02] | Quản lý danh mục | [Quản trị - 02] Quản lý danh mục | Tên danh mục, mã, cấp cha - con | [Quản trị - 02] Kết quả quản lý danh mục | Cây danh mục đã lưu |
| | [Quản trị - 03] | Quản lý sản phẩm (tạo, sửa) | [Quản trị - 03] Quản lý sản phẩm | Tên, mã, giá, danh mục sản phẩm | [Quản trị - 03] Kết quả quản lý sản phẩm | Hồ sơ sản phẩm đã lưu |
| | [Quản trị - 04] | Quản lý chi nhánh và kho hàng | [Quản trị - 04] Quản lý chi nhánh và kho hàng | Tên chi nhánh, địa chỉ, danh sách kho trực thuộc | [Quản trị - 04] Kết quả quản lý chi nhánh và kho hàng | Danh sách chi nhánh và kho hàng đã lưu |

Ghi chú:
- `[Kho - 01]` và `[Quản trị - 03]` là cùng một chức năng quản lý sản phẩm, cả Nhân viên kho và Quản trị viên đều được phân quyền sử dụng **[Đã xác nhận]**.
- `[Kho - 04]` và `[Bán hàng - 06]` là cùng một chức năng cập nhật trạng thái giao hàng / đơn hàng, cả Nhân viên kho (chặng gửi hàng shipper) và Nhân viên bán hàng (chặng giao tại quầy hoặc xác nhận khách đã nhận) đều được phân quyền thực hiện **[Đã xác nhận]**.

## 5. Tác vụ tự động của hệ thống (không phải Actor)

Các tác vụ này không có Actor kích hoạt trực tiếp từ bên ngoài mà chạy ngầm bên trong hệ thống. Chúng sẽ được đưa vào sơ đồ phân rã chức năng (FDD) như chức năng nội bộ.

| Mã | Tác vụ | Trạng thái | Kết quả |
|---|---|---|---|
| [Tự động - 01] | Nhả tồn giữ chỗ khi đơn hết hạn | **[Đã xác nhận A1]** | Tự động hồi phục số lượng khả dụng (Available) cho sản phẩm khi đơn hàng giữ chỗ quá hạn thanh toán/xác nhận |
| [Tự động - 02] | Cảnh báo tồn kho tối thiểu | [Giả định] | Tự động quét và cảnh báo danh sách mặt hàng sắp hết theo từng kho |
| [Tự động - 03] | Tổng hợp báo cáo cuối ngày | [Giả định] | Tổng hợp số liệu doanh thu, tồn kho theo chi nhánh phục vụ [Quản lý - 01] |

## 6. Tự kiểm tra

Với mỗi mục tiêu trong đề, hỏi "Chức năng này do ai kích hoạt?":

| Mục tiêu | Có Actor kích hoạt? |
|---|---|
| 1. Quản lý sản phẩm, danh mục, khách hàng, nhân viên, chi nhánh | Có: Nhân viên kho, Quản trị viên ([Kho - 01], [Quản trị - 01], [Quản trị - 02], [Quản trị - 03], [Quản trị - 04]); Nhân viên bán hàng ([Bán hàng - 04] khách hàng) |
| 2. Tiếp nhận đơn từ nhiều kênh | Có: Khách hàng ([Khách hàng - 01]), Nhân viên bán hàng ([Bán hàng - 02], [Bán hàng - 03]) |
| 3. Kiểm soát tồn kho & điều chuyển kho | Có: Nhân viên bán hàng ([Bán hàng - 01], [Bán hàng - 02]), Nhân viên kho ([Kho - 02], [Kho - 03], [Kho - 05], [Kho - 07]), Hệ thống tự động ([Tự động - 01]) |
| 4. Thanh toán, giao hàng, đổi trả, hoàn tiền | Có: Kế toán ([Kế toán - 01], [Kế toán - 02], [Kế toán - 04]), Nhân viên kho ([Kho - 03], [Kho - 04], [Kho - 06]), Nhân viên bán hàng ([Bán hàng - 05], [Bán hàng - 06]) |
| 5. Theo dõi doanh thu, công nợ | Có: Quản lý ([Quản lý - 01], [Quản lý - 02]), Kế toán ([Kế toán - 03]) |
| 6. Báo cáo hỗ trợ quyết định | Có: Quản lý ([Quản lý - 01], [Quản lý - 02]) |

Kết quả: mọi mục tiêu đều có Actor kích hoạt rõ ràng, luồng dữ liệu minh bạch, không phát hiện thiếu Actor.

---

## 7. Kết quả áp dụng từ 3 quyết định đã chốt

| Quyết định | Kết quả áp dụng vào mô hình hệ thống |
|---|---|
| **A1: Áp dụng cơ chế giữ chỗ tồn kho** | Chính thức đưa tác vụ `[Tự động - 01]` vào hệ thống. Các hành động tạo đơn `[Bán hàng - 02]`, `[Bán hàng - 03]` đều tự động kích hoạt tính toán tồn khả dụng thời gian thực và thời hạn giữ chỗ. |
| **A2: Quản lý nhiều kho, nhiều chi nhánh** | Bổ sung hành động `[Quản trị - 04]` (Quản lý chi nhánh & kho hàng), `[Kho - 07]` (Điều chuyển kho). Nâng cấp `[Bán hàng - 01]` tra tồn liên chi nhánh, `[Quản lý - 01]` báo cáo lọc theo từng chi nhánh. |
| **A3: Không duyệt đơn hàng** | Loại bỏ hoàn toàn hành động duyệt đơn `[QL1]`. Đơn sau khi tạo lập chuyển thẳng sang xuất kho `[Kho - 03]` và thanh toán `[Kế toán - 01]`. Quản lý chỉ thực hiện giám sát số liệu qua `[Quản lý - 01]` và `[Quản lý - 02]`. |

