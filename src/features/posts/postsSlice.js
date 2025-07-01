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

// Tüm postları çek
export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  const q = query(postsRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);

  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      title: data.title,
      description: data.description,
      image: data.image,
      createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
    };
  });
});

// Yeni post ekle
export const addPost = createAsyncThunk(
  "posts/add",
  async ({ title, description, file }, { rejectWithValue }) => {
    try {
      // Benzersiz dosya adı
      const name =
        (crypto?.randomUUID?.() ?? Date.now()) + "-" + file.name;

      // 1) Görseli Storage'a yükle
      const fileRef = ref(storage, `posts/${name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      // 2) Firestore'a doküman ekle
      const docRef = await addDoc(postsRef, {
        title,
        description,
        image: url,
        createdAt: serverTimestamp(),
      });

      return {
        id: docRef.id,
        title,
        description,
        image: url,
        createdAt: Date.now(), // anında listeye yansıtmak için
      };
    } catch (e) {
      console.error("addPost error:", e.code);
      return rejectWithValue(e.code);
    }
  }
);

// Post sil
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
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
        state.status = "succeeded";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export default postsSlice.reducer;
