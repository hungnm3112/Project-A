---
trigger: always_on
---

## QUY TẮC UI & UX

### 1. Thông báo cho người dùng
- KHÔNG dùng `alert()`, `confirm()`, `prompt()` của trình duyệt
- Dùng toast/notification component (Ant Design message, hoặc custom Toast component)
- Thông báo thành công: toast màu xanh, tự ẩn sau 3 giây
- Thông báo lỗi: toast màu đỏ, có nút đóng
- Xác nhận xóa: dùng Modal confirm (không dùng `confirm()`)

### 2. Danh sách & Bảng dữ liệu
- Tất cả danh sách khi lấy dữ liệu **BẮT BUỘC** phải có:
  - Bộ lọc tìm kiếm (search)
  - Bộ lọc từ ngày — đến ngày
  - Phân trang (pagination)
- Hiển thị trạng thái loading khi đang fetch data
- Hiển thị empty state khi không có dữ liệu

### 3. Loading & Chống thao tác trùng
- Khi người dùng thao tác lưu, thêm, sửa, xoá:
  - BẮT BUỘC hiển thị loading toàn trang hoặc disable nút bấm
  - Mục đích: tránh người dùng click thêm lần nữa gây duplicate request
- Dùng state `isLoading` để disable button và hiển thị spinner

### 4. Nút bấm (Button)
- Các nút thao tác người dùng **bắt buộc phải có icon** đi kèm text
- Phân biệt:
  - `<button>`: cho hành động (submit, delete, toggle)
  - `<Link>` (từ `next/link`): cho điều hướng sang trang khác
  - KHÔNG dùng thẻ `<a>` trần — luôn dùng `<Link>`. 
  - **Ngoại lệ hợp lệ:** ĐƯỢC PHÉP và NÊN dùng thẻ `<a>` trần cho các link gọi điện (`href="tel:..."`) và gửi email (`href="mailto:..."`). Linter của Next.js mặc định sẽ bỏ qua và không đánh lỗi 2 trường hợp này nên bạn có thể yên tâm push code lên Github mà không bị chặn.

### 5. React Component
- Component đặt trong `src/components/`, phân nhóm theo feature
- Mỗi component 1 file, đặt tên `PascalCase`: `ProductCard.tsx`
- Props phải có TypeScript interface:
```typescript
interface ProductCardProps {
  product: Product;
  onAddToCart?: (id: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // ...
}
```

### 6. Hình ảnh
- Luôn dùng `next/image` thay vì thẻ `<img>` (tự động tối ưu)
- BẮT BUỘC có thuộc tính `alt` mô tả nội dung thực tế (cho SEO hình ảnh)
- Khai báo `width` và `height` hoặc dùng `fill` với container có kích thước

### 7. Responsive
- Mobile-first: thiết kế cho mobile trước, mở rộng bằng breakpoint
- Sử dụng TailwindCSS: `sm:`, `md:`, `lg:`, `xl:`
- KHÔNG tạo file CSS/JS riêng cho desktop và mobile

### 8. Bản chất trang Giỏ Hàng (Lead Gen)
**Quy tắc kinh doanh (ADR-006):** Dự án là hệ thống Lead Generation, không phải sàn TMĐT hoàn chỉnh.
- Giỏ hàng lưu hoàn toàn ở client-side (React Context + `localStorage`).
- Không có bảng `orders` hay quản lý tồn kho real-time.
- Hành động "Đặt hàng" chỉ đơn giản là tạo 1 bản ghi `Lead` chứa `{ customerName, phone, items[], note }` gửi về CRM/Sale.
