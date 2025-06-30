import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { signUp } from "../features/auth/authSlice";
import AuthForm from "../features/auth/AuthForm";

export default function Signup() {
  const dispatch = useDispatch();
  const { user, error, status } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  /* ✅ Hesap oluşturulduysa anasayfaya git */
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <>
      <h1 className="text-2xl text-center my-4">Sign up</h1>

      <AuthForm label="Create account" onSubmit={(d) => dispatch(signUp(d))} />

      {status === "loading" && <p>Loading…</p>}
      {error && (
        <pre className="bg-red-50 text-red-600 p-2 mt-2 rounded">{error}</pre>
      )}

      <p className="text-center mt-4">
        Have an account?{" "}
        <Link className="text-blue-600" to="/login">
          Log in
        </Link>
      </p>
    </>
  );
}
