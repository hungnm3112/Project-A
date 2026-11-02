# THIẾT KẾ DATABASE - BÀI TẬP 2 (MODULE 01 & MODULE 02)

> **Phạm vi:** Hệ thống quản lý kho tập trung Công ty ABC / Laptop24h (đề bài `md/LessonTwo/bài_tập_api.txt`).
> **Nguồn chuẩn:** Tổng hợp từ buổi học số 2 (31/10/2026 - Chủ trì: Nguyễn Huy Hoàng) và 2 file gốc của leader (`md/LessonTwo/bảng 2.json`, `md/LessonTwo/Sơ đồ phần ra _ database.json`).
> **Quy tắc thiết kế chung:** Xem `.agents/rules/database_design.md`.

---

## 1. Logic cốt lõi từ Buổi học số 2 (31/10/2026) — Hệ thống thực tế Laptop24h

Trong buổi họp rà soát thiết kế CSDL, leader Nguyễn Huy Hoàng đã chốt nguyên tắc: **Làm theo đúng thực tế vận hành của hệ thống nhà mình (Laptop24h), tuyệt đối không dùng nhầm tư duy sơ đồ cũ.**

### 1.1. Phân biệt 3 bảng hàng hóa cốt lõi (`categories` vs `subcategories` vs `products`)

Nhiều người khi mới nhìn tên bảng tiếng Anh thường hiểu sai `subcategories` là "danh mục con" và `products` là "bảng thông tin sản phẩm". Trong hệ thống thực tế của Laptop24h, bản chất của 3 bảng này như sau:

| Tên bảng trong DB | Tên gọi trong cuộc họp | Bản chất nghiệp vụ thực tế tại Laptop24h | Thuộc Module nào? |
|---|---|---|---|
| **`categories`** | **Danh mục sản phẩm** | • Lưu danh mục loại sản phẩm như *Pin, RAM, CPU, Main, Màn hình...* (có `parent_id` phân cấp cha - con).<br>• Đóng vai trò phân loại và nối xuống bảng sản phẩm `subcategories`. | **Module 02** (`CRUD danh mục sản phẩm`) |
| **`subcategories`** | **Bảng Sản phẩm / Sản phẩm chung** *(Subcategory)* | • **Thực chất đây là BẢNG SẢN PHẨM (mẫu sản phẩm / mặt hàng chung)** chứ không phải bảng phân loại danh mục.<br>• Lưu tên mặt hàng, danh mục (`category_id`), đơn vị tính (`unit_id`), mã `sku`, `barcode`, giá bán (`price`), bảo hành (`warranty`).<br>• Khi lập phiếu nhập kho (`import_form`), nhân viên chọn mặt hàng từ chính bảng này (`subcategory_id`). | **Module 02** (`CRUD sản phẩm` & `Quản lý mã SKU, barcode`) |
| **`products`** | **Sản phẩm cuối + Mã QR** *(Product / Mã QR)* | • **Không tạo thủ công ở Module 02**, mà được **tự động sinh ra SAU KHI nhập kho xong**.<br>• Mỗi chiếc hàng hóa thực tế nhập vào kho sẽ sinh ra 1 dòng trong `products` kèm **mã QR (`ID`)** (dùng mã của nhà cung cấp nếu có, hoặc tự sinh theo `timestamp` / `Date.now`).<br>• Có trạng thái mặc định **`status: false` (chưa xuất kho)**. | **Module Nhập/Xuất kho** (Buổi học số 2) |

### 1.2. Tại sao không lưu cột `quantity` (tồn kho) trực tiếp trong `subcategories` như sơ đồ cũ?
* **Ở sơ đồ cũ (`Sơ đồ phần ra _ database.json`):** Bảng sản phẩm có cột `quantity: Number` cộng/trừ trực tiếp và tách bảng `form_import` + `detail_form_import` rời nhau.
* **Ở sơ đồ mới chuẩn Laptop24h (`bảng 2.json`):**
  1. Bỏ cột `quantity` tổng trên bảng sản phẩm.
  2. Phiếu nhập kho (`import_form`) gồm: `ID`, `date` riêng, `employee_id`, `user_id` (nhà cung cấp), `total_amount`, `warehouse_id`, `branch_id` (chi nhánh), và **nhúng trực tiếp 2 mảng chi tiết**:
     * `product` (Array): Chi tiết **sản phẩm linh kiện** (hàng vật lý).
     * `service` (Array): Chi tiết **sản phẩm dịch vụ**.
     * Mỗi phần tử chi tiết (`detail_product`) chứa: `subcategory_id`, `index` (số thứ tự dòng), `price`, `quantity` (số lượng nhập), `vat`, `ck` (chiết khấu), `warranty`, `discount`.
  3. Khi phiếu nhập hoàn tất với `quantity = N` cho một `subcategory_id`, hệ thống tự sinh ra `N` bản ghi trong bảng `products` (mỗi chiếc 1 mã QR riêng, `status = false`). Tồn kho thực tế chính là tổng số lượng các cá thể `products` đang có `status = false`!

