---
trigger: always_on
---

# MongoDB & Mongoose

## Technology Stack

* MongoDB
* Mongoose (qua `@nestjs/mongoose`)
* NestJS
* TypeScript

## Schema Standards

* Collection names dùng PascalCase trong Mongoose models.
* Dùng `timestamps: true` cho tất cả schema.
* Dùng ObjectId cho relationships.
* Tránh lưu dữ liệu trùng lặp (duplicated data).
* Tạo index cho các trường thường xuyên query.
* Dùng `lean()` cho read-only queries.
* **TUYỆT ĐỐI GIỮ NGUYÊN** format `timestamps` đang có của bảng nếu refactor.

Ví dụ (NestJS decorator):
```typescript
@Schema({
  collection: 'products',
  timestamps: true,
})
export class Product {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, unique: true, required: true })
  slug: string;

  @Prop({ type: Number, default: 1 })
  status: number;
}
```

## Query Standards

### Read

* Luôn select chỉ những trường cần thiết.
* Dùng `lean()` khi không cần document methods.
* Dùng phân trang cho tập dữ liệu lớn.

Ví dụ:
```typescript
await this.productModel
  .find(query)
  .select('name slug avatar status')
  .lean();
```

### Aggregate

Thứ tự ưu tiên trong pipeline:
```text
$match
$lookup
$unwind
$group
$project
$sort
$skip
$limit
```

Quy tắc:
* Đặt `$match` càng sớm càng tốt để giảm số document xử lý.
* Tránh `$lookup` không cần thiết.
* Dùng `allowDiskUse(true)` cho aggregation lớn.
* Xử lý null bằng `$ifNull`.
* Chống NaN bằng `$cond` kết hợp `$isNumber`.

Ví dụ:
```typescript
await this.productModel
  .aggregate(pipeline)
  .allowDiskUse(true);
```

## Performance Standards

* Tạo index cho trường search (`slug`, `status`, `parentId`, `createdAt`).
* Tránh regex không có index đi kèm.
* Tránh giá trị `skip` quá lớn — dùng cursor-based pagination khi cần.
* Dùng cursor cho dataset khổng lồ.
* Ưu tiên aggregation thay vì multiple queries riêng lẻ.

## ObjectId Rules

Validate ObjectId trước khi query:
```typescript
import { Types } from 'mongoose';

if (!Types.ObjectId.isValid(id)) {
  throw new BadRequestException('Invalid ID format');
}
```

## Update Standards

Ưu tiên:
```typescript
updateOne()
updateMany()
findOneAndUpdate()
```

Tránh dùng `save()` cho bulk operations.

## Error Handling

* Wrap database operations trong try/catch.
* Log aggregation errors.
* Trả error message có ý nghĩa.
* Validate inputs trước khi query.

## Project Conventions

* Luồng: Controller → Service → MongoDB
* Logic nghiệp vụ đặt trong Service layer.
* Controller KHÔNG chứa aggregation pipeline.
* Aggregation phức tạp tách thành helper function trong Service.

## Common Optimizations

* Dùng `lean()` cho read-only
* Dùng projection (select)
* Tạo index
* Dùng `allowDiskUse(true)`
* Dùng `bulkWrite()` cho batch updates
* Dùng `$facet` cho combined statistics
* Dùng `$lookup` pipeline syntax thay vì post-processing trong code TypeScript

## Xử Lý Danh Mục Lồng Nhau (Materialized Path)

Để tránh N+1 query khi truy vấn danh mục con lồng nhau không giới hạn, bắt buộc dùng pattern **Materialized Path**.
* Cấm dùng đệ quy `parentId` để query.
* Trong Schema của Category, thêm các trường `ancestors` (mảng ID cha), `path` (chuỗi đường dẫn) và `level`:

```typescript
@Prop({ type: [Types.ObjectId], ref: 'Category', default: [], index: true })
ancestors: Types.ObjectId[];   // VD: [ObjectId(iphone), ObjectId(iphone-17-series)]

@Prop({ type: String, index: true })
path: string;                  // VD: '/iphone/iphone-17-series/iphone-17-pro-max'

@Prop({ type: Number, default: 0, index: true })
level: number;                 // 0 = gốc
```

## Chiến Lược Giá (Denormalization)

Để tối ưu tốc độ filter và sort danh sách sản phẩm theo giá mà không cần `$lookup` mảng variants phức tạp:
* **Ngoại lệ có chủ đích**: Cho phép lưu trữ lặp dữ liệu giá trị min/max trực tiếp trên document Product.
* Bổ sung `priceFrom: number` và `priceTo: number` vào `ProductSchema`.
* Đánh index `{ categoryIds: 1, status: 1, priceFrom: 1 }`.
* Bắt buộc phải có Mongoose Middleware hoặc Logic đồng bộ (`recalcPriceRange`) mỗi khi Variant cập nhật giá.
