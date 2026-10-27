---
trigger: always_on
---

## QUY TẮC BẢO MẬT (SECURITY)

Mục tiêu: chống Stored XSS và các lỗ hổng bảo mật phổ biến cho toàn bộ hệ thống.

### 1. Chống XSS (Cross-Site Scripting)

**Validation input:**
- Kiểm tra độ dài, kiểu dữ liệu, định dạng cho MỌI input từ người dùng
- Dùng `class-validator` trong DTO (NestJS) để validate ở tầng backend

**Sanitize:**
- BẮT BUỘC sử dụng hàm `sanitizeContent` từ `src/common/helpers/sanitize-content.helper.ts` cho tất cả các trường cho phép người dùng nhập HTML (ví dụ: nội dung bài viết, mô tả sản phẩm, cấu hình rich text).
- Nguyên tắc: **Chỉ gọi hàm sanitize lúc GHI** (Create/Update ở Backend) - tuyệt đối không gọi lúc ĐỌC để tối ưu hiệu năng.
- Không tự ý định nghĩa cấu hình `sanitize-html` rải rác ở các module, luôn dùng chung cấu hình ở file helper trên.
- Các trường text thông thường (tên, email, địa chỉ, số điện thoại): KHÔNG cho phép chứa thẻ HTML.

**Output encoding (Frontend React):**
- React tự động escape mặc định khi render `{variable}` — đây là lớp bảo vệ chính
- KHÔNG dùng `dangerouslySetInnerHTML` với dữ liệu chưa được sanitize
- Nếu bắt buộc render HTML (nội dung bài viết rich text): sanitize trước khi đưa vào `dangerouslySetInnerHTML`

**Các lệnh CẤM:**
- KHÔNG dùng `eval()`, `new Function()`, hoặc chèn trực tiếp dữ liệu vào `<script>`
- KHÔNG dùng `innerHTML` trong vanilla JS (nếu có)

### 2. Content Security Policy (CSP)
- Bật CSP bằng `helmet` middleware trong NestJS:
```typescript
import helmet from 'helmet';
app.use(helmet());
```
- CSP giúp giảm tác động nếu còn sót lỗ hổng XSS

### 3. CORS
- Cấu hình whitelist domain cụ thể, KHÔNG dùng `origin: '*'` trên production
```typescript
app.enableCors({
  origin: ['https://ap24h.vn', 'http://localhost:3000'],
  credentials: true,
});
```

### 4. Rate Limiting
- Dùng `@nestjs/throttler` cho các endpoint nhạy cảm:
  - Đăng nhập (login)
  - Đăng ký (register)
  - Gửi OTP
  - Quên mật khẩu
- Giới hạn: ví dụ 5 requests/60 giây cho login

### 5. MongoDB Injection
- Dùng Mongoose parameterized queries — KHÔNG nối chuỗi trực tiếp vào query
- Validate ObjectId trước khi query (xem `mongodb.md`)

### 6. Env Secrets
- File `.env` PHẢI nằm trong `.gitignore`
- KHÔNG commit secrets lên repository
- Dùng `.env.example` với giá trị mẫu để hướng dẫn team
