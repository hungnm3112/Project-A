---
trigger: always_on
---

## QUY TẮC ANALYTICS & LEAD TRACKING

### 1. Kiến trúc tracking
- Tracking ngầm qua BFF pattern:
```
useAnalytics() hook (client) → /api/track (Next.js BFF) → NestJS backend → MongoDB
```
- Người dùng KHÔNG biết đang bị track (không hiển thị UI tracking)

### 2. Định danh người dùng
- `client_id`: UUID lưu trong `localStorage` — nhận diện thiết bị (tồn tại vĩnh viễn cho đến khi xóa cache)
- `session_id`: UUID lưu trong `sessionStorage` — nhận diện phiên truy cập (mất khi đóng tab)

### 3. UTM Parameters
- Lấy UTM params (`utm_source`, `utm_medium`, `utm_campaign`) từ query string URL
- CHỈ lấy lần đầu tiên của session, lưu vào `sessionStorage`
- Nếu URL không có UTM → bỏ qua, không ghi đè giá trị cũ

### 4. Referrer
- Lấy `document.referrer` lần đầu tiên của session
- Nếu truy cập trực tiếp (không có referrer): ghi nhận là `'direct'`

### 5. Gửi event
- Dùng `navigator.sendBeacon()` để gửi event — KHÔNG block UI rendering
- Fallback: `fetch()` với `keepalive: true` nếu sendBeacon không khả dụng
- Event type chính: `page_view` (mỗi lần chuyển trang)

### 6. Payload chuẩn
```typescript
{
  clientId: string;
  sessionId: string;
  eventType: 'page_view' | 'click' | 'form_submit';
  urlPath: string;         // window.location.pathname
  referrer: string;        // document.referrer hoặc 'direct'
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}
```

### 7. Backend lưu trữ
- Lưu raw events vào collection `analytics_events`
- Xử lý aggregate (thống kê, báo cáo) ở service/job riêng, KHÔNG xử lý lúc nhận event
- Không tracking thông tin cá nhân (PII) nếu chưa có consent
