import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { path: "/admin/hero", label: "Hero Images", icon: "🖼️" },
  { path: "/admin/articles", label: "Articles", icon: "📝" },
  { path: "/admin/products", label: "Products", icon: "🛍️" },
  { path: "/admin/courses", label: "Courses", icon: "🎓" },
  { path: "/admin/podcasts", label: "Podcasts", icon: "🎙️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token !== "authenticated") {
      navigate("/admin", { replace: true });
    } else {
      setChecked(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin");
  };

  if (!checked) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-slate-900 text-white flex flex-col flex-shrink-0">
        <div className="px-6 py-5 border-b border-slate-700">
          <Link to="/" className="text-lg font-bold text-white hover:text-orange-400 transition-colors">
            Trailhound Vet
          </Link>
          <p className="text-xs text-slate-400 mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 py-4 px-3">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                  active
                    ? "bg-orange-500 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-red-600 rounded-lg transition-colors text-left"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800 capitalize">
            {navItems.find((i) => i.path === location.pathname)?.label ?? "Admin"}
          </h1>
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            ← Back to site
          </Link>
        </header>
        <main className="flex-1 px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
