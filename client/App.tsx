import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FieldGuide from "./pages/FieldGuide";
import BasecampCourses from "./pages/BasecampCourses";
import FieldNotes from "./pages/FieldNotes";
import ThePack from "./pages/ThePack";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import AdminArticlesPage from "./pages/admin/AdminArticlesPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminCoursesPage from "./pages/admin/AdminCoursesPage";
import AdminPodcastsPage from "./pages/admin/AdminPodcastsPage";
import AdminHeroPage from "./pages/admin/AdminHeroPage";
import AdminPackPage from "./pages/admin/AdminPackPage";
import GalleryPage from "./pages/GalleryPage";
import ShopSuccess from "./pages/ShopSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/field-guide" element={<FieldGuide />} />
          <Route path="/basecamp-courses" element={<BasecampCourses />} />
          <Route path="/field-notes" element={<FieldNotes />} />
          <Route path="/the-pack" element={<ThePack />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/success" element={<ShopSuccess />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/articles" element={<AdminArticlesPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/courses" element={<AdminCoursesPage />} />
          <Route path="/admin/podcasts" element={<AdminPodcastsPage />} />
          <Route path="/admin/hero" element={<AdminHeroPage />} />
          <Route path="/admin/the-pack" element={<AdminPackPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
