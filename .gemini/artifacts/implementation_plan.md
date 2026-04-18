# Kế hoạch nâng cấp giao diện Stream & Blog (Hiện đại & Tri thức)

Mục tiêu: Đưa thiết kế của trang Stream và Blog lên một tầm cao mới, kết hợp sự tối giản hiện đại (Modern Minimalism) với nét học thuật, suy tưởng sắc sảo (Editorial/Intellectual). Không gian phải tạo cảm giác như đọc một tạp chí khoa học hoặc một cuốn tùy bút triết lý ấn tượng.

## User Review Required

> [!IMPORTANT]
> - Chúng ta sẽ bổ sung một font chữ Serif (có chân) - có thể là **Playfair Display** hoặc **Lora**, kết hợp với font Inter hiện hữu để tạo cảm giác "tri thức", giống các tạp chí báo chí hoặc sách editorial phương tây. 
> - Nếu bạn muốn ưu tiên một font nào khác (như Merriweather hay EB Garamond), hãy cho tôi biết.

## Proposed Changes

---

### Typography & Global Styles

Thay đổi này sẽ thiết lập nền tảng kiểu chữ cho cả 2 trang.

#### [MODIFY] `src/routes/__root.tsx`
- Bổ sung Google Font có chân (Serif) như `Lora` hoặc `Playfair Display` vào mảng `links`.

#### [MODIFY] `src/styles.css` / `tailwind.css`
- Thêm biến `--font-serif` vào design system.
- Tạo tiện ích `font-serif` dùng ở những chỗ nổi bật như tiêu đề hoặc quote tĩnh lặng.

---

### Vùng Không gian "Stream" (Dòng chảy ý thức)

#### [MODIFY] `src/routes/stream.tsx`
Trang stream hiện tại đang dùng các đường kẻ ngang. Chúng ta sẽ thay đổi nó thành một "dòng chảy" thực sự:
- **Trục dọc tĩnh lặng:** Xóa các vạch ngắt ngang, thay bằng một đường timeline mờ nhạt, đứt nét chạy dọc màn hình, tạo cảm giác một dòng chảy xuyên suốt chưa bao giờ dứt.
- **Micro-animation:** Các text block sẽ không hiện sẵn mà sử dụng hiệu ứng `fade-in-up` khi cuộn chuột đến, tạo cảm giác dòng suy nghĩ nổi lên.
- **Giao diện chữ đổi mới:** 
  - Các khối nhỏ: Giữ Inter sans-serif nhẹ nhàng.
  - Các khối lớn (những câu chốt): Dùng font Serif, làm to lên và in nghiêng như một lời trích dẫn trong sách bìa cứng.

---

### Vùng Tạp chí "Blog" (Hiện đại, Sạch sẽ, Biên tập)

#### [MODIFY] `src/routes/blog.index.tsx` & `src/components/PostCard.tsx`
- **PostListItem (Blog Index):** 
  - Biến nó thành chuẩn giao diện Editorial: Tiêu đề lớn dùng font Serif, màu tối mạnh, kết hợp các dải phân cách (divider lines) rất mỏng và thanh lịch.
  - Các viên thuốc (pill) chứa Category thiết kế lại mềm mại hơn với viền mỏng và màu background pastel tĩnh.
  - Thêm hiệu ứng hover cao cấp: khi trỏ chuột vào bài viết, tiêu đề lùi một chút và một mũi tên điều hướng mềm mại trượt ra.

#### [MODIFY] `src/routes/blog.$slug.tsx`
Đây sẽ là nơi trải nghiệm đọc tri thức nhất:
- **Hero Title:** Tiêu đề ở trên sẽ rất to, dóng trang trọng, kết hợp Meta (ngày, thẻ, tg) gọn gàng bên dưới.
- **Drop Cap (chữ cái đầu thụt lớn):** Đoạn văn đầu tiên (first paragraph) sẽ sử dụng chữ cái đầu tiên cực lớn, đậm, mượn phong cách từ sách giấy (bằng pseudo `.first-letter`).
- **Quotes (`q`, `a`, `quote`):** 
  - `quote` (Trích dẫn): Nâng cấp bọc trong font Serif in nghiêng, viền trái nổi bật kèm background mềm.
  - `q` & `a`: Cải tiến badge Q & A trông sang trọng hơn (vd: logo dạng typography cổ điển), không gian padding hai bên rộng hơn tạo nhịp điệu đọc tốt.

## Open Questions

> [!QUESTION]
> 1. Bạn thấy font "Lora" (nghiêng về học thuật mềm mại) hay "Playfair Display" (rất mạnh, sắc sảo) hợp với vibes blog của bạn hơn?
> 2. Trang Stream có nên làm hiệu ứng các text hiện lệch trái/lệch phải luân phiên (như nhánh sông/timeline tin nhắn) hay tiếp tục giữ chúng căn trái/căn giữa một cách truyền thống?

## Verification Plan

### Manual Verification
- Truy cập vào trang `/stream`, xem các suy ngẫm có fade-in mượt mà lúc scroll không.
- Bấm vào `/blog`, kiểm tra lại PostListItem dạng tạp chí xem hover có ấn tượng và sang trọng không.
- Vào đọc 1 bài viết blog (`/blog/$slug`), xác nhận Drop Cap hiển thị chuẩn và các khối quote trông giống trích đoạn sách giấy.
