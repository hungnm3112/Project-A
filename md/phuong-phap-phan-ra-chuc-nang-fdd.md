# TỔNG HỢP: TƯ DUY LOGIC & NGUỒN DỮ LIỆU XÂY DỰNG SƠ ĐỒ PHÂN RÃ CHỨC NĂNG (FDD)

> Tài liệu này giải thích chi tiết **cách tư duy từng bước** và **nguồn gốc dữ liệu chính xác** (trích xuất từ `requirement.md`, `bo-cau-hoi-a.md`, `bo-cau-hoi-b.md`) để chuyển hóa kết quả phân tích Actor thành Sơ đồ phân rã chức năng (FDD) 3 cấp.
> Mục tiêu: Giúp bạn nắm vững **phương pháp luận** để tự mình giải quyết mọi bài toán thiết kế hệ thống tiếp theo.

---

## 1. Bước chuyển tư duy cốt lõi: Từ "Actor (Ai làm?)" sang "FDD (Hệ thống có gì?)"

Nhiều người khi mới học thường thắc mắc: *"Tại sao có 6 Actor ở Bộ B rồi mà không lấy luôn 6 Actor đó làm 6 nhánh Cấp 1 của sơ đồ FDD?"*

Câu trả lời nằm ở sự khác biệt về **góc nhìn** và **nguyên tắc MECE** (`md/kien-thuc-bai-tap-1.md`):

| Tiêu chí | Bước tìm Actor & DFD Level 0 (`bo-cau-hoi-b.md`) | Bước vẽ FDD (Sơ đồ phân rã chức năng) |
|---|---|---|
| **Góc nhìn** | Nhìn **từ ngoài vào** hộp đen hệ thống | Mở hộp đen ra, nhìn **cấu trúc bên trong** hệ thống |
| **Câu hỏi trung tâm** | **Ai (Who)** tương tác và gửi/nhận dữ liệu gì? | Hệ thống làm **cái gì (What)** và tổ chức thành **những khối nghiệp vụ nào**? |
| **Điều gì xảy ra nếu chia FDD theo Actor?** | Hợp lệ trên DFD Level 0 (vì 2 Actor khác nhau cùng nối mũi tên vào hệ thống) | **Sai nguyên tắc MECE trên FDD:** Chức năng `Quản lý sản phẩm` (`[Kho - 01]` và `[Quản trị - 03]`) sẽ bị vẽ lặp ở cả nhánh Kho lẫn nhánh Quản trị. Ngoài ra, 3 tác vụ `[Tự động - 01..03]` không có Actor sẽ không biết đặt vào đâu. |

👉 **Quy tắc tư duy số 1:**
* Trên FDD, ta **bỏ qua "Ai bấm nút"** mà gom nhóm theo **Miền nghiệp vụ / Đối tượng dữ liệu cốt lõi** (Đơn hàng, Kho hàng, Tiền & Công nợ, Báo cáo, Cấu hình hệ thống).
* Mỗi chức năng chỉ xuất hiện **duy nhất 1 lần** trên FDD (đảm bảo **Mutually Exclusive** — Không trùng lặp). Việc "ai được dùng chức năng đó" sẽ chuyển sang bài toán **Phân quyền (RBAC)** ở giai đoạn sau.

---

## 2. Bảng đối chiếu nguồn dữ liệu: Cấp nào của FDD lấy từ đâu?

Toàn bộ các cấp của sơ đồ FDD đều được suy ra trực tiếp từ các file tài liệu bạn đã làm trước đó theo quy tắc rõ ràng, không suy diễn cảm tính:

| Cấp trên sơ đồ FDD | Lấy dữ liệu nguồn từ file nào? | Cách chuyển đổi thành chức năng |
|---|---|---|
| **Cấp 0: Tên toàn bộ hệ thống** | `md/requirement.md` (Đề bài bài tập 1) | Lấy tên bài toán: *Quản lý bán hàng tập trung Công ty ABC*. |
| **Cấp 1: Phân hệ lớn (5 khối)** | • `md/requirement.md` (Mục 2: 6 mục tiêu của đề)<br>• `md/LessonOne/bo-cau-hoi-a.md` (Câu A5) | Gom 6 mục tiêu phân tán của đề thành 5 nhóm nghiệp vụ cốt lõi: **Bán hàng — Kho hàng — Tài chính/Công nợ — Báo cáo — Quản trị**. |
| **Cấp 2: Chức năng nghiệp vụ (24 ô)** | • `md/LessonOne/bo-cau-hoi-b.md` (Mục 4: cột "Hành động" có 23 dòng)<br>• `md/LessonOne/bo-cau-hoi-b.md` (Mục 5: có 3 tác vụ tự động) | Lấy 23 hành động của Actor: gộp 2 hành động trùng tên (còn 21) + cộng 3 tác vụ tự động = đúng **24 chức năng**. |
| **Cấp 3: Tác vụ chi tiết (các bước con)** | • `md/LessonOne/bo-cau-hoi-b.md` (Mục 4: 2 cột "Dữ liệu Input" và "Dữ liệu Output")<br>• `md/LessonOne/bo-cau-hoi-a.md` (Các chốt A1, A2) | Nhìn vào Input & Output của từng dòng để bóc nhỏ: **Người dùng nhập/chọn gì? $\rightarrow$ Hệ thống kiểm tra/tính toán gì? $\rightarrow$ Trả ra kết quả gì?** |

