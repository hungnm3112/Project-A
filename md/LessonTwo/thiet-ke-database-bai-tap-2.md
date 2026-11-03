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
| **`subcategories`** | **Bảng Sản phẩm / Sản phẩm chung** *(Subcategory)* | • **Thực chất đây là BẢNG SẢN PHẨM (mẫu sản phẩm / mặt hàng chung)** chứ không phải bảng phân loại danh mục.<br>• Lưu tên mặt hàng (`name`), danh mục (`category_id`), đơn vị tính (`unit_id`), mã sản phẩm (`sku`, `default: null`), giá bán (`price`), bảo hành (`warranty`).<br>• **Không lưu mã `barcode` cố định ở đây**, vì tại Laptop24h mã quét định danh từng chiếc hàng hóa là mã QR (`ID`) nằm ở bảng `products`.<br>• Khi lập phiếu nhập kho (`import_form`), nhân viên chọn mặt hàng từ chính bảng này (`subcategory_id`). | **Module 02** (`CRUD sản phẩm` & `Mã sản phẩm SKU`) |
| **`products`** | **Sản phẩm cuối + Mã QR** *(Product / Mã QR)* | • **Không tạo thủ công ở Module 02**, mà được **tự động sinh ra SAU KHI nhập kho xong (`import_form`)**.<br>• Mỗi chiếc hàng hóa thực tế nhập vào kho sẽ sinh ra 1 dòng trong `products` kèm **mã QR định danh (`ID`)**: dùng mã của nhà cung cấp nếu có sẵn trên sản phẩm, hoặc tự sinh theo `timestamp` (`default: Date.now`). Đây chính là mã dùng để bắn/quét định danh từng chiếc sản phẩm tại kho.<br>• Có trạng thái mặc định **`status: false` (chưa xuất kho)**. | **Module Nhập/Xuất kho** (Buổi học số 2) |

### 1.2. Tại sao không lưu cột `quantity` (tồn kho) trực tiếp trong `subcategories` như sơ đồ cũ?
* **Ở sơ đồ cũ (`Sơ đồ phần ra _ database.json`):** Bảng sản phẩm có cột `quantity: Number` cộng/trừ trực tiếp và tách bảng `form_import` + `detail_form_import` rời nhau.
* **Ở sơ đồ mới chuẩn Laptop24h (`bảng 2.json`):**
  1. Bỏ cột `quantity` tổng trên bảng sản phẩm.
  2. Phiếu nhập kho (`import_form`) gồm: `ID`, `date` riêng, `employee_id`, `user_id` (nhà cung cấp), `total_amount`, `warehouse_id`, `branch_id` (chi nhánh), và **nhúng trực tiếp 2 mảng chi tiết**:
     * `product` (Array): Chi tiết **sản phẩm linh kiện** (hàng vật lý).
     * `service` (Array): Chi tiết **sản phẩm dịch vụ**.
     * Mỗi phần tử chi tiết (`detail_product`) gồm 8 trường riêng biệt: `index` (số thứ tự dòng), `subcategory_id` (sản phẩm nhập), `price` (giá nhập), `quantity` (số lượng nhập), `vat` (thuế VAT), `ck` (chiết khấu %, max 100), `warranty` (bảo hành), `discount` (giảm giá).
  3. Khi phiếu nhập hoàn tất với `quantity = N` cho một `subcategory_id`, hệ thống tự sinh ra `N` bản ghi trong bảng `products` (mỗi chiếc 1 mã QR riêng, `status = false`). Tồn kho thực tế chính là tổng số lượng các cá thể `products` đang có `status = false`!

### 1.3. Logic Kế toán - Công nợ của Leader: Tách bạch `payment_form` (Chứng từ thanh toán) và `debts` (Sổ cái công nợ)

Trong thiết kế của Leader, `payment_form` và `debts` là **2 bảng hoàn toàn độc lập**, đóng 2 vai trò khác nhau:

