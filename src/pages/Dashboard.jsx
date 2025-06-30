import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../features/auth/authSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux store’dan kullanıcı bilgisi
  const user = useSelector((state) => state.auth.user);

  // Çıkış işlemi
  const handleLogout = async () => {
    await dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">
        Welcome, {user?.email}! <span className="inline-block">🎉</span>
      </h1>

      {/* Post sayfasına git */}
      <Link
        to="/posts"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded mr-4"
      >
        Go to Posts
      </Link>

      {/* Çıkış butonu */}
      <button
        onClick={handleLogout}
        className="bg-gray-800 text-white px-4 py-2 rounded"
      >
        Log out
      </button>
    </div>
  );
}
