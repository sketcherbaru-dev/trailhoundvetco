import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { path: "/admin/hero", label: "Hero Images", icon: "🖼️" },
  { path: "/admin/articles", label: "Articles", icon: "📝" },
  { path: "/admin/products", label: "Products", icon: "🛍️" },
  { path: "/admin/courses", label: "Courses", icon: "🎓" },
  { path: "/admin/the-pack", label: "The Pack", icon: "🐾" },
  { path: "/admin/podcasts", label: "Podcasts", icon: "🎙️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [checked, setChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token !== "authenticated") {
      navigate("/admin", { replace: true });
    } else {
      setChecked(true);
    }
  }, [navigate]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin");
  };

  if (!checked) return null;

  const currentLabel = navItems.find((i) => i.path === location.pathname)?.label ?? "Admin";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 md:w-56 bg-slate-900 text-white flex flex-col flex-shrink-0
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="px-6 py-5 border-b border-slate-700 flex items-center justify-between">
          <div>
            <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
              <img src="/trailhound-logo-full.png" alt="Trailhound Veterinary Collective" className="h-14 w-auto" />
            </Link>
            <p className="text-xs text-slate-400 mt-1">Admin Panel</p>
          </div>
          {/* Close button on mobile */}
          <button
            className="md:hidden p-1 text-slate-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 md:py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                  active
                    ? "bg-orange-500 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-red-600 rounded-lg transition-colors text-left"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Hamburger button on mobile */}
            <button
              className="md:hidden p-2 -ml-1 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
            <h1 className="text-lg md:text-xl font-bold text-gray-800">
              {currentLabel}
            </h1>
          </div>
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors whitespace-nowrap"
          >
            ← Back to site
          </Link>
        </header>
        <main className="flex-1 px-4 md:px-8 py-6 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