1. **Bảng `payment_form` (Chứng từ Phiếu Thanh Toán — Phiếu Chi / Thu) & 2 bảng cấu hình động (`type_payments`, `content_payments`):**
   * Ghi nhận sự kiện **tiền thực tế đi ra / đi vào quỹ** (`ID` mã phiếu, `amount` số tiền thanh toán, `customer_id` đối tác, `type_payment_id` hình thức thanh toán, `content_payment` nội dung thanh toán, `note` ghi chú).
   * Do **Hình thức thanh toán** (*tiền mặt, chuyển khoản, quẹt thẻ...*) và **Nội dung thanh toán** (*thanh toán cho nhà cung cấp, thanh toán phòng ban nội bộ...*) là **dữ liệu động** thay đổi theo thực tế vận hành, hệ thống tách thành **2 bảng cấu hình riêng (`type_payments` và `content_payments`)** cho phép người dùng tự cấu hình, và `payment_form` tham chiếu qua `ObjectId` (`type_payment_id` và `content_payment`).
   * Có trường `form_import_id` (`default: null`) nối sang `import_form`: cho phép trả tiền đích danh cho 1 phiếu nhập cụ thể, hoặc để `null` nếu trả công nợ gộp nhiều lần.
2. **Bảng `debts` (Sổ cái theo dõi biến động Công nợ — Debt Ledger):**
   * Ghi nhận **mọi biến động làm tăng/giảm công nợ** theo từng chứng từ gốc (`type_form` thuộc `[import, export, receive, payment]`).
   * Sử dụng **4 cột tiền tách biệt** cho 2 chiều công nợ (kèm ví dụ `5000` và `2000` của Leader):
     * **Chiều Nhà cung cấp (Mua hàng & Thanh toán):**
       * Khi lập phiếu nhập (`import_form`) trị giá `5000` $\rightarrow$ ghi vào `debts` với `type_form = 'import'`, `total_import = 5000` (tăng nợ phải trả NCC).
       * Khi lập phiếu chi (`payment_form`) trả `2000` $\rightarrow$ ghi vào `debts` với `type_form = 'payment'`, `total_payment = 2000` (giảm nợ phải trả NCC).
       * **Công nợ còn phải trả NCC** = $\sum \text{total\_import} - \sum \text{total\_payment} = 5000 - 2000 = 3000$.
     * **Chiều Khách hàng / Khách thợ (Bán hàng & Thu tiền):**
       * Khi xuất bán (`export`) $\rightarrow$ ghi `total_export` (tăng nợ phải thu khách).
       * Khi lập phiếu thu tiền khách (`receive`) $\rightarrow$ ghi `total_receive` (giảm nợ phải thu khách).
       * **Công nợ còn phải thu Khách** = $\sum \text{total\_export} - \sum \text{total\_receive}$.

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
| unsign_search | String, Index | | tên, ID, sđt (lưu cả có dấu và không dấu) để tìm kiếm |

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
| unsign_search | String, Index | | tên, mã kho (lưu cả có dấu và không dấu) |

**5. `customers` — Khách hàng & Nhà cung cấp (kế thừa bảng mẫu `customers` của leader, dùng chung cho cả KH và NCC)**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| ID | String, unique | true | mã khách hàng / nhà cung cấp (VD: `KH001`, `NCC001`) |
| type | Number, Index | true, default = 1 | 1 khách hàng, 2 nhà cung cấp, 3 khách thợ |
| name | String | true | tên khách hàng / nhà cung cấp |
| phone | String | true | số điện thoại |
| gender | Number | default: 0 | giới tính |
| birthday | Date | default: null | ngày sinh |
| address | Array | default : [ ] | danh sách địa chỉ |
| email | String | | email |
| tax | String | | mã số thuế |
| status | Number, Index | true, default = 1 | 0 dừng hoạt động, 1 đang hoạt động |
| unsign_search | String, Index | | tên, mã, sđt (lưu cả có dấu và không dấu) |

**6. `categories` — Danh mục sản phẩm: Pin, RAM, CPU, Main... (kế thừa bảng mẫu `categories` của leader)**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| parent_id | ObjectId | default: null | id danh mục cha (`null` = cấp gốc) |
| name | String | true | tên danh mục sản phẩm (VD: `RAM`, `CPU`) |
| status | Number, Index | true, default = 1 | 0 dừng hoạt động, 1 đang hoạt động |
| unsign_search | String, Index | | tên danh mục (lưu cả có dấu và không dấu) để tìm kiếm |

