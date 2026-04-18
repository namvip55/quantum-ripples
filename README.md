# 🌊 Ripples in the Infinite Stream

> *"Chính bởi vì tồn tại mà tôi biết tôi tồn tại, cho nên ta luôn tồn tại."*

**Ripples in the Infinite Stream** là một blog triết học cá nhân – một không gian tĩnh lặng để chia sẻ những suy tư về **Cái tôi, Bản ngã và Sự sống**, bắt nguồn từ hành trình khám phá Bất tử lượng tử (Quantum Immortality) và ý thức.

Website được thiết kế theo phong cách **hiện đại, tối giản**, tập trung tuyệt đối vào trải nghiệm đọc sâu (deep reading). Đây không chỉ là một blog, mà còn là một lời mời chiêm nghiệm về bản chất của thực tại.

---

## ✨ Tính năng nổi bật

- **Trải nghiệm Đọc Sâu (Deep Reading):** Giao diện tập trung tối đa vào con chữ, sử dụng nghệ thuật typography (chữ serif) mang tính trí thức, không phân tâm.
- **Dòng chảy thời gian (The Stream / Timeline):** Ghi chú những dòng suy tưởng ngắn, những gợn sóng suy nghĩ thoáng qua trong tâm lý học và triết học.
- **Không gian thảo luận (Discussions):** Nơi những tâm hồn đồng điệu có thể trao đổi, đặt câu hỏi về bản chất của thực tại và sự tồn tại.
- **Cá nhân hóa:** Mỗi người dùng có thể tạo tài khoản, tùy chỉnh hồ sơ cá nhân (Profile) và tương tác với các bài luận.

## 🛠 Nền tảng công nghệ (Tech Stack)

Dự án được xây dựng trên một ngăn xếp công nghệ cực kỳ hiện đại và tối ưu hóa hiệu suất mạnh mẽ:

- **Framework:** React 19 kết hợp với [TanStack Start](https://tanstack.com/start) & [Vite](https://vitejs.dev/)
- **Định tuyến (Routing):** [TanStack Router](https://tanstack.com/router) cho hiệu năng SSR và Type-safe routing tốt nhất.
- **Giao diện & UI:** [Tailwind CSS v4](https://tailwindcss.com/) & Radix UI (các thành phần UI hiện đại, khả năng truy cập cao).
- **Lưu trữ & Xác thực:** [Supabase](https://supabase.com/) (Hỗ trợ xác thực người dùng an toàn, cơ sở dữ liệu thời gian thực).
- **Quản lý trạng thái:** React Query.

## 🚀 Hướng dẫn Cài đặt & Chạy cục bộ

Để chạy dự án này trên máy của bạn, hãy làm theo các bước sau:

**1. Clone kho lưu trữ:**
```bash
git clone https://github.com/namvip55/quantum-ripples.git
cd "Quantum Immortality"
```

**2. Cài đặt các gói phụ thuộc (Dependencies):**
```bash
npm install
```

**3. Thiết lập biến môi trường (Environment Variables):**
Tạo một file `.env` hoặc cấu hình các thông số Supabase cần thiết để kết nối cơ sở dữ liệu và hệ thống xác thực.

**4. Chạy môi trường phát triển (Development mode):**
```bash
npm run dev
```
Dự án sẽ khởi chạy tại cổng mặc định của Vite (ví dụ: `http://localhost:5173`).

## ✍️ Kiến trúc thư mục cơ bản

- `src/routes`: Bao gồm tất cả các trang của website thông qua TanStack File-based routing (`stream.tsx`, `blog.tsx`, `discussions.tsx`,...).
- `src/components`: Chứa các layout và các thành phần giao diện dùng chung (Header, Footer, ReadingProgress,...).
- `src/components/ui`: Kho thành phần UI tĩnh từ hệ thống Radix / Shadcn.
- `src/lib`: Chứa các tệp logic tái sử dụng (như kết nối `supabase.ts`).
- `src/hooks`: Custom Hooks phục vụ việc xử lý dữ liệu và trải nghiệm người dùng (mobile, auth).

---
*“Trong dòng thời gian vô tận, mỗi chúng ta là một gợn sóng không bao giờ tan biến.”*