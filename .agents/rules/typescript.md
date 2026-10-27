---
trigger: always_on
---

## QUY TẮC TYPESCRIPT

### 1. Strict Mode
- `strict: true` bắt buộc — KHÔNG tắt bất kỳ strict flag nào
- KHÔNG dùng `any` — ưu tiên `unknown` nếu chưa biết kiểu, sau đó narrow type

### 2. Khai báo kiểu
- Định nghĩa `interface` hoặc `type` cho mọi: response API, props component, payload request
- Export type riêng biệt: `export type` / `export interface` — không gộp chung với logic xử lý
- Đặt type definitions chung trong `src/types/`

Ví dụ:
```typescript
// src/types/product.ts
export interface Product {
  _id: string;
  name: string;
  slug: string;
  avatar: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
```

### 3. Enum vs Union Type
- Enum chỉ dùng cho giá trị cố định nhiều nơi tham chiếu (status, role, stock_status)
- Ưu tiên `as const` + union type cho các tập giá trị đơn giản:
```typescript
// Ưu tiên cách này
const STOCK_STATUS = ['in_stock', 'coming_soon', 'out_of_stock'] as const;
type StockStatus = typeof STOCK_STATUS[number];

// Chỉ dùng enum khi thực sự cần
enum UserRole { ADMIN = 'admin', USER = 'user' }
```

### 4. Utility Types
- Dùng `Record<string, T>`, `Pick<T, K>`, `Omit<T, K>`, `Partial<T>` thay vì khai báo lại
- Dùng `ReturnType<typeof fn>` để suy kiểu từ hàm

### 5. Coding Style
- `async/await` bắt buộc — không dùng `.then().catch()` callback chain
- `const` ưu tiên, chỉ dùng `let` khi cần gán lại giá trị
- KHÔNG dùng `var`
