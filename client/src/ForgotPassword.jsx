import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email.trim()) return "Email is required";
    return null;
  };

  const handleSubmit = async () => {
    setError("");
    setMessage("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Request failed");
      setMessage(data.message || "Check your email for instructions.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Forgot Password</h2>
        {error && <p className="error">{error}</p>}
        {message && <p className="status">{message}</p>}
        <input
          value={email}
          placeholder="Your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button disabled={loading} onClick={handleSubmit}>
          {loading ? "Please wait..." : "Submit"}
        </button>
        <p>
          <a href="/login">Back to login</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