---

## 3. Tư duy thiết kế CẤP 1 (Phân hệ chức năng): Lấy từ đâu & Chia thế nào?

### 3.1. Nguồn dữ liệu đầu vào
Lấy trực tiếp từ **6 Mục tiêu của hệ thống** trong `md/requirement.md` (dòng 60–67) và bảng **Câu A5** trong `md/LessonOne/bo-cau-hoi-a.md` (dòng 58–65):
1. *Mục tiêu 1:* Quản lý tập trung sản phẩm, danh mục, khách hàng và nhân viên.
2. *Mục tiêu 2:* Tiếp nhận và quản lý đơn hàng từ nhiều kênh bán.
3. *Mục tiêu 3:* Kiểm soát tồn kho và hạn chế bán vượt số lượng khả dụng.
4. *Mục tiêu 4:* Quản lý quy trình thanh toán, giao hàng, đổi trả và hoàn tiền.
5. *Mục tiêu 5:* Theo dõi doanh thu, lợi nhuận dự kiến và công nợ khách hàng.
6. *Mục tiêu 6:* Cung cấp báo cáo hỗ trợ nhà quản lý ra quyết định.

### 3.2. Cách suy luận để gom 6 Mục tiêu thành 5 Phân hệ Cấp 1 chuẩn MECE
Nếu bê nguyên 6 mục tiêu trong đề làm 6 phân hệ sẽ bị **lộn xộn về bản chất nghiệp vụ** (ví dụ: Mục tiêu 1 gom chung cả *Khách hàng*, *Sản phẩm*, *Nhân viên* vào một chỗ; Mục tiêu 4 gom chung cả *Giao hàng* của Kho và *Thanh toán/Hoàn tiền* của Kế toán).

Cách tư duy của Kiến trúc sư hệ thống là **tách và gom lại theo "Đối tượng dữ liệu trung tâm" (Core Entity)**:

| Đối tượng dữ liệu trung tâm | Lấy từ Mục tiêu nào của đề? | Hình thành Phân hệ Cấp 1 trên FDD |
|---|---|---|
| **Đơn hàng & Khách mua hàng** | Mục tiêu 2 (Đơn đa kênh) + Mục tiêu 1 (Khách hàng) + Mục tiêu 4 (Giao hàng, Yêu cầu đổi trả) | **1. Quản lý đơn hàng và bán hàng** |
| **Hàng hóa vật lý & Tồn kho** | Mục tiêu 1 (Sản phẩm) + Mục tiêu 3 (Tồn kho) + Mục tiêu 4 (Xuất giao hàng, Kiểm hàng trả) | **2. Quản lý sản phẩm và kho hàng** |
| **Dòng tiền & Công nợ** | Mục tiêu 4 (Thanh toán, Hoàn tiền) + Mục tiêu 5 (Công nợ khách hàng) | **3. Quản lý tài chính và công nợ** |
| **Số liệu tổng hợp & KPI** | Mục tiêu 5 (Doanh thu, Lợi nhuận) + Mục tiêu 6 (Báo cáo quản trị, Hiệu quả nhân viên) | **4. Báo cáo và thống kê quản trị** |
| **Cấu hình nền tảng & Phân quyền** | Mục tiêu 1 (Nhân viên/Tài khoản, Danh mục) + Quyết định A2 (Chi nhánh & Kho hàng) | **5. Quản trị hệ thống và danh mục dùng chung** |

> 💡 **Bài học rút ra cho Cấp 1:** Đừng lấy nguyên văn từng gạch đầu dòng của đề bài làm Cấp 1. Hãy hỏi: *"Hệ thống này quản lý những dòng chảy chính nào?"* Trong bán lẻ, luôn có 5 trụ cột bất biến: **Bán hàng (Đơn/Khách) — Kho vận (Hàng) — Tài chính (Tiền/Nợ) — Báo cáo (Số liệu) — Quản trị (Cấu hình/Quyền)**.

