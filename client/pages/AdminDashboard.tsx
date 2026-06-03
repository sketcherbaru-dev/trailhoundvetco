import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminArticles from "@/components/admin/AdminArticles";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminCourses from "@/components/admin/AdminCourses";
import AdminPodcasts from "@/components/admin/AdminPodcasts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(true);

  useEffect(() => {
    // Check if admin session exists
    const adminToken = localStorage.getItem("admin_token");
    if (adminToken === "authenticated") {
      setIsAuthenticated(true);
      setShowLoginForm(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - in production use proper auth
    if (password === "admin123") {
      localStorage.setItem("admin_token", "authenticated");
      setIsAuthenticated(true);
      setShowLoginForm(false);
      setPassword("");
    } else {
      alert("Password salah");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setShowLoginForm(true);
    setPassword("");
    navigate("/");
  };

  if (showLoginForm && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trailhound Vet</h1>
          <p className="text-gray-600 mb-8">Admin Dashboard Login</p>
          
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password Admin
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password admin"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white border-b">
            <TabsTrigger value="articles" className="text-lg">
              Articles
            </TabsTrigger>
            <TabsTrigger value="products" className="text-lg">
              Products
            </TabsTrigger>
            <TabsTrigger value="courses" className="text-lg">
              Courses
            </TabsTrigger>
            <TabsTrigger value="podcasts" className="text-lg">
              Podcasts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="mt-6">
            <AdminArticles />
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <AdminProducts />
          </TabsContent>

          <TabsContent value="courses" className="mt-6">
            <AdminCourses />
          </TabsContent>

          <TabsContent value="podcasts" className="mt-6">
            <AdminPodcasts />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
