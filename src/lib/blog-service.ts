/**
 * CRUD service cho bảng user_blogs trên Supabase.
 */
import { supabase } from "./supabase";

// ─── Types ───────────────────────────────────────────────────
export interface UserBlog {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  cover_image_url: string | null;
  status: "draft" | "published";
  reading_time: string | null;
}

export interface UserBlogWithAuthor extends UserBlog {
  profiles: {
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
  } | null;
}

export interface CreateBlogInput {
  user_id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category?: string;
  cover_image_url?: string;
  status?: "draft" | "published";
  reading_time?: string;
}

export interface UpdateBlogInput {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  cover_image_url?: string;
  status?: "draft" | "published";
  reading_time?: string;
  updated_at?: string;
}

// ─── Queries ─────────────────────────────────────────────────

/** Lấy tất cả bài viết đã published (cho trang /blog) */
export async function getPublishedBlogs() {
  const { data, error } = await supabase
    .from("user_blogs")
    .select(
      `
      *,
      profiles (username, full_name, avatar_url)
    `
    )
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as UserBlogWithAuthor[]) ?? [];
}

/** Lấy một bài viết theo slug (cho trang /blog/:slug) */
export async function getBlogBySlug(slug: string) {
  const { data, error } = await supabase
    .from("user_blogs")
    .select(
      `
      *,
      profiles (username, full_name, avatar_url)
    `
    )
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as UserBlogWithAuthor;
}

/** Lấy tất cả bài viết của một user (cho trang /my-blog) */
export async function getMyBlogs(userId: string) {
  const { data, error } = await supabase
    .from("user_blogs")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data as UserBlog[]) ?? [];
}

/** Lấy một bài theo ID (cho trang /my-blog/edit/:id) */
export async function getBlogById(id: string) {
  const { data, error } = await supabase
    .from("user_blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as UserBlog;
}

// ─── Mutations ───────────────────────────────────────────────

/** Tạo bài viết mới */
export async function createBlog(input: CreateBlogInput) {
  const { data, error } = await supabase
    .from("user_blogs")
    .insert([input])
    .select()
    .single();

  if (error) throw error;
  return data as UserBlog;
}

/** Cập nhật bài viết */
export async function updateBlog(id: string, input: UpdateBlogInput) {
  const { data, error } = await supabase
    .from("user_blogs")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as UserBlog;
}

/** Xóa bài viết */
export async function deleteBlog(id: string) {
  const { error } = await supabase.from("user_blogs").delete().eq("id", id);
  if (error) throw error;
}

// ─── Storage ─────────────────────────────────────────────────

/** Upload ảnh bìa lên Supabase Storage */
export async function uploadCoverImage(file: File, userId: string) {
  const ext = file.name.split(".").pop();
  const fileName = `${userId}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("blog-images")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("blog-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
