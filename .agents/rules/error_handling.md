---
trigger: always_on
---

## QUY TẮC ERROR HANDLING & LOADING (FRONTEND)

### 1. File hệ thống bắt buộc (App Router)
Mỗi Route Group hoặc Route chính **BẮT BUỘC** phải có đủ 3 file hệ thống của Next.js để đảm bảo UX không bị gãy khi có lỗi:
- `loading.tsx`: Hiển thị Skeleton hoặc Spinner khi đang fetch data ở Server Component.
- `error.tsx`: Xử lý khi có lỗi runtime hoặc lỗi API (phải có nút "Thử lại" / Try again).
- `not-found.tsx`: Layout trang 404 thân thiện.

### 2. Error Boundary
- `error.tsx` luôn phải có `'use client'` ở dòng đầu tiên.
- Không để nguyên màn hình crash mặc định của Next.js lọt ra production.

### 3. API Error Handling (BFF)
- Luôn kiểm tra `res.ok` trong Fetch API.
- Chuẩn hoá format trả về lỗi từ API BFF cho Client:
```typescript
{
  success: false,
  message: "Lỗi kết nối hoặc thông báo từ BE",
  statusCode: 400
}
```
