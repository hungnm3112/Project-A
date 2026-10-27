---
trigger: always_on
---

## QUY TẮC XỬ LÝ FILE & HÌNH ẢNH

### 1. Upload / Download tập trung
- Upload và download file sử dụng **service chung**: `FilesModule` (NestJS)
- Tuyệt đối KHÔNG viết lại logic xử lý lưu file bên trong các Module riêng lẻ (Products, News...)
- Các module khác gọi upload/download thông qua `FilesService`
- Khi lưu đường dẫn file (URL) vào database, lưu đúng đường dẫn mà API Upload trả về

### 2. Validate file upload
- Kiểm tra file size: tối đa 5MB cho ảnh sản phẩm/banner
- Kiểm tra file type: chỉ cho phép `image/jpeg`, `image/png`, `image/webp`
- Trả lỗi 400 nếu file không hợp lệ

### 3. Đặt tên file
- Rename file khi upload: `{slug}-{timestamp}.{ext}`
- Loại bỏ ký tự đặc biệt, khoảng trắng, dấu tiếng Việt trong tên file
- Ví dụ: `iphone-17-pro-max-1693456789.webp`

### 4. Frontend — Hiển thị ảnh
- Luôn dùng component `next/image` (tự động tối ưu, lazy load, responsive)
- BẮT BUỘC khai báo:
  - `alt`: mô tả nội dung thực tế của ảnh (quan trọng cho SEO)
  - `width` và `height`: hoặc dùng prop `fill` với container có kích thước
- KHÔNG dùng thẻ `<img>` trực tiếp

### 5. Thư mục lưu trữ
- File upload lưu vào `public/uploads/` hoặc cloud storage (tuỳ giai đoạn)
- Thư mục `uploads/` phải nằm trong `.gitignore`
