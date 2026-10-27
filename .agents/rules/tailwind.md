## QUY TẮC SỬ DỤNG TAILWINDCSS (TAILWIND RULES)

### 1. Sử dụng cú pháp TailwindCSS hiện đại (v3+)
Luôn cập nhật và sử dụng các class name hiện đại nhất của TailwindCSS, TUYỆT ĐỐI KHÔNG sử dụng các class cũ (deprecated) gây ra cảnh báo linter:
- **Thay vì:** `flex-shrink-0` ➔ **Dùng:** `shrink-0`
- **Thay vì:** `flex-shrink` ➔ **Dùng:** `shrink`
- **Thay vì:** `flex-grow-0` ➔ **Dùng:** `grow-0`
- **Thay vì:** `flex-grow` ➔ **Dùng:** `grow`
- **Thay vì:** `overflow-ellipsis` ➔ **Dùng:** `text-ellipsis`

### 2. Tổ chức Class
- Tránh viết chuỗi class quá dài không kiểm soát. Cân nhắc dùng thư viện như `clsx` hoặc `tailwind-merge` nếu cần xử lý logic class phức tạp.
- Khi sử dụng class động, cẩn thận với lỗi mất style do PurgeCSS (ví dụ không dùng string concatenation kiểu `bg-${color}-500`).

### 3. Màu sắc & Giá trị tùy chỉnh
- Ưu tiên sử dụng màu định nghĩa trong `tailwind.config.ts` (ví dụ `bg-primary`, `text-secondary`).
- Chỉ dùng Arbitrary values (ví dụ `bg-[#2d68c4]`, `h-[50px]`) khi giá trị đó thực sự đặc thù và không đáng để cấu hình vào theme chung.