**7. `units` — Đơn vị tính**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| name | String, unique | true | tên đơn vị tính: cái, chiếc, hộp, bộ... |
| status | Number, Index | true, default = 1 | 0 dừng hoạt động, 1 đang hoạt động |

**8. `subcategories` — Bảng Sản phẩm chung (kế thừa bảng mẫu sản phẩm của leader)**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| category_id | ObjectId, Index | true | danh mục sản phẩm (ref `categories`) |
| unit_id | ObjectId | true | đơn vị tính (ref `units`) |
| name | String | true | tên sản phẩm cụ thể |
| sku | String | default: null | mã sản phẩm (SKU) |
| price | Number | default = 0 | giá bán niêm yết |
| warranty | Number | default = 0 | bảo hành (tháng) |
| status | Number, Index | true, default = 1 | 0 dừng hoạt động, 1 đang hoạt động |
| unsign_search | String, Index | | tên, mã sản phẩm (lưu cả có dấu và không dấu) |

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
| index | Number | true | số thứ tự dòng trong phiếu nhập |
| price | Number | default = 0 | giá nhập |
| quantity | Number | default = 0 | số lượng nhập |
| vat | Number | default = 0 | thuế VAT |
| ck | Number | default = 0, max = 100 | chiết khấu (%) |
| warranty | Number | default = 0 | bảo hành (tháng) |
| discount | Number | default = 0 | giảm giá |
| subcategory_id | ObjectId | true | tham chiếu bảng sản phẩm `subcategories` |

**`products (sản phẩm cuối + QR)`** (bảng 2 — Tự sinh sau khi nhập kho)
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | |
| ID | String, unique | default: Date.now | mã QR (theo mã NCC hoặc sinh theo timestamp) |
| subcategory_id | ObjectId | true | tham chiếu bảng sản phẩm `subcategories` |
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

**`payment_form` — Bảng Phiếu thanh toán (Phiếu chi / thu)**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| ID | String | true | mã phiếu thanh toán (phiếu chi / thu) |
| amount | Number | default = 0 | số tiền thanh toán |
| customer_id | ObjectId | default = 0 | nhà cung cấp (ref `customers`) |
| form_import_id | ObjectId | null | phiếu nhập liên quan (ref `import_form`) |
| note | String | default null | ghi chú |
| type_payment_id | ObjectId | true | hình thức thanh toán (ref `type_payments`) |
| content_payment | ObjectId | true | nội dung thanh toán (ref `content_payments`) |

**`type_payments` — Bảng Danh mục Hình thức thanh toán (Cấu hình động)**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| name | String, unique | true | tên hình thức thanh toán (tiền mặt, chuyển khoản...) |
| status | Number, Index | true, default = 1 | 0 dừng hoạt động, 1 đang hoạt động |

**`content_payments` — Bảng Danh mục Nội dung thanh toán (Cấu hình động)**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| name | String, unique | true | nội dung thanh toán (thanh toán nhà cung cấp, thanh toán phòng ban nội bộ...) |
| status | Number, Index | true, default = 1 | 0 dừng hoạt động, 1 đang hoạt động |

**`debts` — Bảng Sổ cái Công nợ theo từng chứng từ**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| date | date | true, default: Date.now | ngày tạo |
| customer_id | ObjectId | true | nhà cung cấp (ref `customers`) |
| bill_id | ObjectId | true | id chứng từ gốc (`import_form` / `payment_form`...) |
| type_form | String | [import, export, receive, payment] | loại chứng từ phát sinh công nợ |
| total_import | Number | default = 0 (VD: 5000) | tổng tiền nhập (tăng nợ phải trả NCC) |
| total_payment | Number | default = 0 (VD: 2000) | tổng tiền đã thanh toán (giảm nợ phải trả NCC) |
| total_export | Number | default = 0 | tổng tiền xuất bán (tăng nợ phải thu KH) |
| total_receive | Number | default = 0 | tổng tiền đã thu (giảm nợ phải thu KH) |
