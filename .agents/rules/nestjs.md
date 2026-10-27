---
trigger: always_on
---

## QUY TẮC BACKEND (NestJS)

### 1. Kiến trúc Module
- Mỗi chức năng nghiệp vụ = 1 NestJS Module riêng biệt
- Ví dụ: `ProductsModule`, `CategoriesModule`, `LeadsModule`, `AnalyticsModule`, `NewsModule`
- Tạo module mới bằng CLI: `npx nest g module/controller/service <tên>`

### 2. Luồng xử lý bắt buộc
```
Controller (nhận request) → Service (xử lý logic) → Schema/Model (thao tác DB)
```
- **Controller:** CHỈ nhận request, validate input (qua DTO), gọi service, trả response
- **Service:** Chứa TOÀN BỘ logic nghiệp vụ, gọi DB, tính toán
- **KHÔNG** viết logic xử lý, aggregation pipeline, hay truy vấn DB trực tiếp trong Controller

### 3. Cấu hình & Biến môi trường
- Dùng `ConfigService` của `@nestjs/config` để đọc biến môi trường
- KHÔNG dùng `process.env` trực tiếp trong service/controller (trừ `app.module.ts` khi bootstrap)
- Ví dụ:
```typescript
// ĐÚNG
constructor(private configService: ConfigService) {}
const dbUri = this.configService.get<string>('MONGODB_URI');

// SAI
const dbUri = process.env.MONGODB_URI;
```

### 4. Global Middleware & Pipes
- `ValidationPipe` (global): Tự động validate DTO đầu vào bằng `class-validator`
- `HttpExceptionFilter` (global): Trả response lỗi chuẩn JSON format
- Response chuẩn: `{ statusCode, message, data }`

### 5. Cấu trúc thư mục Backend
```
backend/src/
├── main.ts
├── app.module.ts
├── products/
│   ├── products.module.ts
│   ├── products.controller.ts
│   ├── products.service.ts
│   ├── schemas/
│   │   └── product.schema.ts
│   └── dto/
│       ├── create-product.dto.ts
│       └── update-product.dto.ts
├── categories/
│   ├── ...
└── common/
    ├── filters/
    ├── guards/
    └── helpers/
```
