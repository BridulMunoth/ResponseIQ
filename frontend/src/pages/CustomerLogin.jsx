import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, AlertCircle, Loader } from "lucide-react";
import { loginCustomer, registerCustomer } from "../services/api";

const CustomerLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (!isLogin && !fullName)) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      let res;
      if (isLogin) {
        res = await loginCustomer({ email, password });
      } else {
        res = await registerCustomer({ fullName, email, password });
      }
      // Save customer token and user info
      localStorage.setItem("customerToken", res.data.token);
      localStorage.setItem("customerName", res.data.fullName);
      navigate("/customer-dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (isLogin
            ? "Login failed. Please check your credentials."
            : "Registration failed. Please try again."),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page customer-login-page">
      <div className="customer-auth-card">
        {/* User Logo */}
        <div className="auth-logo-section">
          <img
            src="/userLogo.png"
            alt="User Logo"
            className="auth-user-logo"
            draggable="false"
          />
        </div>

        <div className="auth-header">
          <h1 className="unselectable">{isLogin ? "Sign in" : "Sign up"}</h1>
          <p className="unselectable">
            {isLogin
              ? "Please login to continue"
              : "Please register to continue"}
          </p>
        </div>

        {error && (
          <div className="form-error">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="auth-input-group">
              <div className="auth-input-icon">
                <User size={18} />
              </div>
              <input
                type="text"
                className="auth-input"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
              />
            </div>
          )}

          <div className="auth-input-group">
            <div className="auth-input-icon">
              <Mail size={18} />
            </div>
            <input
              type="email"
              className="auth-input"
              placeholder="Email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="auth-input-group">
            <div className="auth-input-icon">
              <Lock size={18} />
            </div>
            <input
              type="password"
              className="auth-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </div>

          {isLogin && (
            <div className="auth-options">
              <button type="button" className="auth-forgot-link">
                Forget password?
              </button>
            </div>
          )}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? (
              <>
                <Loader
                  size={16}
                  style={{
                    animation: "spin 0.8s linear infinite",
                    marginRight: "8px",
                  }}
                />
                Processing...
              </>
            ) : isLogin ? (
              "Sign in"
            ) : (
              "Sign up"
            )}
          </button>

          <div className="auth-footer">
            <span className="unselectable">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
            </span>
            <button
              type="button"
              className="auth-toggle-link"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
            >
              Click here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerLogin;
