<div align="center">
  <h1>🌊 Quantum Ripples | In the Infinite Stream</h1>
  <p><em>"Chính bởi vì tồn tại mà tôi biết tôi tồn tại, cho nên ta luôn tồn tại."</em></p>

  <p>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-087ea4?logo=react&logoColor=white" alt="React 19" /></a>
    <a href="https://tanstack.com/start"><img src="https://img.shields.io/badge/TanStack_Start-Beta-ec5990?logo=react&logoColor=white" alt="TanStack Start" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" /></a>
    <a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-DB-3ECF8E?logo=supabase&logoColor=white" alt="Supabase" /></a>
</p>
</div>

---

## 🌌 Về Dự Án (About the Project)

**Quantum Ripples (Gợn sóng Lượng tử)** là một không gian kỹ thuật số yên bình – một blog triết học cá nhân được xây dựng dựa trên lý thuyết về **Bất tử lượng tử (Quantum Immortality)** và chiều sâu của tâm thức. 

Nơi đây lưu giữ những dòng suy tưởng không đầu không cuối, những trải nghiệm nội tâm sâu sắc và các khái niệm về **Cái tôi & Sự tồn tại**. Giao diện website được thiết kế cực kỳ tối giản, tập trung hoàn toàn vào **Nghệ thuật Typography** và **Trải nghiệm Đọc Sâu (Deep Reading)**.


## ✨ Tính năng Nổi bật (Features)

- 📖 **Trải nghiệm Đọc Sâu (Zen Mode):** Sử dụng phông chữ serif mang hơi hướng trí thức, phong cách tối giản (Minimalist design), loại bỏ hoàn toàn các yếu tố làm xao nhãng.
- 🌊 **The Stream (Dòng Chảy):** Trình bày các suy nghĩ ngẫu nhiên, các đoạn nhật ký và suy tưởng theo một dòng thời gian liên tục.
- 💬 **Không gian Thảo luận (Community):** Nơi những người đọc có thể đăng nhập tài khoản và cùng trao đổi về các vấn đề siêu hình.
- 👤 **Hồ sơ Cá nhân (Profile):** Quản lý trạng thái, cập nhật thông tin và theo dõi lịch sử tương tác với những bộ óc đồng điệu khác.
- ⚡ **Hiệu năng Tối đa:** Render từ máy chủ (SSR) với tốc độ chớp nhoáng, đảm bảo truyền tải cảm xúc và trải nghiệm người dùng hoàn hảo.

## 🛠 Ngăn xếp Công nghệ (Tech Stack)

Dự án này là biểu tượng của sự kết hợp giữa **Triết học và Công nghệ hiện đại**. Sử dụng những bộ công cụ mạnh mẽ và tiên tiến nhất:

### Frontend
- **Framework:** [React 19](https://react.dev/) + [TanStack Start](https://tanstack.com/start) + [Vite](https://vitejs.dev/)
- **Routing:** [TanStack Router](https://tanstack.com/router) (Type-safe & SSR-ready)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) + Lucide Icons + Shadcn
- **Animation:** Embla Carousel (Sliders), Framer Motion / Animation-css

### Backend & Data
- **Database & Auth:** [Supabase](https://supabase.com/) (Real-time DB, PostgreSQL, JWT Authentication)
- **State Management:** [React Query v5](https://tanstack.com/query)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) + Zod (Validation)

## 🚀 Hướng dẫn Cài đặt & Chạy cục bộ

Làm theo các bước sau để chạy khởi chạy dự án trên môi trường của bạn:

### 1. Yêu cầu Hệ thống
- **Node.js** (Phiên bản v18 hoặc v20+ trở lên)
- Git đã được cài đặt trên máy.

### 2. Thiết lập Môi trường
Clone dự án về máy:
```bash
git clone https://github.com/namvip55/quantum-ripples.git
cd "Quantum Immortality"
```

Cài đặt tất cả các gói phụ thuộc (Dependencies):
```bash
npm install
```

Tạo file `.env` ở thư mục gốc của dự án và cấu hình Authentication + Database thông qua Supabase:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Khởi chạy Ứng dụng
Khởi động máy chủ phát triển:
```bash
npm run dev
```
Website sẽ được tải tại địa chỉ: `http://localhost:8080/` (Phụ thuộc vào cấu hình Vite hiện tại của bạn).

## 📂 Tổ chức Cấu trúc (Project Architecture)

```text
📦 Quantum Immortality
 ┣ 📂 public               # Chứa ảnh, tài sản tĩnh (assets)
 ┣ 📂 src
 ┃ ┣ 📂 components         # Các phần giao diện dùng chung (Navbar, Footer, Layout)
 ┃ ┃ ┗ 📂 ui               # UI Core tĩnh (Shadcn/Radix UI cơ bản)
 ┃ ┣ 📂 hooks              # Custom Hooks (VD: check trạng thái Auth, theme mobile)
 ┃ ┣ 📂 lib                # Hàm tiện ích dùng chung và khởi tạo kết nối Supabase
 ┃ ┣ 📂 routes             # Chứa toàn bộ logic các trang điều hướng (Tanstack file-based)
 ┃ ┃ ┣ 📜 __root.tsx       # Root layout - Khung tĩnh áp dụng cho cả project
 ┃ ┃ ┣ 📜 index.tsx        # Trang chủ: Dòng chảy sự sống (The Stream)
 ┃ ┃ ┗ 📜 about.tsx        # Thông tin cốt lõi
 ┃ ┣ 📜 index.css          # Quản lý lớp css hệ thống
 ┃ ┗ 📜 main.tsx           # Entry point của ứng dụng
 ┣ 📜 package.json         # Danh sách packages và scripts khởi chạy
 ┣ 📜 vite.config.ts       # Cấu hình Vite & plugins
 ┗ 📜 README.md            # Tài liệu dự án (File bạn đang đọc)
```

## 📜 Giấy phép (License)
Dự án được tạo lập do niềm đam mê học thuật cá nhân. Mã nguồn mở tự do để tham khảo.

---
<div align="center">
  <p><em>"Trong dòng thời gian vô tận, mỗi chúng ta là một gợn sóng không bao giờ tan biến."</em></p>
</div>