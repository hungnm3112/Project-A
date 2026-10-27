---
trigger: always_on
---

## QUY TẮC SEO

### 1. Meta Tags (bắt buộc cho mọi trang)
- `<title>`: Mô tả ngắn gọn nội dung trang, format: `{Tên trang} | AP24H`
- `<meta name="description">`: 150-160 ký tự, chứa từ khóa chính
- `<link rel="canonical">`: URL chính thức của trang (tránh duplicate content)
- Open Graph (`og:title`, `og:description`, `og:image`, `og:url`): cho Facebook/Zalo share
- Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)

Trong Next.js, sử dụng `export const metadata` hoặc `generateMetadata()`:
```typescript
// Static metadata
export const metadata: Metadata = {
  title: 'iPhone 17 Pro Max | AP24H',
  description: 'Mua iPhone 17 Pro Max chính hãng...',
};

// Dynamic metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.slug);
  return {
    title: `${product.name} | AP24H`,
    description: product.metaDescription,
    openGraph: { images: [product.avatar] },
  };
}
```

### 2. Heading (H1-H6)
- Mỗi trang chỉ có **DUY NHẤT 1 thẻ H1**, chứa từ khóa chính
- Thứ tự heading phải tuần tự: H1 → H2 → H3 (KHÔNG nhảy cấp)
- KHÔNG dùng heading chỉ để chỉnh cỡ chữ — heading phản ánh cấu trúc ngữ nghĩa

**Heading theo loại trang:**

| Loại trang | H1 | H2 | H3 |
|---|---|---|---|
| Trang chủ | Tagline/Logo text | Nhóm sản phẩm nổi bật | Tin tức, Cửa hàng |
| Danh mục SP | Tên danh mục | Nhóm lọc/breadcrumb | Tên từng sản phẩm |
| Chi tiết SP | Tên đầy đủ sản phẩm | Thông số, Mô tả, Liên quan | Mục con thông số |
| Danh mục tin | Tên danh mục tin tức | — | Tiêu đề từng bài |
| Chi tiết tin | Tiêu đề bài viết | Đề mục lớn | Đề mục con |
| Chính sách | Tên chính sách | Từng điều khoản | — |

### 3. Structured Data (JSON-LD)
- **Product**: Cho trang chi tiết sản phẩm (tên, giá, sku, availability)
- **BreadcrumbList**: Cho mọi trang có breadcrumb
- **Organization**: Cho trang chủ (tên công ty, logo, mạng xã hội)

### 4. Hình ảnh
- Thuộc tính `alt` mô tả đúng nội dung thực tế của ảnh (KHÔNG để trống)
- Ảnh sản phẩm/banner: rà soát bổ sung `alt` đầy đủ

### 5. Kỹ thuật SEO
- `<html lang="vi">` — khai báo ngôn ngữ tiếng Việt
- Tự động generate `robots.txt` và `sitemap.xml`
- Trang không cần index (giỏ hàng, tìm kiếm): `<meta name="robots" content="noindex, follow">`
- Bổ sung breadcrumb kèm structured data `BreadcrumbList`