---

## 2. Đặc tả chi tiết 8 Collection của Bài tập 2 (Module 01 & Module 02)

> Toàn bộ 8 bảng dưới đây đồng bộ 100% với sơ đồ `drawio/LessonTwo/Database.drawio` và tài liệu API (`api-module-01.md`, `api-module-02.md`). Mọi collection đều bật `timestamps: true` (tự sinh `createdAt`, `updatedAt`).

### 2.1. Phân hệ Module 01: Người dùng & Phân quyền (3 bảng)

**1. `roles` — Vai trò hệ thống**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| ID | String, unique | true | mã vai trò: `ADMIN`, `WAREHOUSE_MANAGER`, `WAREHOUSE_STAFF`, `ACCOUNTANT` |
| name | String | true | tên vai trò |
| permissions | Array | default : [ ] | danh sách quyền của vai trò |
| status | Number, Index | true, default = 1 | 0 dừng hoạt động, 1 đang hoạt động |

**2. `employees` — Nhân viên (kế thừa bảng mẫu `employees` của leader, bổ sung `role_id` và `warehouse_ids`)**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| ID | String, unique | true | ID nhân viên (VD: `NV001`) |
| name | String | true | tên nhân viên |
| phone | String, unique | true | số điện thoại (dùng để đăng nhập) |
| password | String | true | mật khẩu (dạng mã hóa sha512) |
| role_id | ObjectId, Index | true | vai trò (ref `roles`) |
| warehouse_ids | Array | default : [ ] | danh sách kho phụ trách (ref `warehouses`) |
| status | Number, Index | true, default = 1 | 0 dừng hoạt động, 1 đang hoạt động |
| unsign_search | String, Index | | tên, ID, sđt không dấu để tìm kiếm |

**3. `refresh_tokens` — Phiên đăng nhập**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| employee_id | ObjectId, Index | true | nhân viên sở hữu token (ref `employees`) |
| token | String, unique | true | refresh token (dạng mã hóa sha512) |
| expired_at | Date | true | thời điểm hết hạn (7 ngày) |
| status | Number, Index | true, default = 1 | 0 đã đăng xuất / thu hồi, 1 đang hiệu lực |

---

### 2.2. Phân hệ Module 02: Quản lý Danh mục - Master Data (5 bảng)

**4. `warehouses` — Kho hàng (kế thừa bảng mẫu `warehouses` trong `bảng 2.json`)**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| ID | String, unique | true | mã kho (VD: `KHO01`) |
| name | String | true | tên kho |
| phone | String | | số điện thoại kho |
| address | String | | địa chỉ kho |
| branch_id | ObjectId | default: null | chi nhánh (trong `bảng 2.json`) |
| status | Number, Index | true, default = 1 | 0 dừng hoạt động, 1 đang hoạt động |
| unsign_search | String, Index | | tên, mã kho không dấu |

**5. `customers` — Khách hàng & Nhà cung cấp (kế thừa bảng mẫu `customers` của leader, dùng chung cho cả KH và NCC)**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| ID | String, unique | true | mã khách hàng / nhà cung cấp (VD: `KH001`, `NCC001`) |
| type | Number, Index | true, default = 1 | 1 khách hàng, 2 nhà cung cấp |
| name | String | true | tên khách hàng / nhà cung cấp |
| phone | String | true | số điện thoại |
| gender | Number | default: 0 | giới tính |
| birthday | Date | default: null | ngày sinh |
| address | Array | default : [ ] | danh sách địa chỉ |
| email | String | | email |
| tax | String | | mã số thuế |
| status | Number, Index | true, default = 1 | 0 dừng hoạt động, 1 đang hoạt động |
| unsign_search | String, Index | | tên, mã, sđt không dấu |

**6. `categories` — Danh mục sản phẩm: Pin, RAM, CPU, Main... (kế thừa bảng mẫu `categories` của leader)**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| parent_id | ObjectId | default: null | id danh mục cha (`null` = cấp gốc) |
| name | String | true | tên danh mục sản phẩm (VD: `RAM`, `CPU`) |
| status | Number, Index | true, default = 1 | 0 dừng hoạt động, 1 đang hoạt động |
| unsign_search | String, Index | | tên không dấu để tìm kiếm |

