---
trigger: always_on
---

## QUY TẮC CHUNG TOÀN DỰ ÁN (GENERAL CONVENTIONS)

### 1. Stack công nghệ
- **Frontend:** Next.js 16 (App Router, TypeScript, TailwindCSS)
- **Backend:** NestJS 11 (TypeScript, Mongoose ODM)
- **Database:** MongoDB (local)
- **Ngôn ngữ:** TypeScript bắt buộc cho cả FE lẫn BE

### 2. Cấu trúc Monorepo
- `frontend/` và `backend/` nằm ngang hàng trong workspace
- File `.env` chung đặt ở root workspace, KHÔNG hardcode secrets
- File `.env` phải nằm trong `.gitignore`

### 3. Quy tắc đặt tên (Naming Conventions)

**Tên File & Thư mục:**
- **Backend NestJS:** Dùng `kebab-case` + hậu tố chuẩn. Ví dụ: `products.controller.ts`, `create-product.dto.ts`, `product.schema.ts`
- **Component React:** Dùng `PascalCase.tsx`. Ví dụ: `ProductCard.tsx`, `MegaMenu.tsx`
- **Hook/Util/Type (Frontend):** Dùng `camelCase.ts`. Ví dụ: `useAnalytics.ts`, `formatPrice.ts`
- **Thư mục:** Dùng `kebab-case`. Ví dụ: `components/product-card/`, `app/danh-muc/`

**Tên Biến & Hàm:**
- Viết theo `camelCase` (chuẩn TypeScript/React/NestJS)
- Ví dụ: `const userData = {}`, `function getUserInfo() {}`, `let isActive = true;`

**Tên Class & Component React:**
- Dùng `PascalCase`
- Ví dụ: `class ProductsService {}`, `function ProductCard() {}`

**Hằng số cố định:**
- Dùng `UPPER_SNAKE_CASE`
- Ví dụ: `const MAX_RETRY_COUNT = 3;`, `const API_BASE_URL = '...'`

**Tên trường và tên bảng Database (MongoDB):**
- Dùng `snake_case` theo chuẩn leader (xem `database_design.md` mục 3.2)
- Ví dụ: `parent_id`, `customer_id`, `total_amount`, `unsign_search`
- Ngoại lệ: `_id`, `ID` và 2 trường `createdAt`, `updatedAt` do `timestamps: true` tự sinh

**API URL & Route:**
- Dùng chữ thường, phân cách bằng dấu gạch ngang `-` (kebab-case)
- Ví dụ: `/api/v1/user-profile`, `/danh-muc/iphone-17-pro-max`

### 4. Quy tắc khác
- File upload theo môi trường cần thêm vào `.gitignore`
- Comment tiếng Việt cho logic nghiệp vụ, tiếng Anh cho technical docs
- Mỗi file không quá 300 dòng code — tách file nếu vượt quá
