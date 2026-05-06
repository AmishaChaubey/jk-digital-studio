import { useState } from "react";
import API from "../api/axios";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login Success");
      window.location.href = "/admin";
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Mono:wght@300;400&display=swap');

       

        :root {
          --red: #dc2626;
          --red-dark: #b91c1c;
          --red-light: #fee2e2;
          --white: #ffffff;
          --gray-50: #f9fafb;
          --gray-100: #f3f4f6;
          --gray-200: #e5e7eb;
          --gray-400: #9ca3af;
          --gray-600: #4b5563;
          --gray-900: #111827;
        }

        .login-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Mono', monospace;
          background: var(--white);
          overflow: hidden;
        }

        /* ── LEFT PANEL ── */
        .login-left {
          width: 48%;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .left-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

     /* black gradient overlay */
.left-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(0,0,0,0.45) 0%,
    rgba(17,24,39,0.72) 100%
  );
}

      

        .left-content {
          position: relative;
          z-index: 3;
          padding: 48px 44px;
        }

        .left-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(220,38,38,0.85);
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(8px);
          padding: 6px 14px;
          border-radius: 2px;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 22px;
        }
        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fca5a5;
          animation: pulse 1.8s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.75); }
        }

        .left-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 3.5vw, 52px);
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 16px;
        }
        .left-title em {
          font-style: italic;
          color: #fca5a5;
        }

        .left-rule {
          width: 40px;
          height: 3px;
          background: var(--red);
          margin-bottom: 16px;
          border-radius: 2px;
        }

        .left-desc {
          font-size: 11px;
          color: rgba(255,255,255,0.55);
          line-height: 1.9;
          letter-spacing: 0.04em;
          max-width: 300px;
        }

        /* corner bracket top-right */
        .corner-bracket {
          position: absolute;
          top: 36px;
          right: 36px;
          width: 60px;
          height: 60px;
          border-top: 2px solid rgba(220,38,38,0.6);
          border-right: 2px solid rgba(220,38,38,0.6);
          z-index: 3;
        }

        /* ── RIGHT PANEL ── */
        .login-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 56px 48px;
          background: var(--white);
          position: relative;
        }

        /* faint red circle accent */
        .login-right::before {
          content: '';
          position: absolute;
          bottom: -100px;
          right: -100px;
          width: 340px;
          height: 340px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .login-card {
          width: 100%;
          max-width: 390px;
        }

        /* header */
        .card-eyebrow {
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .card-eyebrow::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 1px;
          background: var(--red);
        }

        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: 6px;
        }
        .card-subtitle {
          font-size: 11px;
          color: var(--gray-400);
          letter-spacing: 0.05em;
          margin-bottom: 40px;
        }

        /* field */
        .field {
          margin-bottom: 24px;
        }
        .field-label {
          display: block;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--gray-600);
          margin-bottom: 8px;
        }
        .field-input-wrap {
          position: relative;
        }
        .field-input {
          width: 100%;
          background: var(--gray-50);
          border: 1.5px solid var(--gray-200);
          color: var(--gray-900);
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          padding: 13px 16px;
          outline: none;
          border-radius: 2px;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          letter-spacing: 0.02em;
        }
        .field-input::placeholder { color: var(--gray-400); }
        .field-input:focus {
          border-color: var(--red);
          background: var(--white);
          box-shadow: 0 0 0 3px rgba(220,38,38,0.08);
        }
        .toggle-pw {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: var(--gray-400);
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: color 0.2s;
          padding: 0;
        }
        .toggle-pw:hover { color: var(--red); }

        /* forgot */
        .forgot-row {
          display: flex;
          justify-content: flex-end;
          margin-top: -14px;
          margin-bottom: 28px;
        }
        .forgot-link {
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--red);
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .forgot-link:hover { opacity: 0.7; }

        /* button */
        .login-btn {
          width: 100%;
          padding: 15px;
          background: var(--red);
          border: none;
          color: var(--white);
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 4px 14px rgba(220,38,38,0.3);
        }
        .login-btn:hover:not(:disabled) {
          background: var(--red-dark);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(220,38,38,0.38);
        }
        .login-btn:active:not(:disabled) { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.55; cursor: not-allowed; box-shadow: none; }

        .btn-spinner {
          width: 12px;
          height: 12px;
          border: 1.5px solid rgba(255,255,255,0.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* footer */
        .card-footer {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--gray-100);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-note {
          font-size: 9px;
          letter-spacing: 0.12em;
          color: var(--gray-400);
        }
        .footer-secure {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 9px;
          letter-spacing: 0.12em;
          color: var(--gray-400);
        }
        .secure-icon {
          width: 10px;
          height: 10px;
          border: 1px solid var(--gray-400);
          border-radius: 1px;
          position: relative;
          display: inline-block;
          margin-bottom: 1px;
        }

        @media (max-width: 720px) {
          .login-left { display: none; }
          .login-right { padding: 40px 24px; }
        }
      `}</style>

      <div className="login-root">

        {/* ── LEFT ── */}
        <div className="login-left">
          <img
            className="left-image"
            src="https://images.pexels.com/photos/34897617/pexels-photo-34897617.jpeg"
            alt="Admin workspace"
          />
          <div className="left-overlay" />
          <div className="left-grid" />
          <div className="corner-bracket" />
          <div className="left-content">
            <div className="left-badge">
              <span className="badge-dot" />
              Secure Portal
            </div>
            <h1 className="left-title">
              Admin<br /><em>Dashboard</em>
            </h1>
            <div className="left-rule" />
            <p className="left-desc">
              Restricted access only. All sessions are encrypted, monitored, and logged for security compliance.
            </p>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="login-right">
          <div className="login-card">

            <div className="card-eyebrow">Authentication</div>
            <h2 className="card-title">Welcome back</h2>
            <p className="card-subtitle">Sign in to your admin account</p>

            <div className="field">
              <label className="field-label">Email Address</label>
              <div className="field-input-wrap">
                <input
                  className="field-input"
                  type="email"
                  placeholder="admin@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="field">
              <label className="field-label">Password</label>
              <div className="field-input-wrap">
                <input
                  className="field-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={form.password}
                  style={{ paddingRight: "56px" }}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && !loading && handleLogin()}
                />
                <button
                  className="toggle-pw"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="forgot-row">
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button
              className="login-btn"
              onClick={handleLogin}
              disabled={loading || !form.email || !form.password}
            >
              {loading && <span className="btn-spinner" />}
              {loading ? "Verifying..." : "Access Dashboard"}
            </button>

            <div className="card-footer">
              <span className="footer-note">© 2026 Admin Panel</span>
              <span className="footer-secure">
                <span className="secure-icon" />
                SSL Secured
              </span>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}