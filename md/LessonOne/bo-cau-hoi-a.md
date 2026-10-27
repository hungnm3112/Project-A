# BỘ A - HIỂU BÀI TOÁN: CÔNG TY TNHH ABC

> Bản nháp trả lời 5 câu hỏi Bộ A cho Bài tập ngày 1. Nguồn: đề bài trong `md/requirement.md`.
> Các mục đánh dấu **[Giả định]** là suy luận vì đề không nói thẳng, cần xác nhận hoặc chỉnh sửa.

---

## A1. Tại sao cần làm hệ thống này?

- Công ty kinh doanh sản phẩm điện tử (máy tính, linh kiện, phụ kiện) đang quản lý bán hàng bằng Excel và phần mềm rời rạc, dẫn đến sai sót và thiếu kiểm soát.
- Ban giám đốc muốn **chuẩn hóa quy trình** từ tiếp nhận đơn hàng, giao hàng, thanh toán đến báo cáo doanh thu.
- Mục đích kinh doanh: giảm sai sót (bán vượt tồn), có số liệu tập trung để quản lý ra quyết định, theo dõi được công nợ, doanh thu và hiệu quả từng nhân viên.

## A2. Hiện tại họ đang làm như thế nào?

- Quản lý bán hàng bằng **Excel** và **một số phần mềm rời rạc**, không liên thông.
- Đơn hàng được ghi nhận ở **3 nơi**: cửa hàng, điện thoại, website, nhưng **chưa tập trung**.
- Kiểm tra tồn kho thực tế khi tư vấn khách bằng cách thủ công. **[Giả định]**
- Đổi trả, hoàn tiền, điều chỉnh tồn kho xử lý tùy từng trường hợp, không có quy trình chung.
- Quản lý **tổng hợp dữ liệu thủ công** để lập báo cáo.

## A3. Vấn đề hiện tại là gì?

| # | Vấn đề (trích đề) | Hệ quả | Mục tiêu hệ thống tương ứng |
|---|---|---|---|
| 1 | Nhân viên khó kiểm tra tồn kho thực tế khi tư vấn | Tư vấn sai, hứa hàng không có | Mục tiêu 3 |
| 2 | Đơn hàng từ cửa hàng, điện thoại, website chưa tập trung | Khó theo dõi, dễ sót đơn | Mục tiêu 2 |
| 3 | Nhiều nhân viên cùng bán một sản phẩm, dễ vượt số lượng tồn | Bán quá số hàng có | Mục tiêu 3 |
| 4 | Đổi trả, hoàn tiền, điều chỉnh tồn kho chưa có quy trình thống nhất | Sai lệch tiền và tồn kho | Mục tiêu 4 |
| 5 | Khó theo dõi công nợ, doanh thu, hiệu quả từng nhân viên | Không đánh giá được kinh doanh | Mục tiêu 5 |
| 6 | Quản lý phải tổng hợp dữ liệu thủ công để lập báo cáo | Tốn thời gian, số liệu chậm và dễ sai | Mục tiêu 6 |

Vấn đề chung: **dữ liệu phân tán, không có nguồn sự thật duy nhất, không kiểm soát được tồn kho theo thời gian thực.**

## A4. Ai sử dụng?

| Vai trò (thô) | Căn cứ trong đề | Nhu cầu chính |
|---|---|---|
| Khách hàng | "đơn hàng được ghi nhận từ ... website" | Gửi form đặt hàng trên website **[Đã xác nhận]** |
| Nhân viên bán hàng (gồm CSKH) | "nhân viên cùng bán một sản phẩm", "tư vấn khách hàng", "đơn hàng được ghi nhận từ cửa hàng, điện thoại, website" | Tra tồn kho, đặt hộ đơn Zalo/cửa hàng/điện thoại, xử lý form (liên hệ khách xác nhận, xin bổ sung), tư vấn khách, tạo yêu cầu đổi trả **[Đã xác nhận]** |
| Nhân viên kho | "điều chỉnh tồn kho", "giao hàng" **[Giả định]**; quản lý sản phẩm **[Đã xác nhận]** | Quản lý sản phẩm, nhập, xuất, kiểm kê kho |
| Kế toán | "thanh toán", "hoàn tiền", "công nợ", "đổi trả hàng" **[Giả định]** | Ghi nhận thanh toán, hoàn tiền, đối soát công nợ, kiểm hàng trả / nhập lại kho |
| Quản lý | "người quản lý phải tổng hợp dữ liệu" | Xem báo cáo doanh thu, lợi nhuận, công nợ, theo dõi hiệu quả nhân viên |
| Quản trị viên | Mục tiêu 1 "quản lý nhân viên", "quản lý sản phẩm, danh mục" | Tạo tài khoản, phân quyền, quản lý sản phẩm **[Đã xác nhận]**; quản lý danh mục **[Giả định]** |

