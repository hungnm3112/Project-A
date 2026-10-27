---
trigger: always_on
---

## QUY TẮC ĐỊNH TUYẾN (ROUTING)

### 1. Frontend — Next.js App Router

**Cấu trúc route:**
- Mỗi route = 1 thư mục trong `src/app/` chứa `page.tsx`
- Dynamic route: `[slug]/page.tsx`
- Catch-all (danh mục đa cấp): `[...slug]/page.tsx`
- Route groups (nhóm layout): `(public)/`, `(admin)/`

**URL chuẩn site AP24H:**
```
/                                   → Trang chủ
/gio-hang                           → Giỏ hàng
/ket-qua?keyword=xxxxx             → Kết quả tìm kiếm
/thu-vien-anh                       → Thư viện ảnh
/danh-muc/[slug]                    → Danh mục sản phẩm (đa cấp cha-con)
/danh-muc/[slug]?sortBy=price_asc|price_desc|newest → Danh mục có sắp xếp (chặn crawl qua robots.txt)
/san-pham/[slug]                    → Chi tiết sản phẩm
/danh-muc-tin/[slug]                → Danh mục tin tức
/[slug_danh_muc]/[slug_tin_tuc]     → Chi tiết bài viết
/tin-tuc                            → Tổng hợp tin tức
/chinh-sach-bao-hanh                → Trang chính sách (tĩnh)
```

### 2. Backend — NestJS Controller & Chuẩn RESTful API

**Nguyên tắc chung:**
- Mỗi Module nghiệp vụ có Controller riêng (hoặc phân tách Controller Public và Admin nếu cần).
- API prefix bắt buộc toàn hệ thống: `/api/v1/`
- Controller decorator: `@Controller('api/v1/products')`
- Auth và phân quyền kiểm tra bằng `Guard` (vd: `JwtAuthGuard`, `RolesGuard`), không viết middleware kiểm tra thủ công.

**Quy tắc HTTP Method — Bắt buộc dùng `PUT`, KHÔNG dùng `PATCH`:**
- **Sử dụng `PUT` thay vì `PATCH`** cho toàn bộ thao tác cập nhật dữ liệu:
  - Tránh kén hoặc bị chặn/lỗi ở cấp độ hạ tầng mạng (Reverse Proxy như Nginx/Traefik, Cloudflare, Web Application Firewall (WAF), Load Balancer) và một số trình duyệt/HTTP client cũ không hỗ trợ tốt `PATCH`.
  - Phía backend tiếp nhận DTO cập nhật (kế thừa `PartialType`) xử lý linh hoạt cho cả cập nhật từng phần hoặc toàn bộ bản ghi.

**Chi tiết các quy tắc thiết kế chuẩn RESTful API:**
1. **Resource Naming (Định danh tài nguyên bằng danh từ số nhiều):**
   - Sử dụng **danh từ số nhiều** (`plural nouns`), chữ thường dạng `kebab-case`.
   - **CẤM** đưa động từ vào URI tài nguyên.
     - *Đúng:* `GET /api/v1/products`, `POST /api/v1/categories`, `DELETE /api/v1/users/:id`
     - *Sai:* `GET /api/v1/get-products`, `POST /api/v1/createCategory`, `POST /api/v1/delete-user`
2. **Ánh xạ chuẩn HTTP Methods với thao tác CRUD:**
   - `GET /api/v1/resources`: Lấy danh sách tài nguyên (kèm phân trang, lọc, tìm kiếm qua query string).
   - `GET /api/v1/resources/:id`: Lấy thông tin chi tiết một tài nguyên theo ID hoặc Slug.
   - `POST /api/v1/resources`: Tạo mới một tài nguyên.
   - `PUT /api/v1/resources/:id`: Cập nhật thông tin tài nguyên theo ID.
   - `DELETE /api/v1/resources/:id`: Xóa tài nguyên theo ID.
3. **Phân cấp tài nguyên (Nested Resources) khi có quan hệ cha - con:**
   - Thể hiện mối quan hệ phân cấp trực quan nhưng không lồng quá 2 cấp:
     - *Ví dụ:* `GET /api/v1/categories/:id/products` (lấy danh sách sản phẩm thuộc danh mục `:id`).
     - Với các thao tác trực tiếp trên phần tử con, trỏ trực tiếp vào endpoint con: `GET /api/v1/products/:id` thay vì lồng dài dòng `categories/:catId/products/:id`.
4. **Hành động phi tài nguyên (Sub-actions / RPC-style Endpoints):**
   - Với các nghiệp vụ không thuần CRUD (đổi trạng thái, kích hoạt, gửi lại mã, giải phóng/xác nhận):
   - Đặt hành động làm sub-resource hoặc hậu tố sau ID với method `POST` hoặc `PUT`:
     - *Ví dụ:* `POST /api/v1/auth/resend-otp`
     - *Ví dụ:* `PUT /api/v1/products/:id/toggle-status`
     - *Ví dụ:* `POST /api/v1/slug-registry/reserve`
