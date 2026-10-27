---
trigger: always_on
---

# Quy tắc Schema (Database) và DTO (Validation)

## 1. Mongoose Schema (NestJS Decorator)

Mỗi entity tạo 1 file `*.schema.ts` trong thư mục `schemas/` của module.

**BẮT BUỘC tuân thủ:**
- Dùng decorator `@Schema()` với `collection` tường minh và `timestamps: true`
- Dùng `@Prop()` để khai báo kiểu dữ liệu cho từng trường
- Trường nhạy cảm (password): dùng `select: false` để ẩn khỏi query mặc định

### Các kiểu dữ liệu thường dùng:
```typescript
// String
@Prop({ type: String, required: true })
name: string;

// String + unique index
@Prop({ type: String, unique: true, required: true })
slug: string;

// ObjectId (reference)
@Prop({ type: Types.ObjectId, ref: 'Category', index: true })
parentId: Types.ObjectId;

// Number (có giá trị mặc định)
@Prop({ type: Number, default: 0 })
sortOrder: number;

// Boolean
@Prop({ type: Boolean, default: false })
isActive: boolean;

// Date
@Prop({ type: Date })
publishedAt: Date;

// Enum
@Prop({ type: String, enum: ['in_stock', 'coming_soon', 'out_of_stock'], default: 'in_stock' })
stockStatus: string;

// Mixed / JSON object
@Prop({ type: mongoose.Schema.Types.Mixed, default: {} })
metadata: Record<string, unknown>;
```

### Ví dụ chuẩn khi tạo Schema:
```typescript
@Schema({
  collection: 'products',
  timestamps: true, // TUYỆT ĐỐI GIỮ NGUYÊN format timestamps khi refactor
})
export class Product {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, unique: true, required: true })
  slug: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', index: true, required: true })
  categoryId: Types.ObjectId;

  @Prop({ type: Number, default: 1 })
  status: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
```

## 2. DTO (Data Transfer Object)

Mỗi thao tác tạo 1 DTO riêng, đặt trong thư mục `dto/` của module.

**Quy tắc:**
- `CreateXxxDto`: Khai báo đầy đủ trường bắt buộc khi tạo mới
- `UpdateXxxDto`: Kế thừa `PartialType(CreateXxxDto)` để tự optional hóa
- Validate bằng `class-validator`: `@IsString()`, `@IsEmail()`, `@IsNotEmpty()`, `@IsOptional()`...
- Nested object: `@ValidateNested()` + `@Type(() => SubDto)` (từ `class-transformer`)

### Ví dụ:
```typescript
// create-product.dto.ts
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['in_stock', 'coming_soon', 'out_of_stock'])
  @IsOptional()
  stockStatus?: string;
}

// update-product.dto.ts
export class UpdateProductDto extends PartialType(CreateProductDto) {}
```
