# **1\. Tổng quan lộ trình**

## **Giai đoạn 1 — Tư duy phân tích nghiệp vụ**

* **Tuần 1–4:** Học cách xác định vấn đề, phạm vi, tác nhân, quy trình nghiệp vụ, yêu cầu chức năng và phi chức năng.

## **Giai đoạn 2 — Thiết kế dữ liệu và nghiệp vụ**

* **Tuần 5–8:** Thiết kế ERD, mô hình dữ liệu, trạng thái, quy tắc nghiệp vụ, giao dịch và tính nhất quán dữ liệu.

## **Giai đoạn 3 — Thiết kế hệ thống tích hợp**

* **Tuần 9–12:** Học phân quyền, API, đồng bộ dữ liệu, xử lý bất đồng bộ, log, báo cáo và kiểm soát sai lệch.

# **2\. Bộ 5 đề bài thực hành cho Giai đoạn 1**

### **Cấp độ 1: Quản lý công việc sửa chữa laptop**

**Bối cảnh & Yêu cầu:** Công ty sửa chữa Laptop24h muốn thực hiện chuyển đổi số quy trình quản lý công việc sửa chữa laptop. Mỗi ngày nhân viên kỹ thuật sẽ đăng nhập vào hệ thống để tạo đơn nhận máy cho khách của mình. Hệ thống cần cho phép nhận máy từ khách hàng và lưu trữ thông tin dưới dạng dữ liệu số. Khách hàng có thể tra cứu và theo dõi trực tuyến toàn bộ tiến trình sửa chữa máy của mình, nhờ vào việc nhân viên liên tục cập nhật trạng thái mới nhất trên hệ thống. Đồng thời các cấp quản lý cũng có thể theo dõi xem cửa hàng đang có bao nhiêu khách, ai là người đang phải làm việc. Hàng ngày theo dõi được lượng đơn, doanh thu.

**Cấp độ 2: Bán hàng và quản lý kho**

**Bối cảnh & Yêu cầu:** Chuỗi cửa hàng bán lẻ máy tính muốn xây dựng phần mềm quản lý kho và bán hàng. Hệ thống cần xử lý các nghiệp vụ: quản lý danh mục sản phẩm, cảnh báo tồn kho tối thiểu, lập đơn bán hàng tại cửa hàng, khởi tạo đơn đặt hàng nhập kho từ nhà cung cấp và xử lý quy trình trả hàng/đổi trả từ khách. Bạn cần xác định luồng dữ liệu giữa kho và bán hàng, đồng thời đảm bảo số lượng tồn kho tự động cập nhật chính xác theo từng giao dịch.

### **Cấp độ 3: Mua hàng, công nợ và kế toán nội bộ**

### **Bối cảnh & Yêu cầu:** Doanh nghiệp có nhu cầu quản lý hoạt động mua hàng từ nhiều nhà cung cấp khác nhau, trong đó cho phép thanh toán nhiều lần/từng phần cho từng đơn hàng và đối chiếu hóa đơn cuối kỳ. Hãy xác định các đối tượng dữ liệu cốt lõi, xây dựng luồng nghiệp vụ theo dõi công nợ phải trả và thiết kế quy trình duyệt chi nội bộ cho phòng kế toán.

### **Cấp độ 4: Đồng bộ đơn hàng đa kênh**

**Bối cảnh & Yêu cầu:** Doanh nghiệp đang bán hàng đồng thời trên sàn TMĐT, Website và phần mềm POS tại cửa hàng. Bài toán đặt ra là cần tập trung toàn bộ đơn hàng và tồn kho về một hệ thống duy nhất. Hãy tự nghiên cứu, đề xuất giải pháp xử lý đồng bộ dữ liệu đa kênh và thiết kế quy trình xử lý đơn hàng hợp nhất.

### **Cấp độ 5: Sàn giao dịch việc làm sửa chữa thiết bị**

### **Bối cảnh & Yêu cầu:** Xây dựng nền tảng kết nối trực tiếp giữa khách hàng có nhu cầu sửa chữa thiết bị công nghệ và các kỹ thuật viên tự do. Từ ý tưởng cốt lõi này, bạn cần tự phân tích toàn bộ bài toán: xác định mô hình hoạt động, liệt kê các tác nhân, thiết kế các luồng quy trình chính và đưa ra danh sách yêu cầu tính năng cho hệ thống.

# **3\. Giai đoạn 2 — Thiết kế CSDL & Sơ đồ quan hệ (ERD)**

Thực hành thiết kế cơ sở dữ liệu và vẽ sơ đồ quan hệ cho 5 đề tài ở mục 2\.

# **4\. Giai đoạn 4 — Viết code, viết API**

**Tuần 13–16:** Hiện thực hóa các thiết kế từ các giai đoạn trước thành hệ thống thực tế thông qua việc viết code và xây dựng API (ví dụ: API nhận máy, quản lý kho, xử lý đơn hàng, v.v.).

**Bài tập ngày 1**

Công ty TNHH ABC kinh doanh các sản phẩm điện tử như máy tính, linh kiện, phụ kiện. Hiện tại, công ty quản lý hoạt động bán hàng bằng Excel và một số phần mềm rời rạc, dẫn đến nhiều vấn đề:

* Nhân viên khó kiểm tra số lượng tồn kho thực tế khi tư vấn khách hàng.  
* Đơn hàng được ghi nhận từ cửa hàng, điện thoại và website nhưng chưa tập trung.  
* Khi nhiều nhân viên cùng bán một sản phẩm, hệ thống dễ ghi nhận vượt số lượng tồn.  
* Việc đổi trả hàng, hoàn tiền và điều chỉnh tồn kho chưa có quy trình thống nhất.  
* Khó theo dõi công nợ khách hàng, doanh thu và hiệu quả bán hàng của từng nhân viên.  
* Người quản lý phải tổng hợp dữ liệu thủ công để lập báo cáo.

Ban giám đốc quyết định xây dựng hệ thống quản lý bán hàng tập trung nhằm chuẩn hóa quy trình từ tiếp nhận đơn hàng đến giao hàng, thanh toán và báo cáo doanh thu.

## 2\. Mục tiêu của hệ thống

Hệ thống cần đáp ứng các mục tiêu:

1. Quản lý tập trung sản phẩm, danh mục, khách hàng và nhân viên.  
2. Tiếp nhận và quản lý đơn hàng từ nhiều kênh bán.  
3. Kiểm soát tồn kho và hạn chế bán vượt số lượng khả dụng.  
4. Quản lý quy trình thanh toán, giao hàng, đổi trả và hoàn tiền.  
5. Theo dõi doanh thu, lợi nhuận dự kiến và công nợ khách hàng.  
6. Cung cấp báo cáo hỗ trợ nhà quản lý ra quyết định.

Yêu cầu:  
**1\. Liệt kê các tác nhân**  
**2\. Vẽ sơ đồ phân phân dã chức năng**