---
trigger: always_on
---

## QUY TẮC GIAO TIẾP API (API COMMUNICATION)

### 1. Kiến trúc BFF (Backend-For-Frontend)
- Client browser → Next.js API Route (`/api/*`) → NestJS backend (`localhost:8060`)
- Client KHÔNG gọi trực tiếp URL backend từ trình duyệt
- API Route Handler trong `src/app/api/` đóng vai trò proxy

### 2. Fetch Wrapper chung
- Tập trung tất cả hàm gọi API vào 1 file: `src/lib/api.ts`
- Chia thành các hàm riêng cho từng method: `apiGet()`, `apiPost()`, `apiPut()`, `apiDelete()`
- Tự động gắn `Authorization: Bearer <token>` vào header
- KHÔNG viết logic fetch rải rác trong component
- **QUAN TRỌNG:** Biến `NEXT_PUBLIC_API_URL` trong file `.env` đã được cấu hình sẵn chứa prefix `/api/v1` (vd: `http://localhost:8060/api/v1`). Vì vậy, khi gọi `apiGet('/endpoint')`, **TUYỆT ĐỐI KHÔNG** được thêm `/api/v1` vào tham số endpoint để tránh lỗi lặp `/api/v1/api/v1/endpoint`. Luôn bắt đầu bằng dấu `/` như `/products`, `/menus`, `/trust-badges`.

Ví dụ:
```typescript
// src/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8060';

async function apiRequest<T>(method: string, endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      // Token sẽ được gắn ở đây
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  return res.json();
}

export const apiGet = <T>(endpoint: string) => apiRequest<T>('GET', endpoint);
export const apiPost = <T>(endpoint: string, data: unknown) => apiRequest<T>('POST', endpoint, data);
export const apiPut = <T>(endpoint: string, data: unknown) => apiRequest<T>('PUT', endpoint, data);
export const apiDelete = <T>(endpoint: string) => apiRequest<T>('DELETE', endpoint);
```

### 3. Server Actions
- Dùng Server Actions (`'use server'`) cho các thao tác mutate (form submit, CRUD)
- Server Actions có thể gọi trực tiếp backend mà không cần qua BFF
- Dùng `revalidateTag()` sau mỗi mutation để cập nhật cache

### 4. Response format chuẩn

**Nguyên tắc RESTful:**
- HTTP Status Code bắt buộc nằm ở HTTP Response Header (200, 201, 400, 422, 500...). Tuyệt đối không trả về 200 OK ở Header khi API thất bại.
- Loại bỏ trường `statusCode` trong JSON body để tránh dư thừa với Header.

**Backend (NestJS) — Thành công (200 OK / 201 Created):**
```json
// Dữ liệu đơn lẻ hoặc danh sách:
{
  "data": { "id": "...", "name": "..." }
}

// Danh sách có phân trang:
{
  "data": {
    "items": [
      { "id": "...", "name": "..." }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

**Backend (NestJS) — Thất bại (422 / 4xx / 5xx):**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ",
    "details": [
      { "field": "email", "message": "Email đã tồn tại" }
    ]
  }
}
```

**BFF (Next.js API Route / api.ts wrapper):**
```typescript
// Thành công:
{ success: true, data: T }

// Thất bại:
{ success: false, message: string, statusCode: number, code?: string, details?: ApiErrorDetail[] }
```

