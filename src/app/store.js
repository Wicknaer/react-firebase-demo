import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import authReducer from "../features/auth/authSlice";   // bu satır authSlice'ı ekler

export const store = configureStore({
  reducer: {
    auth: authReducer,  // burada auth reducer'ı tanıtıyoruz
    posts: postsReducer,
  },
});



