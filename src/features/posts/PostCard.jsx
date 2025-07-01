// src/features/posts/PostCard.jsx
export default function PostCard({ post, onDelete, onOpen }) {
  /* Tarihi 30 Haz 2025 formatına çevir */
  const formatted = new Date(post.createdAt).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  /* Açıklamanın ilk 80 karakteri (özet) */
  const snippet =
    post.description?.length > 80
      ? post.description.slice(0, 80) + "…"
      : post.description ?? "";

  return (
    <div
      onClick={() => onOpen && onOpen(post)}
      style={{
        width: "320px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "12px",
        margin: "0 auto",
        cursor: "pointer",
      }}
    >
      {/* Tarih etiketi */}
      <span style={{ fontSize: "12px", color: "#9ca3af" }}>{formatted}</span>

      {/* Görsel */}
      <img
        src={post.image}
        alt={post.title}
        style={{
          width: "100%",
          maxHeight: "200px",
          objectFit: "contain",
          background: "rgba(0,0,0,0.15)",
          borderRadius: "6px",
          display: "block",
          margin: "8px 0",
        }}
      />

      {/* Başlık */}
      <h3 style={{ textAlign: "center", marginBottom: "6px" }}>
        {post.title}
      </h3>

      {/* Açıklama özeti */}
      <p
        style={{
          fontSize: "14px",
          color: "#d1d5db",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        {snippet}
      </p>

      {/* Sil butonu */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // kartı açma, sadece sil
          onDelete(post.id);
        }}
        style={{
          background: "#dc2626",
          color: "#fff",
          padding: "6px 16px",
          borderRadius: "6px",
          display: "block",
          margin: "0 auto",
          border: "none",
          cursor: "pointer",
        }}
      >
        Sil
      </button>
    </div>
  );
}
