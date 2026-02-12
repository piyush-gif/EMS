import { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={form.username} onChange={handleChange} />
      <input name="password" value={form.password} onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
