---
trigger: always_on
---

## QUY TẮC CHUẨN HÓA SLUG & URL

### 1. Quy tắc tạo slug
- Slug phải là **chữ thường**, **không dấu tiếng Việt**, phân tách bằng dấu gạch ngang `-`
- KHÔNG chứa khoảng trắng, ký tự đặc biệt, hoặc `%20`
- Loại bỏ các ký tự không phải chữ cái/số/gạch ngang
- Ví dụ đúng: `iphone-17-pro-max-256gb-chinh-hang`
- Ví dụ sai: `Samsung%20Galaxy`, `iPhone_17`, `iphone 17`

### 2. Hàm chuẩn hóa slug
- Đặt hàm chung `generateSlug(text: string): string` trong `src/lib/utils.ts` (frontend) hoặc `src/common/helpers/` (backend)
- Dùng chung 1 hàm cho cả frontend lẫn backend

Ví dụ:
```typescript
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')                    // Tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '')     // Xóa dấu
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .replace(/[^a-z0-9\s-]/g, '')       // Xóa ký tự đặc biệt
    .replace(/\s+/g, '-')               // Thay khoảng trắng thành -
    .replace(/-+/g, '-')                // Gộp nhiều - liên tiếp
    .replace(/^-|-$/g, '');             // Xóa - đầu/cuối
}
```

### 3. Kiểm tra unique
- Trước khi lưu slug vào database, PHẢI kiểm tra không trùng với slug đã tồn tại
- Nếu trùng: trả lỗi 409 Conflict hoặc tự động append suffix (`-1`, `-2`...)
- Trường `slug` trong schema phải có `unique: true`

### 4. Tránh xung đột namespace
- Slug danh mục tin tức (`/:slug_danh_muc/:slug_tin_tuc`) có thể xung đột với:
  - Các trang tĩnh (chính sách, giỏ hàng)
  - Các route cố định (`gio-hang`, `ket-qua`, `thu-vien-anh`, `tin-tuc`)
- Backend PHẢI đánh index unique toàn cục cho slug danh mục tin tức + slug trang tĩnh
- Khi tạo slug mới, kiểm tra không trùng với danh sách route cố định

### 5. URL Pattern chuẩn site AP24H
```
/danh-muc/{slug}                     → Danh mục sản phẩm
/san-pham/{slug}                     → Chi tiết sản phẩm
/danh-muc-tin/{slug}                 → Danh mục tin tức
/{slug_danh_muc}/{slug_tin_tuc}      → Chi tiết bài viết
```