**7. `units` — Đơn vị tính**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| name | String, unique | true | tên đơn vị tính: cái, chiếc, hộp, bộ... |
| status | Number, Index | true, default = 1 | 0 dừng hoạt động, 1 đang hoạt động |

**8. `subcategories` — Bảng Sản phẩm kèm SKU & Barcode (kế thừa bảng `subcategories` trong `bảng 2.json`)**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| category_id | ObjectId, Index | true | danh mục sản phẩm (ref `categories`) |
| unit_id | ObjectId | true | đơn vị tính (ref `units`) |
| name | String | true | tên sản phẩm cụ thể |
| sku | String, unique | true | mã SKU định danh sản phẩm |
| barcode | String, unique | default: null | mã vạch barcode |
| price | Number | default = 0 | giá bán niêm yết |
| warranty | Number | default = 0 | bảo hành (tháng) |
| status | Number, Index | true, default = 1 | 0 dừng hoạt động, 1 đang hoạt động |
| unsign_search | String, Index | | tên, SKU, barcode không dấu |

---

## 3. Đối chiếu các bảng mẫu nguyên văn của Leader (Phục vụ tra cứu & Module Nhập kho tiếp theo)

### 3.1. Các bảng chuẩn theo Sơ đồ mới (`bảng 2.json` - Buổi học số 2)

**`warehouses`** (bảng 2)
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | |
| name | String | true | |
| branch_id | | | chi nhánh |

**`subcategories`** (bảng 2 — Bảng sản phẩm)
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | |
| name | String | true | |

**`import_form`** (bảng 2 — Phiếu nhập kho nhúng mảng chi tiết linh kiện & dịch vụ)
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | |
| ID | String | true | |
| employee_id | | | nhân viên lập phiếu |
| user_id | | | nhà cung cấp |
| date | datetime | | ngày tạo phiếu |
| total_amount | | | tổng tiền |
| warehouse_id | | | kho nhập |
| branch_id | | | chi nhánh (bổ sung trong cuộc họp) |
| product | array | | chi tiết sản phẩm linh kiện |
| service | array | | chi tiết sản phẩm dịch vụ |

**`detail_product`** (bảng 2 — Cấu trúc phần tử của mảng `product` / `service` trong `import_form`)
| field | type | required | des |
|---|---|---|---|
| index | Number | | số thứ tự dòng trong phiếu nhập |
| price | | | giá nhập |
| quantity | | | số lượng nhập |
| vat, ck, warranty, discount | | | thuế, chiết khấu, bảo hành, giảm giá |
| subcategory_id | String | true | tham chiếu bảng sản phẩm `subcategories` |

**`products (sản phẩm cuối + QR)`** (bảng 2 — Tự sinh sau khi nhập kho)
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | |
| ID | String, unique | default: Date.now | mã QR (theo mã NCC hoặc sinh theo timestamp) |
| subcategory_id | String | true | tham chiếu bảng sản phẩm `subcategories` |
| form_import_id | | | tham chiếu phiếu nhập `import_form` |
| index | | | dòng thứ tự trong phiếu nhập |
| price | | | giá |
| status | boolean | false | mặc định `false` = chưa xuất kho |

### 3.2. Các bảng từ `Sơ đồ phần ra _ database.json` (Buổi 1)

**`employees`**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| ID | String, unique | true | ID nhân viên |
| name | String | true | tên nhân viên |
| phone | String, unique | true | số điện thoại |
| password | String | true | mật khẩu (dạng mã hóa sha512) |
| status | Number, Index | true, default = 1 | 0 dừng hoạt động, 1 đang hoạt động |
| unsign_search | String, Index | | |

**`categories`**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| parent_id | ObjectId | default: null | id danh mục |
| name | String | true | tên sản phẩm |

**`customers`**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| name | String | true | |
| phone | String | true | |
| gender | Number | default: 0 | |
| birthday | Date | default: null | |
| address | Array | default : [ ] | |
| email | | | |
| tax | String | | |

**`payment_form`**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| ID | String | true | |
| amount | Number | default = 0 | |
| customer_id | ObjectId | default = 0 | nhà cung cấp |
| form_import_id | ObjectId | null | |
| note | String | default null | |
| type_payment_id | ObjectId | | |
| content_payment | ObjectId | | |

**`debts`**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| date | date | true, default: Date.now | ngày tạo |
| customer_id | ObjectId | true | nhà cung cấp |
| (chưa đặt tên) | ObjectId | | id chứng từ |
| type_form | String | [import, export, receive, payment] | |
| total_import | | 5000 | |
| total_payment | | 2000 | |
| total_export | | | |
| total_receive | | | |
