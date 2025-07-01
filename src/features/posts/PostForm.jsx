import { useState } from "react";

export default function PostForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!file) return;
        onSubmit({ title, description, file });
        setTitle("");
        setDescription("");
        setFile(null);
      }}
      style={{
        maxWidth: "320px", // Kart genişliğiyle aynı
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <input
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ padding: "8px", borderRadius: "6px", flex: "1 1 0" }}
      />

      <textarea
        placeholder="Açıklama (kısa özet)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        rows={4} /* 4 satır yüksek */
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #4b5563",
          width: "100%" /* başlıkla hizalı */,
          boxSizing: "border-box" /* kenar eklemeleri hesaba kat */,
          resize: "vertical" /* kullanıcı isterse uzatabilsin */,
        }}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        required
        style={{ flex: "1 1 0" }}
      />

      <button
        style={{
          background: "#2563eb",
          color: "#fff",
          padding: "8px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Paylaş
      </button>
    </form>
  );
}
