// src/features/posts/PostCard.jsx
export default function PostCard({ post, onDelete }) {
  return (
    <div
      style={{
        width: "320px",          // Kart genişliği sabit
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "12px",
        margin: "0 auto",
      }}
    >
      {/* Görsel – 300 px genişlik, orantılı yükseklik */}
      <img
        src={post.image}
        alt={post.title}
        style={{
          width: "100%",         // 320 px’e gerilir
          maxHeight: "200px",    // 200 px’den uzun olamaz
          objectFit: "contain",  // Tamamı görünür, boşluk bırakır
          background: "rgba(0,0,0,0.15)",
          borderRadius: "6px",
          display: "block",
          marginBottom: "8px",
        }}
      />

      {/* Başlık */}
      <h3 style={{ textAlign: "center", marginBottom: "8px" }}>
        {post.title}
      </h3>

      {/* Sil butonu */}
      <button
        onClick={() => onDelete(post.id)}
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
