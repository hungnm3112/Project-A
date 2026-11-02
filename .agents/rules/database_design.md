---
trigger: always_on
---

## QUY TẮC THIẾT KẾ DATABASE

> Nguồn: tổng hợp từ chuẩn thiết kế của leader.
> Nguyên tắc: thiết kế database theo đúng các quy ước dưới đây. KHÔNG tự ý đổi tên, đổi kiểu dữ liệu hay thay đổi logic so với chuẩn.

---

### 1. Quy trình
1. Viết bảng đặc tả cho từng collection trong file Markdown (thư mục `md/` của bài / dự án tương ứng) trước khi viết code.
2. Chờ người dùng review và xác nhận bảng đặc tả.
3. Sau khi xác nhận mới chuyển thành Mongoose Schema và DTO.

### 2. Định dạng bảng đặc tả
Mỗi collection là 1 bảng gồm 4 cột, dòng đầu tiên là `_id`:

| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |

- `type`: kiểu dữ liệu, kèm `unique` / `Index` nếu có.
- `required`: `true`, kèm giá trị mặc định nếu có (`default = 1`, `default: null`, `default : [ ]`, `default: Date.now`).
- `des`: mô tả ý nghĩa trường; trường trạng thái ghi rõ từng giá trị.

### 3. Quy ước chung

**3.1. Định danh:**
- `_id` (ObjectId): hệ thống tự sinh.
- `ID`: mã định danh nghiệp vụ, `unique`.
  - Dạng String: VD `ID` nhân viên, `ID` phiếu thu/chi, `ID` phiếu nhập.
  - Dạng Number tự sinh: VD `ID` phiếu nhập `124`.
  - Dạng String `default: Date.now`: VD `ID` sản phẩm cuối + QR.

**3.2. Tên trường và tên bảng:** dùng snake_case (`parent_id`, `customer_id`, `total_amount`, `unsign_search`, `form_import_id`, `type_payment_id`).

**3.3. Trạng thái:** `status: Number`, `Index`, `true, default = 1`. Quy ước: `0` dừng hoạt động, `1` đang hoạt động. (Riêng sản phẩm cuối + QR: `status: boolean`, `default false`.)

**3.4. Tìm kiếm không dấu:** trường `unsign_search: String`, `Index`.

**3.5. Mật khẩu:** `password: String`, `true`, dạng mã hóa sha512.

**3.6. Giá trị mặc định:**
- Tham chiếu / ngày không bắt buộc: `default: null`.
- Mảng: `default : [ ]` (VD: `address` của khách hàng).
- Tiền, số lượng, thuế, bảo hành: `Number`, `default = 0`.
- Chiết khấu `ck`: `Number`, `default = 0, max = 100`.
- Ngày tạo chứng từ: `date`, `index`, `true, default: Date.now`.
- Giới tính: `gender: Number`, `default: 0`.

**3.7. Danh mục cha - con:** `parent_id: ObjectId`, `default: null`.

**3.8. Tách mẫu sản phẩm và sản phẩm cuối:**
- `subcategories`: mẫu sản phẩm (dòng hàng).
- `products (sản phẩm cuối + QR)`: từng sản phẩm thực tế, tham chiếu `subcategory_id` và `form_import_id` (phiếu nhập sinh ra sản phẩm).

**3.9. Chứng từ và chi tiết chứng từ:** có 2 cách:
- Tách bảng chi tiết riêng: VD `form_import` + `detail_form_import` (chi tiết tham chiếu `form_import_id`).
- Nhúng mảng chi tiết vào phiếu: VD `import_form` có `product: array` (chi tiết linh kiện) và `service: array` (chi tiết dịch vụ), cấu trúc phần tử theo `detail_product`.
- Tổng tiền phiếu (`total_amount`) lưu trên phiếu, `default = 0`, tính từ chi tiết phiếu.

**3.10. Đối tác trên chứng từ:** dùng `customer_id` (ObjectId), mô tả là nhà cung cấp, cho phiếu nhập, phiếu thu/chi và công nợ.

**3.11. Công nợ:** bảng `debts` ghi theo từng chứng từ, `type_form: String` thuộc `[import, export, receive, payment]`, cùng các cột `total_import`, `total_payment`, `total_export`, `total_receive`.