---

## 4. Tư duy thiết kế CẤP 2 (Chức năng nghiệp vụ): Phép biến đổi toán học từ Bộ B

### 4.1. Nguồn dữ liệu đầu vào
Lấy 100% từ **Cột "Hành động" ở Mục 4 (Bảng Actor - Hành động)** và **Mục 5 (Tác vụ tự động)** của file `md/LessonOne/bo-cau-hoi-b.md`.

### 4.2. Công thức kiểm soát số lượng (Đảm bảo "Collectively Exhaustive" — Không bỏ sót)
Khi chuyển từ `bo-cau-hoi-b.md` sang Cấp 2 của FDD, ta thực hiện đúng 3 bước lọc:

1. **Đếm tổng hành động ở Mục 4 (`bo-cau-hoi-b.md`):** Có tất cả **23 dòng hành động** (`[Khách hàng - 01]`, `[Bán hàng - 01..06]`, `[Kho - 01..07]`, `[Kế toán - 01..04]`, `[Quản lý - 01..02]`, `[Quản trị - 01..04]`).
2. **Hợp nhất các hành động trùng nhau (theo ghi chú dòng 128–130 của `bo-cau-hoi-b.md`):**
   * `[Kho - 01]` + `[Quản trị - 03]` (cùng là *Quản lý sản phẩm*) $\rightarrow$ Gộp thành **1 chức năng duy nhất**: `2.1 Quản lý thông tin sản phẩm` (trừ đi 1 dòng trùng).
   * `[Bán hàng - 06]` + `[Kho - 04]` (cùng là *Cập nhật trạng thái giao hàng*) $\rightarrow$ Gộp thành **1 chức năng duy nhất**: `1.7 Cập nhật trạng thái giao hàng` (trừ đi 1 dòng trùng).
   * $\Rightarrow$ Còn lại: $23 - 2 = \mathbf{21}$ chức năng do Actor kích hoạt.
3. **Cộng thêm các tác vụ tự động ở Mục 5 (`bo-cau-hoi-b.md`):**
   * Trên DFD Level 0, 3 tác vụ `[Tự động - 01]`, `[Tự động - 02]`, `[Tự động - 03]` không được vẽ vì không có Actor. Nhưng **trên FDD, chúng là chức năng của hệ thống nên BẮT BUỘC phải xuất hiện**.
   * Mỗi tác vụ tự động được đặt vào đúng phân hệ nghiệp vụ mà nó xử lý:
     * `[Tự động - 01] Nhả tồn giữ chỗ khi đơn hết hạn` $\rightarrow$ Xử lý đơn quá hạn giữ chỗ $\rightarrow$ Đặt vào **Phân hệ 1 (Đơn hàng & Bán hàng)** (mục `1.8`).
     * `[Tự động - 02] Cảnh báo tồn kho tối thiểu` $\rightarrow$ Quét ngưỡng tồn từng kho $\rightarrow$ Đặt vào **Phân hệ 2 (Sản phẩm & Kho hàng)** (mục `2.7`).
     * `[Tự động - 03] Tổng hợp báo cáo cuối ngày` $\rightarrow$ Chốt số liệu cho báo cáo $\rightarrow$ Đặt vào **Phân hệ 4 (Báo cáo & Thống kê)** (mục `4.3`).
   * $\Rightarrow$ Tổng số chức năng Cấp 2 trên toàn sơ đồ FDD = $21 + 3 = \mathbf{24\text{ chức năng}}$.

### 4.3. Tại sao 4 bước "Đổi trả & Hoàn tiền" lại phân bổ vào 3 phân hệ như vậy?
Theo lựa chọn của bạn (*"Đặt từng bước đổi trả vào các phân hệ tương ứng"*), ta dùng lý thuyết **3 dòng chảy của Reverse Logistics** trong `md/kien-thuc-bai-tap-1.md` (Mục 3 Phần 4, dòng 127–133) để đặt từng mã hành động vào đúng vị trí:

