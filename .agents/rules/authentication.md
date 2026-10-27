---
trigger: always_on
---

## QUY TẮC XÁC THỰC (AUTHENTICATION)

### 1. Cơ chế xác thực
- Sử dụng **JWT** (JSON Web Token) do NestJS cấp phát
- Access Token: thời hạn ngắn (15-30 phút)
- Refresh Token: thời hạn dài (7 ngày), lưu trong database

### 2. Lưu trữ Token
- Token lưu trong **httpOnly Cookie** (set từ Next.js Server Actions)
- KHÔNG lưu token trong `localStorage` hoặc `sessionStorage` (dễ bị XSS đánh cắp)
- Cookie flags: `httpOnly`, `secure` (production), `sameSite: 'lax'`

### 3. Mã hóa mật khẩu
- Dùng **`bcrypt`** để băm mật khẩu (salt rounds ≥ 10)
- KHÔNG dùng SHA512, MD5, hoặc bất kỳ thuật toán hash đơn giản nào
- KHÔNG log hoặc trả về password trong response (dùng `select: false` trong schema)

### 4. Bảo vệ Route (NestJS)
- Dùng `JwtAuthGuard` (custom Guard) để bảo vệ endpoint cần xác thực
- Passport Strategy: `passport-jwt`, trích xuất token từ header `Authorization: Bearer <token>`
- Decorator `@Public()` để đánh dấu endpoint không cần auth

### 5. Luồng OTP (kích hoạt tài khoản / quên mật khẩu)
- OTP có thời hạn (5 phút), lưu dạng hash trong database
- Sau khi verify thành công → xóa OTP khỏi database
- Gửi OTP qua email bằng `nodemailer` (SMTP Gmail + App Password)

### 6. Bảo mật cấu hình
- JWT Secret, Mail Password, API Key: đọc từ `.env` qua `ConfigService`
- KHÔNG hardcode secrets trong source code
