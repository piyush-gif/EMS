import { useState } from "react";
const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <form>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
