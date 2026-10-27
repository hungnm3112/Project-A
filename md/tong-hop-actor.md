# TỔNG HỢP: PHƯƠNG PHÁP XÁC ĐỊNH ACTOR (TÁC NHÂN)

> Tài liệu tổng hợp từ các buổi thảo luận về cách xác định Actor cho Bài tập ngày 1 (Công ty ABC - Hệ thống quản lý bán hàng tập trung).

---

## 1. Định nghĩa Actor

- **Actor (Tác nhân)** là bất kỳ thực thể **nằm ngoài hệ thống** có tương tác trực tiếp hoặc trao đổi thông tin với hệ thống.
- Actor là **vai trò (Role)**, không phải một con người cụ thể (không phải "anh Nam", "chị Lan") và không phải chức danh ngoài đời.
- Một người có thể đóng nhiều vai trò; một vai trò có thể do nhiều người đảm nhiệm.
- Actor luôn đứng **ngoài ranh giới hệ thống** (System Boundary), giao tiếp qua UI hoặc API.

## 2. Ba sai lầm phổ biến

| Sai lầm | Giải thích | Ví dụ |
|---|---|---|
| Nhầm chức danh với vai trò | Nhiều chức danh nhưng cùng quyền hạn thì chỉ là 1 Actor | Trưởng phòng, Phó phòng, Giám đốc chi nhánh → `Quản lý` |
| Nhầm Actor với dữ liệu (Entity) | Dữ liệu là đối tượng bị thao tác, không phải chủ thể hành động | Hóa đơn, Sản phẩm, Kho hàng, Báo cáo |
| Bỏ sót Actor gián tiếp | Quên hệ thống ngoài (nếu có tích hợp) | Đơn vị vận chuyển, cổng thanh toán |
| Coi tác vụ tự chạy là Actor | Tác vụ theo thời gian (cron job) chạy bên trong hệ thống nên không đứng ngoài ranh giới | Nhả tồn giữ chỗ, báo cáo cuối ngày → ghi thành chức năng hệ thống |

Lưu ý: khách hàng là **Actor** khi họ tự đưa dữ liệu vào hệ thống (vd: gửi form), dù không có đăng nhập hay cổng riêng. Nếu khách chỉ trao đổi qua lời nói/Zalo và nhân viên nhập máy thì khách chỉ là **Entity**. Đề ABC có cả hai: form website (Actor, 1 hành động) và Zalo/cửa hàng/điện thoại (nhân viên đặt hộ).

## 3. Các cách "chạm vào hệ thống" và loại Actor tương ứng

Một thực thể chỉ có thể tương tác với hệ thống theo một số cách nhất định. Mỗi cách tương ứng với một loại Actor:

| # | Cách chạm vào hệ thống | Loại Actor | Ví dụ (đề ABC) |
|---|---|---|---|
| 1 | Đưa dữ liệu vào | Người nhập liệu (Primary Actor) | Nhân viên bán hàng lên đơn |
| 2 | Xử lý, duyệt các bước tiếp theo | Người xử lý quy trình (Secondary Actor) | Nhân viên kho, Kế toán |
| 3 | Lấy thông tin ra để quyết định | Người xem / giám sát | Quản lý xem báo cáo, công nợ |
| 4 | Dùng như người dùng cuối | Khách hàng tự phục vụ | Ví dụ chung: khách tự đặt hàng trên website. **Đề ABC: chỉ 1 hành động** "Gửi form đặt hàng"; Zalo/cửa hàng/điện thoại do nhân viên đặt hộ |
| 5 | Trao đổi dữ liệu qua API/Webhook | Hệ thống ngoài (External System) | Đơn vị vận chuyển, cổng thanh toán, sàn TMĐT |
| 6 | Tự kích hoạt theo thời gian | **Không tính là Actor** (chức năng tự động bên trong hệ thống) | Nhả tồn giữ chỗ hết hạn, báo cáo cuối ngày |
| 7 | Quản trị tài khoản, phân quyền, cấu hình | Quản trị viên hệ thống | Tạo tài khoản, phân quyền, cấu hình danh mục |

## 4. Hai bộ câu hỏi ở hai tầng khác nhau

### Bộ A - Hiểu bài toán (5 câu, từ slide Bước 1)
Mục đích: hiểu vấn đề thật của khách hàng trước khi nghĩ đến giải pháp. Nguồn trả lời: hỏi khách hàng hoặc đọc đề.

1. Tại sao cần làm nó? (Mục đích kinh doanh)
2. Hiện tại họ đang làm như thế nào? (Excel, giấy tờ, phần mềm cũ)
3. Vấn đề hiện tại là gì? (Chậm, sai sót, thiếu thông tin)
4. Ai sử dụng? (Mỗi vai trò cần thao tác khác nhau)
5. Kết quả mong muốn là gì? (Tiêu chí để biết chức năng đã đạt)

### Bộ B - Bóc tách Actor (checklist)
Mục đích: từ kết quả Bộ A, tìm ra danh sách Actor và hành động.

