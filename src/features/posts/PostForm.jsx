import { useState } from "react";

export default function PostForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!file) return;
        onSubmit({ title, file });
        setTitle("");
        setFile(null);
      }}
      className="flex flex-col sm:flex-row gap-2 max-w-xl"
    >
      <input
        className="border p-2 rounded flex-1"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Paylaş
      </button>
    </form>
  );
}