| Thứ tự | Mã hành động ở Bộ B | Bản chất dòng chảy | Đặt vào Phân hệ Cấp 1 nào? |
|---|---|---|---|
| Bước 1 | `[Bán hàng - 05]` Tạo yêu cầu đổi trả | **Dòng chứng từ yêu cầu:** Khởi phát từ đơn hàng cũ của khách | **Phân hệ 1 (Đơn hàng & Bán hàng)** — Mục `1.6` |
| Bước 2 | `[Kho - 06]` Kiểm tra hàng trả | **Dòng vật chất (Hàng hóa):** Kiểm tra vật lý, phân loại kho tốt/lỗi | **Phân hệ 2 (Sản phẩm & Kho hàng)** — Mục `2.5` |
| Bước 3 | `[Kế toán - 04]` Đối chiếu hàng trả (phần tiền) | **Dòng tài chính (Chứng từ tiền):** Khớp biên bản kho với hóa đơn gốc | **Phân hệ 3 (Tài chính & Công nợ)** — Mục `3.2` |
| Bước 4 | `[Kế toán - 02]` Hoàn tiền khách hàng | **Dòng tiền tệ:** Chi tiền hoàn trả hoặc cấn trừ công nợ | **Phân hệ 3 (Tài chính & Công nợ)** — Mục `3.3` |

---

## 5. Tư duy thiết kế CẤP 3 (Tác vụ chi tiết): Giải phẫu từ cột Input & Output của Bộ B

### 5.1. Nguồn dữ liệu đầu vào
Nhiều người khi phân rã xuống Cấp 3 thường bị "bí" hoặc viết cảm tính. Thực tế, **toàn bộ chất liệu của Cấp 3 đã nằm sẵn ở 2 cột cuối trong bảng Mục 4 của `md/LessonOne/bo-cau-hoi-b.md`**:
* Cột **Dữ liệu Input (Actor gửi vào)**
* Cột **Dữ liệu Output (Actor nhận lại)**
* Kết hợp với **3 quyết định đã chốt (A1, A2, A3)** ở cuối `md/LessonOne/bo-cau-hoi-a.md`.

### 5.2. Công thức 3 bước "IPO" (Input $\rightarrow$ Process $\rightarrow$ Output) để bóc tách Cấp 3
Mọi chức năng phần mềm ở Cấp 2 khi thực thi đều trải qua 3 nhịp chuẩn:
1. **Nhịp 1 — Tiếp nhận / Chọn dữ liệu đầu vào (Input):** Nhìn vào cột `Dữ liệu Input` xem người dùng phải chọn/nhập những nhóm thông tin gì?
2. **Nhịp 2 — Kiểm tra quy tắc nghiệp vụ & Xử lý lõi (Process):** Hệ thống phải kiểm tra điều kiện gì (ví dụ: kiểm tra tồn khả dụng, giữ chỗ tồn kho A1, đối chiếu hóa đơn) trước khi lưu?
3. **Nhịp 3 — Ghi nhận trạng thái & Sinh kết quả đầu ra (Output):** Nhìn vào cột `Dữ liệu Output` xem hệ thống sinh ra phiếu gì, cập nhật tồn kho hay công nợ nào?

### 5.3. Ba ví dụ giải phẫu thực tế (So sánh trực tiếp chữ trong Bộ B và Cấp 3 FDD)

#### Ví dụ 1: Chức năng `1.3 Tạo đơn hàng đa kênh` (Từ dòng `[Bán hàng - 02]` trong `bo-cau-hoi-b.md`)
* **Đọc dữ liệu nguồn ở `bo-cau-hoi-b.md` (dòng 105):**
  * *Dữ liệu Input:* `Thông tin khách đã xác nhận, sản phẩm, số lượng, kênh bán, chi nhánh xử lý`
  * *Dữ liệu Output:* `Mã đơn hàng, trạng thái giữ chỗ tồn kho, cảnh báo nếu vượt tồn khả dụng`
  * *Quyết định A1 (`bo-cau-hoi-a.md` dòng 75):* Có cơ chế giữ chỗ tồn kho (Stock Reservation) khi tạo đơn.
* **Áp công thức IPO để viết thành 3 nhánh Cấp 3:**
  * *Từ Input (`chi nhánh xử lý, kênh bán`):* $\rightarrow$ **1.3.1 Chọn chi nhánh bán và kênh tiếp nhận (Cửa hàng / Điện thoại / Zalo)**
  * *Từ Output (`cảnh báo vượt tồn, giữ chỗ tồn`) + Quyết định A1:* $\rightarrow$ **1.3.2 Kiểm tra tồn khả dụng và giữ chỗ tồn kho tạm thời**
  * *Từ Output (`Mã đơn hàng`) + Mục tiêu 5 (theo dõi hiệu quả nhân viên):* $\rightarrow$ **1.3.3 Lưu thông tin đơn hàng và ghi nhận nhân viên phụ trách**