| Câu | Câu hỏi | Tìm gì | Tại sao cần hỏi |
|---|---|---|---|
| B1 | Ai trực tiếp đưa dữ liệu vào hệ thống? | Người tạo sản phẩm, đơn, phiếu nhập, yêu cầu đổi trả | Dữ liệu không tự sinh ra; tìm Primary Actor kích hoạt nghiệp vụ |
| B2 | Ai tiếp nhận, xử lý các bước tiếp theo? | Người duyệt, xuất kho, thu tiền, kiểm hàng trả | Nghiệp vụ hiếm khi kết thúc ở bước nhập; tìm Secondary Actor |
| B3 | Ai xem báo cáo, giám sát, ra quyết định? | Quản lý, kế toán công nợ, giám đốc | Hệ thống phục vụ cả mục tiêu quản trị |
| B4 | Khách hàng tương tác trực tiếp hay gián tiếp? | Có tự đăng nhập/đặt hàng không | Tránh mặc định coi khách là Actor |
| B5 | Có trao đổi dữ liệu với hệ thống ngoài không? | Vận chuyển, thanh toán, sàn TMĐT, phần mềm kế toán | Hệ thống ngoài thay đổi trạng thái dữ liệu như người dùng |
| B6 | Có nghiệp vụ nào tự chạy theo thời gian không? | Tự hủy đơn giữ chỗ, cảnh báo tồn, tổng kết cuối ngày | Nhận diện tác vụ tự động để đưa vào chức năng hệ thống (không vẽ thành Actor) |
| B7 | Ai quản trị tài khoản, phân quyền, cấu hình? | Quản trị viên | Bổ sung do bộ 6 câu ban đầu bị thiếu |

## 5. Mối liên hệ giữa Bộ A và Bộ B

**Thứ tự: làm Bộ A trước, rồi mới làm Bộ B.** Chưa hiểu bài toán thì không biết tìm Actor ở đâu.

| Câu Bộ A | Cấp dữ liệu cho câu Bộ B |
|---|---|
| A2. Hiện đang làm thế nào? | B1 (ai nhập, qua kênh nào), B4 (khách có tự đặt online không) |
| A3. Vấn đề hiện tại? | B2 (bước nào thiếu quy trình), B6 (việc nào cần tự động) |
| A4. Ai sử dụng? | B1, B2, B3 (danh sách vai trò thô ban đầu) |
| A5. Kết quả mong muốn? | B3 (ai cần báo cáo), B5 (cần hệ thống ngoài nào) |
| A1. Tại sao cần làm? | Xác định phạm vi và ranh giới hệ thống |

## 6. Vì sao Bộ B có 6 (hoặc 7) câu mà không phải 10?

- Các câu hỏi **không suy ra từ đề bài**. Chúng suy ra từ **định nghĩa Actor** và **các loại Actor có thể tồn tại**.
- Con số không cố định: có thể gộp còn 3 nhóm (Con người bên trong / Khách hàng bên ngoài / Máy móc) hoặc tách chi tiết hơn (tách "ai duyệt" khỏi "ai thực thi", "ai nhận thông báo"...).
- Bộ câu hỏi chỉ là **checklist gợi nhớ**, không phải quy tắc bắt buộc.
- **Tiêu chí đủ:** mọi cách một thực thể bên ngoài có thể tương tác với hệ thống đều đã được hỏi đến.

## 7. Quy trình áp dụng

1. **Bộ A:** đọc đề, trả lời 5 câu (mỗi câu 1-3 dòng).
2. **Bộ B:** dùng kết quả Bộ A, quét qua checklist để ra danh sách Actor nháp.
3. **Chuẩn hóa:** gộp trùng, đổi chức danh thành vai trò, loại Entity bị nhầm là Actor.
4. **Lập bảng Actor - Hành động**, rồi vẽ `drawio/Actor.drawio`.
5. **Tự kiểm tra:** với mỗi chức năng, hỏi "Chức năng này do ai kích hoạt?". Chức năng không có người kích hoạt nghĩa là đang thiếu Actor.

## 8. Mẫu đầu ra cho mỗi Actor

| Trường | Nội dung |
|---|---|
| Actor | Tên vai trò (ví dụ: Nhân viên kho) |
| Trách nhiệm | 1-2 câu mô tả |
| Hành động chính | Danh sách `Động từ + Danh từ` |

Danh sách này là đầu vào cho sơ đồ phân rã chức năng (FDD): mỗi hành động của Actor trở thành một chức năng.

## 9. Đầu ra cho sơ đồ DFD Level 0

- Mỗi hành động của Actor tách thành **một dòng riêng**, có mã (ví dụ BH1, KHO2) và cặp **Input - Output**.
- **Input:** dữ liệu Actor gửi vào hệ thống.
- **Output:** dữ liệu Actor **nhận lại** (phiếu, báo cáo, thông báo, kết quả). Không ghi thay đổi trạng thái nội bộ của hệ thống thành Output.
- Trên sơ đồ, mũi tên vào và mũi tên ra của cùng một hành động mang **cùng mã**, để biết Output nào trả lời Input nào.
- Tác vụ tự chạy (không có Actor) được ghi riêng như chức năng hệ thống, không vẽ vào DFD Level 0.
