import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.includes("@")) return "Enter a valid email";
    if (form.password.length < 6)
      return "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) return "Passwords do not match";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,

          email: form.email,
          password: form.password,
        }),
      });
      if (!response.ok) throw new Error("Registration failed");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      {error && <p>{error}</p>}
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
    </div>
  );
};

export default Register;
