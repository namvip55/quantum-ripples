import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { SiteLayout } from "@/components/SiteLayout";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, profile, refreshProfile, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate({ to: "/auth" });
    }
    if (profile) {
      setFullName(profile.full_name || "");
      setUsername(profile.username || "");
      setAvatarUrl(profile.avatar_url || "");
    }
  }, [user, profile, navigate]);

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          username: username,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user?.id);

      if (error) throw error;
      setMessage("Cập nhật thành công!");
      await refreshProfile();
    } catch (err: any) {
      setMessage("Lỗi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setMessage(null);

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("Bạn chưa chọn ảnh nào.");
      }

      const file = e.target.files[0];
      if (!file.type.includes('jpeg') && !file.type.includes('png') && !file.type.includes('jpg')) {
        throw new Error("Chỉ hỗ trợ định dạng JPG và PNG.");
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      setAvatarUrl(data.publicUrl);
      setMessage("Tải ảnh lên thành công! Hãy bấm Lưu thay đổi để hoàn tất.");
    } catch (error: any) {
      setMessage("Lỗi tải ảnh: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  if (!user) return null;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-6 py-24 md:py-32">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-center">
          Trang cá nhân
        </h1>

        <form onSubmit={updateProfile} className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
          {message && (
            <div className="rounded-md bg-accent/10 p-3 text-sm text-accent font-medium">
              {message}
            </div>
          )}

          <div className="flex flex-col items-center justify-center mb-4 gap-4">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover border border-border" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-2xl">
                {username ? username[0].toUpperCase() : "U"}
              </div>
            )}
            
            <div className="relative">
              <input
                type="file"
                id="avatar-upload"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleAvatarUpload}
                disabled={uploading}
              />
              <button
                type="button"
                className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                {uploading ? "Đang tải lên..." : "Tải ảnh từ máy tính"}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-[-8px]">Chấp nhận JPG, PNG.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              type="text"
              disabled
              value={user.email}
              className="rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm text-muted-foreground outline-none cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-medium text-foreground">Username</label>
            <input
              id="username"
              type="text"
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="nhap-username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="fullname" className="text-sm font-medium text-foreground">Họ và Tên</label>
            <input
              id="fullname"
              type="text"
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="avatar" className="text-sm font-medium text-foreground">Hoặc nhập link ảnh có sẵn (URL)</label>
            <input
              id="avatar"
              type="text"
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <button
              type="button"
              onClick={signOut}
              className="rounded-lg bg-destructive/10 text-destructive px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-destructive/20"
            >
              Đăng xuất
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50"
            >
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </SiteLayout>
  );
}
