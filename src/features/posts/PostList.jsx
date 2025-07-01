import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost, deletePost } from "./postsSlice";
import PostForm from "./PostForm";
import PostCard from "./PostCard";
import PostModal from "../../components/PostModal";

export default function PostList() {
  const dispatch = useDispatch();
  const { list, status } = useSelector((s) => s.posts);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div
      style={{
        maxWidth: "1000px",          // Sayfa ortalama genişliği
        margin: "0 auto",            // Ortalar
        padding: "24px 16px",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "24px" }}>Posts</h1>

      {/* Form */}
      <PostForm onSubmit={(d) => dispatch(addPost(d))} />

      {/* Modal */}
      <PostModal post={selected} onClose={() => setSelected(null)} />

      {status === "loading" && <p>Yükleniyor…</p>}
      {status === "failed" && <p style={{ color: "red" }}>Hata!</p>}

      {/* Kart gridi */}
      <div
        style={{
          marginTop: "32px",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",   // ortala
        }}
      >
        {list.map((p) => (
          <PostCard
            key={p.id}
            post={p}
            onDelete={(id) => dispatch(deletePost(id))}
            onOpen={(p) => setSelected(p)}
          />
        ))}
      </div>
    </div>
  );
}
