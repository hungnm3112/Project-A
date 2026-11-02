# THIẾT KẾ DATABASE - BÀI TẬP 2 (MODULE 01 & MODULE 02)

> Phạm vi: Hệ thống quản lý kho tập trung Công ty ABC (đề bài `md/bài_tập_api-1793586028228-585016149.txt`).
> Nguồn: tổng hợp nguyên văn từ 2 bảng mẫu của leader (`md/LessonTwo/Sơ đồ phần ra _ database.json`, `md/LessonTwo/bảng 2.json`).
> Quy tắc thiết kế chung: xem `.agents/rules/database_design.md`.

---

## 1. Bảng mẫu của leader (nguyên văn)

**employees**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| ID | String, unique | true | ID nhân viên |
| name | String | true | tên nhân viên |
| phone | String, unique | true | số điện thoại |
| password | String | true | mật khẩu (dạng mã hóa sha512) |
| status | Number, Index | true, default = 1 | 0 dừng hoạt động, 1 đang hoạt động |
| unsign_search | String, Index | | |

**categories**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| parent_id | ObjectId | default: null | id danh mục |
| name | String | true | tên sản phẩm |

**customers**
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

**warehouses** (bảng 2)
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | |
| name | String | true | |
| branch_id | | | |

**subcategories** (bảng 2)
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | |
| name | String | true | |

**products (sản phẩm cuối + QR)** (bảng 2)
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | |
| ID | String, unique | default: Date.now | |
| subcategory_id | String | true | |
| form_import_id | | | |
| index | | | |
| price | | | |
| status | boolean | false | |

**form_import**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| ID | Number, unique | true, tự sinh | 124 |
| date | date, index | true, default: Date.now | ngày tạo |
| customer_id | ObjectId | true | nhà cung cấp |
| total_amount | Number | default = 0 (tính từ chi tiết phiếu nhập) | tổng tiền |
| paid | Number | | |
| note | | | |

**detail_form_import**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| subcategory_id | ObjectId | true | |
| form_import_id | ObjectId | true, default: Date.now | ngày tạo |
| price | Number | default = 0 | nhà cung cấp |
| warranty | Number | default = 0 | bảo hành |
| vat | Number | default = 0 | |
| ck | Number | default = 0, max = 100 | |
| discount | Number | | |
| quantity | | | |

**import_form** (bảng 2)
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | |
| ID | String | true | |
| employee_id | | | |
| user_id | | | |
| date | datetime | | ngày tạo phiếu |
| total_amount | | | |
| warehouse_id | | | |
| product | array | | chi tiết sản phẩm linh kiện |
| service | array | | chi tiết sản phẩm dịch vụ |

**detail_product** (bảng 2 - phần tử của mảng chi tiết)
| field | type | required | des |
|---|---|---|---|
| index | Number | | |
| price | | | |
| quantity | | | |
| vat, ck, warranty, discount | | | |
| subcategory_id | String | true | |

**payment_form**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| ID | String | true | |
| amount | Number | default = 0 | ngày tạo |
| customer_id | ObjectId | default = 0 | nhà cung cấp |
| form_import_id | ObjectId | null | bảo hành |
| note | String | default null | |
| type_payment_id | ObjectId | | |
| content_payment | ObjectId | | |

**debts**
| field | type | required | des |
|---|---|---|---|
| _id | ObjectId | true | _id hệ thống tự sinh |
| date | date | true, default: Date.now | ngày tạo |
| customer_id | ObjectId | true | nhà cung cấp |
| (chưa đặt tên) | ObjectId | | |
| type_form | String | [import, export, receive, payment] | |
| total_import | | 5000 | |
| total_payment | | 2000 | |
| total_export | | | |
| total_receive | | | |

## 2. Áp dụng cho Bài tập 2
- Module 01 (người dùng, phân quyền) dựa trên bảng mẫu `employees`.
- Module 02 (danh mục) dựa trên các bảng mẫu `categories`, `subcategories`, `customers`, `warehouses`, `products`.
- Các đối tượng đề bài yêu cầu nhưng bảng mẫu chưa có (vai trò, gán nhân viên phụ trách kho, đơn vị tính, nhà cung cấp, SKU, barcode): thiết kế theo đúng các quy ước ở `.agents/rules/database_design.md` (mục 3), và hỏi người dùng trước khi chốt.