#### Ví dụ 2: Chức năng `2.5 Kiểm tra và nhập kho hàng trả` (Từ dòng `[Kho - 06]` trong `bo-cau-hoi-b.md`)
* **Đọc dữ liệu nguồn ở `bo-cau-hoi-b.md` (dòng 115) & `kien-thuc-bai-tap-1.md` (dòng 130):**
  * *Dữ liệu Input:* `Mã phiếu đổi trả, tình trạng hàng trả, kho nhập lại`
  * *Dữ liệu Output:* `Biên bản kiểm hàng, phiếu nhập lại kho`
  * *Kiến thức miền (`kien-thuc-bai-tap-1.md` dòng 130):* Kiểm tra tình trạng hàng trả lại $\rightarrow$ Nhập lại vào kho (hàng tốt) hoặc chuyển vào kho thanh lý/bảo hành (hàng lỗi).
* **Áp công thức IPO để viết thành 2 nhánh Cấp 3:**
  * *Từ Input (`Mã phiếu đổi trả, tình trạng hàng trả`):* $\rightarrow$ **2.5.1 Tiếp nhận hàng trả và đánh giá tình trạng vật lý**
  * *Từ Output (`Biên bản kiểm hàng, phiếu nhập lại kho`) + Kiến thức miền:* $\rightarrow$ **2.5.2 Lập biên bản kiểm hàng và nhập lại kho tương ứng (kho hàng tốt / kho lỗi)**

#### Ví dụ 3: Chức năng `3.1 Ghi nhận thanh toán đơn hàng` (Từ dòng `[Kế toán - 01]` trong `bo-cau-hoi-b.md`)
* **Đọc dữ liệu nguồn ở `bo-cau-hoi-b.md` (dòng 117) & `kien-thuc-bai-tap-1.md` (dòng 136–137):**
  * *Dữ liệu Input:* `Mã đơn, số tiền thu, phương thức, chi nhánh`
  * *Dữ liệu Output:* `Phiếu thu, trạng thái thanh toán của đơn`
  * *Kiến thức miền (`kien-thuc-bai-tap-1.md` dòng 136):* Không phải lúc nào cũng thu 100%, có thanh toán từng phần / trả chậm sinh ra công nợ.
* **Áp công thức IPO để viết thành 2 nhánh Cấp 3:**
  * *Từ Input (`số tiền thu, phương thức`) + Output (`Phiếu thu`):* $\rightarrow$ **3.1.1 Lập phiếu thu theo phương thức thanh toán (toàn phần / từng phần)**
  * *Từ Output (`trạng thái thanh toán của đơn`) + Công nợ:* $\rightarrow$ **3.1.2 Cập nhật trạng thái thanh toán đơn hàng và dư nợ khách hàng**

---

## 6. Quy trình 5 bước để bạn tự tay làm mọi bài FDD tiếp theo

Khi gặp một đề bài mới (ví dụ Cấp độ 1–5 trong `md/requirement.md`), bạn chỉ cần làm đúng 5 bước tuần tự sau:

1. **Bước 1 — Chốt bảng Actor - Hành động (Bộ B):** Liệt kê đủ các cột `Mã | Hành động | Dữ liệu Input | Dữ liệu Output` và bảng `Tác vụ tự động`. Đây là "nguyên liệu thô" 100%.
2. **Bước 2 — Chia Phân hệ Cấp 1 theo "Đối tượng dữ liệu lõi":** Nhìn vào các mục tiêu của đề, gom thành 4–6 khối nghiệp vụ độc lập (Đơn hàng, Kho, Tài chính, Báo cáo, Quản trị...).
3. **Bước 3 — Rải các Hành động từ Bộ B vào Cấp 2:**
   * Gộp các hành động trùng tên của nhiều Actor thành **1 chức năng duy nhất**.
   * Đưa toàn bộ các **Tác vụ tự động** vào các phân hệ tương ứng.
   * Đếm lại tổng số lượng: $\text{Số chức năng Cấp 2} = \text{Tổng hành động Actor} - \text{Số hành động trùng} + \text{Số tác vụ tự động}$.
4. **Bước 4 — Bóc tách Cấp 3 bằng công thức IPO:** Với mỗi chức năng Cấp 2, đọc cột `Dữ liệu Input` và `Dữ liệu Output` của nó ở Bộ B để tách thành 2–3 bước: *(1) Nhập/Chọn gì $\rightarrow$ (2) Kiểm tra/Tính toán quy tắc gì $\rightarrow$ (3) Sinh phiếu/Cập nhật trạng thái gì*.
5. **Bước 5 — Rà soát tiêu chuẩn cuối cùng:**
   * Mọi ô từ Cấp 1 đến Cấp 3 đã bắt đầu bằng **`Động từ + Danh từ`** chưa?
   * Có ô nào bị nằm ở 2 nhánh khác nhau không (MECE)?
   * Có mục tiêu nào của đề bài chưa được giải quyết không?

