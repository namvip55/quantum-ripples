/**
 * Utility để tạo slug từ tiêu đề tiếng Việt.
 * VD: "Bất tử lượng tử" → "bat-tu-luong-tu"
 */

const VIETNAMESE_MAP: Record<string, string> = {
  à: "a", á: "a", ả: "a", ã: "a", ạ: "a",
  ă: "a", ằ: "a", ắ: "a", ẳ: "a", ẵ: "a", ặ: "a",
  â: "a", ầ: "a", ấ: "a", ẩ: "a", ẫ: "a", ậ: "a",
  è: "e", é: "e", ẻ: "e", ẽ: "e", ẹ: "e",
  ê: "e", ề: "e", ế: "e", ể: "e", ễ: "e", ệ: "e",
  ì: "i", í: "i", ỉ: "i", ĩ: "i", ị: "i",
  ò: "o", ó: "o", ỏ: "o", õ: "o", ọ: "o",
  ô: "o", ồ: "o", ố: "o", ổ: "o", ỗ: "o", ộ: "o",
  ơ: "o", ờ: "o", ớ: "o", ở: "o", ỡ: "o", ợ: "o",
  ù: "u", ú: "u", ủ: "u", ũ: "u", ụ: "u",
  ư: "u", ừ: "u", ứ: "u", ử: "u", ữ: "u", ự: "u",
  ỳ: "y", ý: "y", ỷ: "y", ỹ: "y", ỵ: "y",
  đ: "d",
  // Uppercase
  À: "a", Á: "a", Ả: "a", Ã: "a", Ạ: "a",
  Ă: "a", Ằ: "a", Ắ: "a", Ẳ: "a", Ẵ: "a", Ặ: "a",
  Â: "a", Ầ: "a", Ấ: "a", Ẩ: "a", Ẫ: "a", Ậ: "a",
  È: "e", É: "e", Ẻ: "e", Ẽ: "e", Ẹ: "e",
  Ê: "e", Ề: "e", Ế: "e", Ể: "e", Ễ: "e", Ệ: "e",
  Ì: "i", Í: "i", Ỉ: "i", Ĩ: "i", Ị: "i",
  Ò: "o", Ó: "o", Ỏ: "o", Õ: "o", Ọ: "o",
  Ô: "o", Ồ: "o", Ố: "o", Ổ: "o", Ỗ: "o", Ộ: "o",
  Ơ: "o", Ờ: "o", Ớ: "o", Ở: "o", Ỡ: "o", Ợ: "o",
  Ù: "u", Ú: "u", Ủ: "u", Ũ: "u", Ụ: "u",
  Ư: "u", Ừ: "u", Ứ: "u", Ử: "u", Ữ: "u", Ự: "u",
  Ỳ: "y", Ý: "y", Ỷ: "y", Ỹ: "y", Ỵ: "y",
  Đ: "d",
};

/**
 * Chuyển chuỗi tiếng Việt thành slug URL-friendly.
 * @example vietnameseSlug("Bất tử lượng tử đã thay đổi") → "bat-tu-luong-tu-da-thay-doi"
 */
export function vietnameseSlug(text: string): string {
  let result = "";
  for (const char of text) {
    result += VIETNAMESE_MAP[char] ?? char;
  }

  return result
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Xóa ký tự đặc biệt
    .replace(/\s+/g, "-")         // Thay khoảng trắng bằng dấu -
    .replace(/-+/g, "-")          // Gom nhiều dấu - liên tiếp
    .replace(/^-|-$/g, "");       // Xóa dấu - ở đầu/cuối
}

/**
 * Tính thời gian đọc bài viết.
 * Trung bình 200 từ/phút cho tiếng Việt.
 */
export function estimateReadingTime(content: string): string {
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} phút`;
}
