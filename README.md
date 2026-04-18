<div align="center">

  <!-- LOGO / FAVICON -->
  <img src="public/favicon.svg" alt="Quantum Ripples Logo" width="120" height="120" />

  <br /><br />

  # 🌊 Quantum Ripples

  ### *Ripples in the Infinite Stream*

  <br />

  > *「Chính bởi vì tồn tại mà tôi biết tôi tồn tại, cho nên ta luôn tồn tại.」*

  <br />

  Một blog triết học cá nhân — nơi giao thoa giữa **Vật lý Lượng tử**, **Triết học Ý thức** và **Nghệ thuật thị giác**.  
  Được xây dựng với ngăn xếp công nghệ hiện đại nhất, phục vụ trải nghiệm **deep reading** thuần khiết.

  <br />

  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" /></a>
  <a href="https://tanstack.com/start"><img src="https://img.shields.io/badge/TanStack_Start-SSR-EF4444?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Start" /></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" /></a>
  <a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-Auth_&_DB-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" /></a>

  <br /><br />

  [Xem Demo](https://quantum-ripples.pages.dev) · [Báo lỗi](https://github.com/namvip55/quantum-ripples/issues) · [Đề xuất tính năng](https://github.com/namvip55/quantum-ripples/issues)

</div>

<br />

---

<br />

## 📸 Ảnh chụp Giao diện

> ⚠️ *Screenshots sẽ được cập nhật khi dự án hoàn thiện giao diện chính thức.*

<br />

## 🌌 Giới thiệu

**Quantum Ripples** không chỉ là một blog — đó là một **không gian kỹ thuật số tĩnh lặng**, nơi những suy tưởng về bản chất của thực tại được trải ra qua từng con chữ.

Lấy cảm hứng từ lý thuyết **Bất tử Lượng tử (Quantum Immortality)** — ý tưởng rằng ý thức luôn tồn tại trong ít nhất một nhánh của đa vũ trụ — dự án này là nhật ký tư duy của một người đang lắng nghe dòng chảy bên trong chính mình.

### Triết lý Thiết kế

| Nguyên tắc | Mô tả |
|:---|:---|
| 🧘 **Zen Mode** | Giao diện tối giản tuyệt đối, loại bỏ mọi thứ không cần thiết |
| 📝 **Typography-first** | Serif font ([Lora](https://fonts.google.com/specimen/Lora)) cho nội dung, [Inter](https://fonts.google.com/specimen/Inter) cho UI — tách biệt rõ ràng giữa đọc và tương tác |
| 🌊 **Fluid motion** | Chuyển trang mượt mà, hiệu ứng hover tinh tế, reading progress bar |
| 🌙 **Dark-native** | Thiết kế từ nền tối, với palette màu được chọn lọc kỹ lưỡng |

<br />

## ✨ Tính năng

<table>
  <tr>
    <td width="50%">

### 📖 Blog & Bài luận
Hệ thống blog đầy đủ với **dynamic routing** (`/blog/:slug`). Mỗi bài viết được trình bày trong layout đọc sâu tối ưu, kèm thanh tiến trình đọc (Reading Progress Bar).

  </td>
    <td width="50%">

### 🌊 The Stream
Dòng chảy suy tưởng liên tục — những đoạn nhật ký ngắn, ghi chú triết học, suy nghĩ thoáng qua — được sắp xếp theo timeline. Mỗi gợn sóng là một khoảnh khắc tư duy.

  </td>
  </tr>
  <tr>
    <td width="50%">

### 💬 Discussions
Không gian cộng đồng để trao đổi về các vấn đề siêu hình. Người dùng có thể tạo chủ đề mới (`/discussions/new`), bình luận và phản hồi lẫn nhau.

  </td>
    <td width="50%">

### 🔐 Auth & Profile
Hệ thống xác thực qua **Supabase Auth** (Email / OAuth). Mỗi người dùng có trang hồ sơ cá nhân để quản lý thông tin và theo dõi lịch sử tương tác.

  </td>
  </tr>
</table>

<br />

## 🛠 Ngăn xếp Công nghệ

```
┌──────────────────────────────────────────────────┐
│                    FRONTEND                       │
│                                                   │
│  React 19 ─── TanStack Start ─── Vite 7.3        │
│       │              │                            │
│       │        TanStack Router                    │
│       │        (File-based, SSR, Type-safe)       │
│       │                                           │
│  Tailwind CSS v4 ─── Radix UI ─── Lucide Icons   │
│                                                   │
├──────────────────────────────────────────────────┤
│                  BACKEND & DATA                   │
│                                                  │
│  Supabase ──── PostgreSQL ──── JWT Auth           │
│       │                                           │
│  React Query v5 ─── React Hook Form ─── Zod      │
│                                                   │
└──────────────────────────────────────────────────┘
```

<details>
<summary><b>📦 Danh sách đầy đủ Dependencies</b></summary>

<br />

| Thư viện | Phiên bản | Vai trò |
|:---|:---:|:---|
| `react` | `19.2` | UI Library |
| `@tanstack/react-start` | `1.167` | Full-stack framework (SSR) |
| `@tanstack/react-router` | `1.168` | Type-safe file-based routing |
| `@tanstack/react-query` | `5.83` | Async state management |
| `vite` | `7.3` | Build tool & dev server |
| `tailwindcss` | `4.2` | Utility-first CSS |
| `@supabase/supabase-js` | `2.103` | Database & Authentication |
| `@radix-ui/*` | `latest` | Accessible UI primitives |
| `lucide-react` | `0.575` | Icon system |
| `react-hook-form` + `zod` | `7.71` / `3.24` | Form handling & validation |
| `recharts` | `2.15` | Data visualization |
| `sonner` | `2.0` | Toast notifications |
| `embla-carousel-react` | `8.6` | Carousel / Slider |
| `date-fns` | `4.1` | Date formatting |

</details>

<br />

## 📂 Cấu trúc Dự án

```
quantum-ripples/
│
├── public/
│   ├── favicon.svg              # Logo SVG (rounded avatar)
│   └── images/                  # Static assets
│
├── src/
│   ├── components/
│   │   ├── SiteLayout.tsx       # Layout wrapper (Header + Content + Footer)
│   │   ├── SiteHeader.tsx       # Navigation bar chính
│   │   ├── SiteFooter.tsx       # Footer
│   │   ├── ReadingProgress.tsx  # Thanh tiến trình đọc bài
│   │   ├── PostCard.tsx         # Card hiển thị bài viết
│   │   ├── PostListItem.tsx     # Danh sách bài viết dạng list
│   │   ├── CommentSection.tsx   # Hệ thống bình luận
│   │   └── ui/                  # Shadcn/Radix UI primitives
│   │
│   ├── hooks/
│   │   ├── use-auth.tsx         # Authentication context & hooks
│   │   └── use-mobile.tsx       # Responsive detection
│   │
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client khởi tạo
│   │   ├── mock-data.ts         # Dữ liệu mẫu cho development
│   │   └── utils.ts             # Utility functions (cn, ...)
│   │
│   ├── routes/
│   │   ├── __root.tsx           # Root layout — fonts, meta, providers
│   │   ├── index.tsx            # 🏠 Trang chủ — Hero + Featured posts
│   │   ├── about.tsx            # 👤 Về tác giả
│   │   ├── auth.tsx             # 🔐 Đăng nhập / Đăng ký
│   │   ├── stream.tsx           # 🌊 Dòng chảy suy tưởng
│   │   ├── profile.tsx          # 📋 Hồ sơ cá nhân
│   │   ├── blog.tsx             # Layout cho blog section
│   │   ├── blog.index.tsx       # 📚 Danh sách bài viết
│   │   ├── blog.$slug.tsx       # 📖 Chi tiết bài viết (dynamic)
│   │   ├── discussions.tsx      # Layout cho discussions
│   │   ├── discussions.index.tsx# 💬 Danh sách thảo luận
│   │   ├── discussions.$id.tsx  # 🗣️ Chi tiết thảo luận
│   │   └── discussions.new.tsx  # ✏️ Tạo thảo luận mới
│   │
│   ├── styles.css               # Global styles & design tokens
│   └── router.tsx               # Router configuration
│
├── .env                         # Environment variables (Supabase)
├── vite.config.ts               # Vite + plugins config
├── package.json
├── tsconfig.json
└── README.md                    # ← Bạn đang ở đây
```

<br />

## 🚀 Bắt đầu

### Yêu cầu

- **Node.js** ≥ 18 (khuyến nghị v20+)
- **npm** ≥ 9
- Tài khoản [Supabase](https://supabase.com/) (miễn phí)

### Cài đặt

```bash
# 1. Clone repository
git clone https://github.com/namvip55/quantum-ripples.git
cd "Quantum Immortality"

# 2. Cài đặt dependencies
npm install

# 3. Tạo file .env
cp .env.example .env
```

Cấu hình Supabase trong file `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Chạy Development Server

```bash
npm run dev
```

Mở trình duyệt tại **http://localhost:8080** 🎉

### Build Production

```bash
npm run build
npm run preview
```

<br />

## 🗺️ Sitemap

```
/                     → Trang chủ (Hero + Bài nổi bật)
/blog                 → Tất cả bài viết
/blog/:slug           → Đọc bài viết chi tiết
/stream               → Dòng chảy suy tưởng
/discussions           → Không gian thảo luận
/discussions/new       → Tạo chủ đề mới
/discussions/:id       → Chi tiết thảo luận
/about                → Về tác giả
/auth                 → Đăng nhập / Đăng ký
/profile              → Hồ sơ cá nhân
```

<br />

## 🧑‍💻 Tác giả

<table>
  <tr>
    <td align="center" width="200">
      <img src="public/favicon.svg" width="80" height="80" alt="Avatar" />
      <br />
      <b>Nguyễn Nam Thành</b>
      <br />
      <sub>Người ghi chép · Việt Nam</sub>
      <br /><br />
      <a href="mailto:nguyennamthanhk6@gmail.com">📧 Email</a>
      ·
      <a href="https://github.com/namvip55">GitHub</a>
    </td>
  </tr>
</table>

> *"Tôi không phải nhà vật lý, cũng không phải thiền sư. Chỉ là một người tình cờ rơi vào ý niệm Bất tử lượng tử và kể từ đó không thể nhìn thế giới như cũ."*

<br />

## 📜 Giấy phép

Dự án này được phát triển với mục đích học thuật và chia sẻ tri thức cá nhân.  
Mã nguồn mở — tự do tham khảo, học hỏi và đóng góp.

<br />

---

<div align="center">
  <br />
  <img src="public/favicon.svg" alt="ripple" width="40" height="40" />
  <br /><br />
  <i>「Trong dòng thời gian vô tận, mỗi chúng ta là một gợn sóng không bao giờ tan biến.」</i>
  <br /><br />
  <sub>Made with 🤍 and a quiet mind</sub>
</div>