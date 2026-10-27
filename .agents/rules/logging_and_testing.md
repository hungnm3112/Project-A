---
trigger: always_on
---

## QUY TẮC LOGGING & TESTING

### 1. Logging (NestJS)
- **CẤM** sử dụng `console.log()` trong code trước khi merge vào `main`.
- Bắt buộc sử dụng thư viện `nestjs-pino` thay thế cho logger mặc định của NestJS.
- Request phải được gắn Correlation ID để dễ dàng tra cứu log (traceability) từ Frontend tới Backend.
- Lưu log ra file theo định dạng JSON đối với môi trường Production, log ra terminal format dễ đọc ở môi trường Dev.

### 2. Testing
Viết Unit Test (Jest) **TỐI THIỂU** cho các logic quan trọng, phức tạp sau đây:
- `generateSlug()`: Đảm bảo chuyển đổi dấu tiếng Việt và ký tự đặc biệt chuẩn xác.
- `SlugRegistryService.reserve()`: Đảm bảo bắt lỗi 409 Conflict khi trùng slug hoặc trùng với danh sách reserved.
- `CategoriesService.rebuildSubtree()`: Đảm bảo logic Materialized Path (cập nhật ancestors, path) chạy đúng khi đổi cha.
- Logic tính toán `priceFrom`, `priceTo` của `ProductsService`.
