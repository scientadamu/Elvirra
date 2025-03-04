import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const slides = [
  "/images/slide1.png",
  "/images/slide2.webp",
  "/images/slide3.jpg",
];

const Login = () => {
  const [isReset, setIsReset] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Login validation
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (email === "Admin@gmail.com" && password === "Admin1234") {
      console.log("Login successful!");
      navigate("/dashboard"); // Redirect to Dashboard
    } else {
      setErrorMessage("Invalid email or password. Try again.");
    }
  };

  // Reset password
  const handleResetSubmit = (e) => {
    e.preventDefault();
    console.log("Resetting password for:", email);
  };

  return (
    <div className="login-container">
      <div className="background-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`background-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide})` }}
          ></div>
        ))}
      </div>

      <div className="form-container">
        {!isReset ? (
          <div>
            <h2>Welcome to Elvira Financial Tracker</h2>
            <h2>Login to EFT</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleLoginSubmit}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Login</button>
              <p>
                <a href="#" onClick={() => setIsReset(true)}>
                  Forgot Password?
                </a>
              </p>
            </form>
          </div>
        ) : (
          <div>
            <h2>Reset Password</h2>
            <p>Enter your email to receive reset instructions.</p>
            <form onSubmit={handleResetSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Reset Password</button>
            </form>
            <p>
              <a href="#" onClick={() => setIsReset(false)}>
                Back to Login
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