5. **Lọc, Tìm kiếm, Sắp xếp và Phân trang (Query Parameters):**
   - Luôn sử dụng query string cho các tham số điều khiển dữ liệu:
     - Phân trang: `?page=1&limit=20` (kế thừa `PaginationDto`)
     - Tìm kiếm: `?keyword=iphone`
     - Sắp xếp: `?sort=createdAt&order=desc` hoặc `?orderby=asc`
     - Bộ lọc: `?status=1&categoryId=...&fromDate=...&toDate=...`
6. **Mã trạng thái phản hồi (HTTP Status Codes) nhất quán:**
   - `200 OK`: Truy vấn, cập nhật thành công (`GET`, `PUT`, `DELETE`).
   - `201 Created`: Tạo mới bản ghi thành công (`POST`).
   - `400 Bad Request`: Dữ liệu đầu vào không hợp lệ (bắt qua `ValidationPipe`).
   - `401 Unauthorized`: Chưa xác thực hoặc Token không hợp lệ / hết hạn.
   - `403 Forbidden`: Đã xác thực nhưng không có quyền thực hiện hành động.
   - `404 Not Found`: Không tìm thấy tài nguyên yêu cầu.
   - `409 Conflict`: Xung đột dữ liệu (trùng slug, trùng email, xung đột trạng thái).
   - `429 Too Many Requests`: Vượt ngưỡng Rate Limit.
   - `500 Internal Server Error`: Lỗi hệ thống máy chủ (tuyệt đối không lộ stack trace ra client).

**Ví dụ cấu trúc RESTful Controller mẫu:**
```typescript
@Controller('api/v1/products')
export class ProductsController {
  @Get()
  findAll(@Query() query: PaginationDto) {
    // GET /api/v1/products?page=1&limit=20
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // GET /api/v1/products/:id
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    // POST /api/v1/products
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    // PUT /api/v1/products/:id (Dùng PUT thay cho PATCH)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // DELETE /api/v1/products/:id
  }
}
```

### 3. Chống Xung Đột Route Ở Cấp Root (SlugRegistry)

**Rủi ro:** Các slug danh mục tin tức (`/:slug_danh_muc`), trang tĩnh (`/chinh-sach-bao-hanh`), và route cố định (`/gio-hang`, `/tin-tuc`) đều nằm ở root, rất dễ gây lỗi 500 hoặc 404 nếu trùng nhau.

**Giải pháp bắt buộc (ADR-004):**
- Khởi tạo collection `slug_registry` làm nguồn chân lý duy nhất (Single Source of Truth).
```typescript
{
  slug: string;        // unique index toàn cục
  type: 'news_category' | 'policy_page' | 'reserved';
  refId: ObjectId | null;
}
```
- Seed sẵn các slug `reserved` (danh sách route cố định + prefix hệ thống).
- Mọi thao tác create/update slug của `news_categories` và `policy_pages` PHẢI gọi `SlugRegistryService.reserve()`. Nếu trùng, trả lỗi HTTP 409 Conflict.
- Frontend Next.js sử dụng catch-all `app/[slug]/page.tsx` và gọi API `GET /api/v1/resolve?slug=...` để xác định loại component cần render.

### 4. Chuẩn Hóa Tham Số Sắp Xếp (Sorting Query Parameter) & Chặn Index

- **Tham số sắp xếp chính thức:** Thống nhất toàn hệ thống (Frontend UI, Admin, DTO/API) sử dụng duy nhất tham số **`sortBy`** với các giá trị:
  - `price_asc`: Giá từ thấp tới cao
  - `price_desc`: Giá từ cao tới thấp
  - `newest`: Mới nhất
- **Tương thích ngược & Tự động Redirect:** Tham số cũ `orderby` (hoặc các giá trị cũ `asc`/`desc`) khi người dùng hoặc bot truy cập vào `/danh-muc/[slug]` hoặc `/ket-qua` sẽ tự động được hệ thống thực hiện **Permanent Redirect (HTTP 308/301)** sang URL chuẩn dùng `?sortBy=...` để quy về canonical URL duy nhất, bảo vệ thứ hạng SEO.
- **Cấu hình robots.txt (Bảo vệ Crawl Budget):** File `robots.ts` bắt buộc cấu hình chặn cả hai tiền tố:
  - `Disallow: /*?sortBy=`
  - `Disallow: /*?orderby=`
  Nhằm ngăn chặn crawler lập chỉ mục các trang trùng lặp nội dung khi chỉ thay đổi thứ tự hiển thị.
