---
trigger: always_on
---

## QUY TẮC FRONTEND (Next.js)

### 1. Server Component vs Client Component
- Mặc định mọi component là **Server Component** (không cần khai báo gì)
- CHỈ thêm `'use client'` khi component cần: `useState`, `useEffect`, `onClick`, `onChange`, browser API (`localStorage`, `sessionStorage`, `window`, `navigator`)
- Không đặt `'use client'` ở đầu file nếu không thực sự cần

### 2. Cấu trúc thư mục Frontend
Tất cả source code nằm trong `src/`:
```
frontend/src/
├── app/                    # Next.js App Router (pages, layouts, API routes)
│   ├── layout.tsx          # Layout gốc (font, CSS global, metadata)
│   ├── page.tsx            # Trang chủ
│   ├── (public)/           # Route group trang công khai
│   │   ├── danh-muc/
│   │   ├── san-pham/
│   │   └── tin-tuc/
│   ├── (admin)/            # Route group trang quản trị
│   └── api/                # API Route Handlers (BFF)
│       └── track/route.ts
├── components/             # React components tái sử dụng
│   ├── layout/             # Header, Footer, Sidebar, Breadcrumb
│   ├── product/            # ProductCard, ProductGrid, ProductDetail
│   ├── common/             # Button, Modal, Loading, Toast
│   └── forms/              # SearchForm, ContactForm
├── hooks/                  # Custom React hooks
│   └── useAnalytics.ts
├── lib/                    # Utilities, helpers, API wrapper
│   ├── api.ts              # Fetch wrapper (POST/GET/PUT/DELETE)
│   └── utils.ts            # Hàm tiện ích (generateSlug, formatPrice...)
└── types/                  # TypeScript type definitions
    └── index.ts
```

### 3. Path Alias
- `@/` trỏ đến `./src/*` (đã cấu hình trong `tsconfig.json`)
- Luôn dùng `@/components/...`, `@/hooks/...`, `@/lib/...` thay vì đường dẫn tương đối `../../`

### 4. API Route Handler (BFF — Backend-For-Frontend)
- Đặt trong `src/app/api/`
- Đây là tầng proxy giữa client browser và NestJS backend
- Client KHÔNG gọi trực tiếp URL backend (`localhost:8060`) — luôn gọi qua BFF

### 5. Responsive Design
- Dùng TailwindCSS, KHÔNG tách file CSS/JS riêng cho desktop và mobile
- Thiết kế Mobile-first: bắt đầu từ mobile, mở rộng bằng `sm:`, `md:`, `lg:`, `xl:`

### 6. Phân chia code theo chức năng
- Mỗi feature/chức năng nhóm vào 1 thư mục trong `components/`
- Ví dụ: `components/product/` chứa `ProductCard.tsx`, `ProductGrid.tsx`, `ProductFilter.tsx`
- KHÔNG tạo thư mục tổng kiểu `components/mobile/` hay `components/desktop/`

### 7. Quy tắc JSX/TSX (thay thế quy tắc EJS cũ)
- Dùng nháy kép `"` cho thuộc tính JSX: `className="..."`, `style={{...}}`
- Dùng nháy đơn `'` cho string trong logic TypeScript: `const name = 'AP24H'`
- KHÔNG dùng `dangerouslySetInnerHTML` trừ khi dữ liệu đã qua sanitize
- Dùng CSS class (TailwindCSS) thay vì inline style cho styling
