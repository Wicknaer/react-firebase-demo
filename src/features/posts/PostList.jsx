import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts, addPost, deletePost } from "./postsSlice";
import PostForm  from "./PostForm";
import PostCard  from "./PostCard";

export default function PostList() {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.posts);

  /* Sayfa açıldığında verileri getir */
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Posts</h1>

      {/* Yeni post formu */}
      <PostForm onSubmit={(data) => dispatch(addPost(data))} />

      {status === "loading" && <p>Yükleniyor…</p>}
      {status === "failed"  && <p className="text-red-500">Hata!</p>}

      {/* Post kartları */}
      <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2">
        {list.map((p) => (
          <PostCard
            key={p.id}
            post={p}
            onDelete={(id) => dispatch(deletePost(id))}
          />
        ))}
      </div>
    </div>
  );
}
