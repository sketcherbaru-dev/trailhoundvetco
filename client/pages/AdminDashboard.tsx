import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("admin_token") === "authenticated") {
      navigate("/admin/articles", { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password === "admin123") {
      localStorage.setItem("admin_token", "authenticated");
      navigate("/admin/articles");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <img src="/trailhound-logo-full.png" alt="Trailhound Veterinary Collective" className="h-24 w-auto mx-auto mb-3" />
        <p className="text-gray-500 text-sm mb-8 text-center">Admin Panel — Sign in to continue</p>

        <form onSubmit={handleLogin} noValidate>
          <div className="mb-5">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Admin Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="Enter admin password"
              className={`w-full px-4 py-3 border rounded-lg outline-none transition-colors ${
                error
                  ? "border-red-400 focus:ring-2 focus:ring-red-300"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }`}
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
