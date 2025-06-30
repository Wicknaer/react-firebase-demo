import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, storage } from "../../lib/firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const postsRef = collection(db, "posts");

/* ---------- THUNKS ---------- */

// Hepsini çek
export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  const q = query(postsRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
});

// Yeni post
export const addPost = createAsyncThunk(
  "posts/add",
  async ({ title, file }, { rejectWithValue }) => {
    try {
      // 🔄 dosya adı üret (UUID desteklenmezse Date.now)
      const name =
        (crypto?.randomUUID?.() ?? Date.now()) + "-" + file.name;

      // 1) Storage'a yükle
      const fileRef = ref(storage, `posts/${name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      // 2) Firestore'a yaz
      const docRef = await addDoc(postsRef, {
        title,
        image: url,
        createdAt: serverTimestamp(),
      });

      return { id: docRef.id, title, image: url };
    } catch (e) {
      console.error("addPost error:", e.code);
      return rejectWithValue(e.code);
    }
  }
);

// Sil
export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      return id;
    } catch (e) {
      return rejectWithValue(e.code);
    }
  }
);

/* ---------- SLICE ---------- */

const postsSlice = createSlice({
  name: "posts",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (s, a) => {
        s.list = a.payload;
        s.status = "succeeded";
      })
      .addCase(addPost.fulfilled, (s, a) => {
        s.list.unshift(a.payload);
        s.status = "succeeded";
      })
      .addCase(deletePost.fulfilled, (s, a) => {
        s.list = s.list.filter((p) => p.id !== a.payload);
      })
      .addMatcher(
        (a) => a.type.endsWith("/pending"),
        (s) => {
          s.status = "loading";
          s.error = null;
        }
      )
      .addMatcher(
        (a) => a.type.endsWith("/rejected"),
        (s, a) => {
          s.status = "failed";
          s.error = a.payload;
        }
      );
  },
});

export default postsSlice.reducer;
