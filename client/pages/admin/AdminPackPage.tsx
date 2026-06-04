import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminPackFieldReports from "@/components/admin/AdminPackFieldReports";
import AdminPackTestimonials from "@/components/admin/AdminPackTestimonials";
import AdminPackGallery from "@/components/admin/AdminPackGallery";

const TABS = [
  { id: "field-reports", label: "Field Reports" },
  { id: "testimonials", label: "Testimonials" },
  { id: "gallery", label: "Gallery" },
];

export default function AdminPackPage() {
  const [activeTab, setActiveTab] = useState("field-reports");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">The Pack</h1>
          <p className="text-sm text-gray-500 mt-1">Manage content for The Pack page.</p>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-2 border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab.id
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "field-reports" && <AdminPackFieldReports />}
        {activeTab === "testimonials" && <AdminPackTestimonials />}
        {activeTab === "gallery" && <AdminPackGallery />}
      </div>
    </AdminLayout>
  );
}
