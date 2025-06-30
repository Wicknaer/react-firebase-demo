// src/features/auth/AuthForm.jsx
import { useState } from "react";

export default function AuthForm({ label, onSubmit }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit({ email, password }); }}
      className="flex flex-col gap-3 max-w-xs mx-auto"
    >
      <input
        className="border p-2 rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="border p-2 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="bg-blue-600 text-white p-2 rounded">{label}</button>
    </form>
  );
}
