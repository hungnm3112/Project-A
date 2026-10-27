---
trigger: always_on
---

## QUY TẮC CACHING & REVALIDATION (NEXT.JS)

### 1. Chiến lược Caching mặc định
- Tận dụng tối đa Next.js Data Cache (fetch cache).
- Dữ liệu ít thay đổi (Danh mục, Chính sách): cache mặc định hoặc revalidate dài (ví dụ: 1 giờ).
- Dữ liệu thay đổi thường xuyên (Giá sản phẩm, Tồn kho): cache ngắn hoặc dùng `revalidateTag()`.

### 2. Quy ước đặt tên Tag (Cache Tags)
- Sử dụng chuẩn tag sau để dễ dàng Invalidate cache từ Admin/Backend:
  - Tất cả sản phẩm: `products`
  - Sản phẩm cụ thể: `product:{slug}`
  - Tất cả danh mục: `categories`
  - Danh mục cụ thể: `category:{slug}`
  - Tin tức: `news`, `news:{slug}`

### 3. Revalidation (Xoá cache)
- **BẮT BUỘC**: Sau mỗi mutation ở Admin/CMS (tạo, sửa, xóa Sản phẩm/Danh mục), Backend NestJS hoặc Next.js Server Action phải gọi webhook / hàm revalidate tương ứng.
- Ví dụ Next.js Server Action:
```typescript
import { revalidateTag } from 'next/cache';

export async function updateProduct(data: UpdateProductDto) {
  await apiPut('/api/v1/products', data);
  revalidateTag('products');
  revalidateTag(`product:${data.slug}`);
}
```