> **Khách hàng:** Là **Actor** chỉ ở luồng **form đặt hàng website** (dữ liệu đi thẳng vào hệ thống, 1 hành động [KH1]). Với Zalo/cửa hàng/điện thoại, Nhân viên bán hàng đặt hộ đơn. Khách không có đăng nhập hay theo dõi đơn. Hồ sơ khách còn là **Entity** do nhân viên quản lý **[Đã xác nhận]**.

> **CSKH:** Chỉ là chức danh, gộp vào Nhân viên bán hàng **[Đã xác nhận]**.

> **Hệ thống ngoài:** Không có. Các tác vụ "giao hàng", "thanh toán" không tích hợp đơn vị vận chuyển hay cổng thanh toán; nhân viên xử lý và ghi nhận trực tiếp trên hệ thống **[Đã xác nhận]**.

> **Tác vụ tự chạy theo thời gian:** Nếu có (nhả tồn giữ chỗ, cảnh báo tồn thấp, báo cáo cuối ngày) thì là chức năng bên trong hệ thống, KHÔNG phải Actor **[Đã xác nhận]**.

## A5. Kết quả mong muốn là gì?

Hệ thống đạt yêu cầu khi đáp ứng 6 mục tiêu trong đề, mỗi mục tiêu kèm tiêu chí kiểm tra gợi ý:

| # | Mục tiêu (trích đề) | Tiêu chí đạt (gợi ý) |
|---|---|---|
| 1 | Quản lý tập trung sản phẩm, danh mục, khách hàng, nhân viên | Mọi dữ liệu nằm một nơi; mỗi đối tượng có hồ sơ đầy đủ |
| 2 | Tiếp nhận và quản lý đơn hàng từ nhiều kênh | Đơn từ cửa hàng, điện thoại, website cùng hiện trong một danh sách |
| 3 | Kiểm soát tồn kho, hạn chế bán vượt số lượng khả dụng | Không tạo được đơn vượt tồn khả dụng, kể cả khi nhiều người bán cùng lúc |
| 4 | Quản lý thanh toán, giao hàng, đổi trả, hoàn tiền | Mỗi đơn có trạng thái rõ ràng; đổi trả tự cập nhật tồn kho và tiền |
| 5 | Theo dõi doanh thu, lợi nhuận dự kiến, công nợ khách | Xem được doanh thu theo ngày, nhân viên; biết công nợ từng khách |
| 6 | Cung cấp báo cáo hỗ trợ quản lý ra quyết định | Báo cáo có sẵn, không cần tổng hợp tay |

---

## Đã chốt

1. Form website: **Khách hàng là Actor** ([KH1] Gửi form đặt hàng), Nhân viên bán hàng (CSKH) liên hệ lại xác nhận. Zalo/cửa hàng/điện thoại: Nhân viên bán hàng đặt hộ đơn. CSKH = Nhân viên bán hàng.
2. **Không** tích hợp cổng thanh toán và đơn vị vận chuyển → không có Actor hệ thống ngoài.
3. Tác vụ tự chạy theo thời gian là chức năng của hệ thống → **không có Actor Scheduler**.
4. Tạo và sửa sản phẩm do **Nhân viên kho và Quản trị viên** cùng đảm nhiệm.

## Câu hỏi còn mở (cần xác nhận)

Q1. Có **giữ chỗ tồn kho** có thời hạn khi tạo đơn nháp không (liên quan tác vụ tự động của hệ thống)?
Q2. Có **nhiều kho hoặc nhiều chi nhánh** không?
Q3. Có cần **duyệt đơn** (ví dụ đơn giá trị lớn hoặc công nợ) không?
