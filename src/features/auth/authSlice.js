// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

/* ----------  Async Thunk'lar  ---------- */

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      return { uid: user.uid, email: user.email };
    } catch (err) {
      return rejectWithValue(err.code);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/logIn",
  async ({ email, password }, { rejectWithValue }) => {
    console.log("➡️  logIn thunk tetiklendi:", email);

    try {
      /* Firebase isteği */
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Giriş başarılı:", user.uid);

      /* Redux’a dönecek veri */
      return { uid: user.uid, email: user.email };
    } catch (err) {
      /* Google hata kodunu göster */
      console.error("❌ Giriş hatası:", err.code);
      return rejectWithValue(err.code);
    }
  }
);

export const logOut = createAsyncThunk("auth/logOut", async () => {
  await signOut(auth);
});

export const listenForAuth = createAsyncThunk(
  "auth/listen",
  (_, { dispatch }) =>
    new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) dispatch(setUser({ uid: user.uid, email: user.email }));
        resolve();
      });
    })
);

/* ----------  Slice  ---------- */

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, status: "idle", error: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
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

/* ----------  Exports  ---------- */

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
