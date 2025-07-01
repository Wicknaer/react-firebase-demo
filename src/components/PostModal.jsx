// src/components/PostModal.jsx
export default function PostModal({ post, onClose }) {
  if (!post) return null; // modal kapalı

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
      onClick={onClose}             // arka planı tıklayınca kapat
    >
      <div
        style={{
          background: "#1f2937",
          padding: "24px",
          borderRadius: "8px",
          maxWidth: "640px",
          width: "90%",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()} // içeriye tıklayınca kapanma
      >
        {/* Kapatma butonu */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "8px",
            right: "12px",
            fontSize: "20px",
            lineHeight: 1,
            color: "#fff",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <img
          src={post.image}
          alt={post.title}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "contain",
            marginBottom: "16px",
          }}
        />

        <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>{post.title}</h2>

        <p style={{ marginBottom: "12px", color: "#d1d5db" }}>
          {post.description}
        </p>

        <p style={{ fontSize: "12px", color: "#9ca3af" }}>
          {new Date(post.createdAt).toLocaleString("tr-TR")}
        </p>
      </div>
    </div>
  );
}
