import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { logIn } from "../features/auth/authSlice";
import AuthForm from "../features/auth/AuthForm";

export default function Login() {
  const dispatch = useDispatch();
  const { user, error, status } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  /* ✅ Kullanıcı oturum açtığında anasayfaya git */
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <>
      <h1 className="text-2xl text-center my-4">Log in</h1>

      <AuthForm label="Log in" onSubmit={(d) => dispatch(logIn(d))} />

      {status === "loading" && <p>Loading…</p>}
      {error && (
        <pre className="bg-red-50 text-red-600 p-2 mt-2 rounded">{error}</pre>
      )}

      <p className="text-center mt-4">
        No account?{" "}
        <Link className="text-blue-600" to="/signup">
          Sign up
        </Link>
      </p>
    </>
  );
}
