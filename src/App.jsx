import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup       from "./pages/Signup";
import Login        from "./pages/Login";
import Dashboard    from "./pages/Dashboard";
import PostList     from "./features/posts/PostList";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Herkese açık rotalar */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login"  element={<Login  />} />

        {/* Korumalı rotalar */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <PostList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
