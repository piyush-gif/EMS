import { useState } from "react";
const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        name="email"
        value={form.email}
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={form.password}
        placeholder="Password"
        onChange={handleChange}
      />
      <input
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        placeholder="Confirm Password"
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
