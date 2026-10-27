---
trigger: always_on
---

## QUY TẮC GIT WORKFLOW

### 1. Phân nhánh (Branching)
- `main`: Nhánh production, luôn ở trạng thái ổn định và sẵn sàng deploy. Không code trực tiếp trên nhánh này.
- `[tên-developer]`: Nhánh làm việc cá nhân của từng thành viên (team 2 người). VD: `hungnm`. Tất cả tính năng và sửa lỗi đều code trên nhánh cá nhân này trước khi merge.

### 2. Commit Message Convention
Sử dụng Conventional Commits:
- `feat: [mô tả]` - Thêm tính năng mới
- `fix: [mô tả]` - Sửa lỗi
- `refactor: [mô tả]` - Sửa code nhưng không thêm tính năng hay sửa lỗi
- `style: [mô tả]` - Format code (space, dấu phẩy, v.v)
- `docs: [mô tả]` - Cập nhật tài liệu
- `chore: [mô tả]` - Cập nhật cấu hình, build tool (vd: thêm package)

**QUY TẮC BẮT BUỘC (Để vượt qua Husky & Commitlint):**
1. **Tiêu đề (Subject / Header):** Bắt buộc viết thường 100% (lower-case), tiếng Việt KHÔNG DẤU, tối đa 100 ký tự. Không được dùng chữ hoa (CamelCase, PascalCase...).
2. **Mô tả chi tiết (Body):** Bắt buộc sử dụng tiếng Việt KHÔNG DẤU, có thể viết hoa tùy ý. Tuy nhiên, **MỖI DÒNG trong Body không được vượt quá 100 ký tự** (`body-max-line-length`). Nếu mô tả dài, bắt buộc phải ngắt xuống dòng (Enter) để tránh lỗi.

Ví dụ đúng: `refactor(frontend): them ham xu ly query string vao utils`
Ví dụ sai: `refactor(frontend): Thêm hàm buildQueryString vào utils` (Lỗi viết hoa và có dấu)

### 3. Quy trình Pull Request (PR)
- Không push trực tiếp (Direct push) vào `main` hoặc `staging`.
- Tạo PR và yêu cầu ít nhất 1 người (Dev còn lại) review (Cross-review).
- Không merge nếu code không pass qua rules của `.agents/rules/`.
