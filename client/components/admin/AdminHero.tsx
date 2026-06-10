import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HeroImage } from "@shared/api";
import { toast } from "sonner";
import { uploadImage } from "@/lib/imageUpload";

const PAGE_OPTIONS = [
  { value: "home", label: "Home" },
  { value: "field-guide", label: "Field Guide" },
  { value: "basecamp-courses", label: "Basecamp Courses" },
  { value: "field-notes", label: "Field Notes" },
  { value: "the-pack", label: "The Pack" },
  { value: "shop", label: "Shop" },
  { value: "contact", label: "Contact" },
  { value: "the-pack-bg", label: "BG: Testimonials" },
  { value: "newsletter-bg", label: "BG: Newsletter" },
  { value: "footer-bg", label: "BG: Footer" },
];

const AdminHero = () => {
  const [activePage, setActivePage] = useState("home");
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    image_url: "",
    title: "",
    subtitle: "",
    cta_text: "",
    cta_url: "",
    text_align: "left",
    overlay_opacity: 60,
    display_order: 0,
    active: true,
    page: "home",
  });

  useEffect(() => { fetchImages(); }, [activePage]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/hero-images?page=${activePage}`);
      const data = await response.json();
      setImages(data.data || []);
    } catch {
      toast.error("Failed to load hero images");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image_url) { toast.error("Please upload an image first"); return; }

    try {
      const url = editingId ? `/api/admin/hero_images/${editingId}` : "/api/admin/hero_images";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, page: activePage }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save hero image");
      }

      await fetchImages();
      resetForm();
      setIsOpen(false);
      toast.success(editingId ? "Hero image updated" : "Hero image added");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save hero image");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this hero image?")) return;
    try {
      const response = await fetch(`/api/admin/hero_images/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete");
      }
      await fetchImages();
      toast.success("Hero image removed");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadImage(file);
      setFormData({ ...formData, image_url: url });
      toast.success("Image uploaded");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({ image_url: "", title: "", subtitle: "", cta_text: "", cta_url: "", text_align: "left", overlay_opacity: 60, display_order: images.length, active: true, page: activePage });
    setEditingId(null);
  };

  const handleEdit = (img: HeroImage) => {
    setFormData({
      image_url: img.image_url,
      title: img.title || "",
      subtitle: img.subtitle || "",
      cta_text: img.cta_text || "",
      cta_url: img.cta_url || "",
      text_align: img.text_align || "left",
      overlay_opacity: img.overlay_opacity ?? 60,
      display_order: img.display_order,
      active: img.active,
      page: img.page,
    });
    setEditingId(img.id);
    setIsOpen(true);
  };

  const pageLabel = PAGE_OPTIONS.find((p) => p.value === activePage)?.label ?? activePage;

  return (
    <div className="space-y-6">
      {/* Page Selector */}
      <div className="bg-white rounded-lg border p-4">
        <p className="text-sm font-medium text-gray-500 mb-3">Select page to manage hero images:</p>
        <div className="flex flex-wrap gap-2">
          {PAGE_OPTIONS.map((p) => (
            <button
              key={p.value}
              onClick={() => setActivePage(p.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === p.value
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Hero Images — {pageLabel}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {activePage.endsWith("-bg")
              ? <>Background image for <strong>{pageLabel.replace("BG: ", "")}</strong> section. Only the first active image is used.</>
              : <>Up to 6 images for <strong>{pageLabel}</strong> hero. If only 1 image is set, no carousel will be shown.</>
            }
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button
              onClick={() => resetForm()}
              disabled={images.length >= 6}
              title={images.length >= 6 ? "Maximum 6 hero images reached" : undefined}
            >
              + Add Image {images.length >= 6 ? "(6/6 max)" : `(${images.length}/6)`}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Hero Image" : `Add Hero Image — ${pageLabel}`}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Image <span className="text-red-500">*</span></label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="block w-full text-sm border rounded-md p-2"
                />
                {formData.image_url && (
                  <div className="rounded-lg overflow-hidden h-40 bg-gray-100">
                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Title (optional)</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Overlay headline for this slide"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Subtitle (optional)</label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Short description under the headline"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">CTA Button Text (optional)</label>
                  <Input
                    value={formData.cta_text}
                    onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                    placeholder="e.g. Browse Field Guides"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CTA Button URL (optional)</label>
                  <Input
                    value={formData.cta_url}
                    onChange={(e) => setFormData({ ...formData, cta_url: e.target.value })}
                    placeholder="e.g. /shop or #section"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Text Alignment</label>
                  <select
                    value={formData.text_align}
                    onChange={(e) => setFormData({ ...formData, text_align: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Overlay Opacity: {formData.overlay_opacity}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    step="5"
                    value={formData.overlay_opacity}
                    onChange={(e) => setFormData({ ...formData, overlay_opacity: parseInt(e.target.value) })}
                    className="w-full mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Display Order</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="active" className="text-sm font-medium">Active</label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1" disabled={uploading}>
                  {uploading ? "Uploading..." : editingId ? "Update" : "Add Image"}
                </Button>
                <Button type="button" variant="outline" onClick={() => { setIsOpen(false); resetForm(); }}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : images.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-lg border">
          <p className="text-lg font-medium">No hero images for {pageLabel}</p>
          <p className="text-sm mt-1">Add up to 6 images. With only 1 image, no carousel is shown.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Title / Subtitle</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {images.map((img) => (
                <TableRow key={img.id}>
                  <TableCell>
                    <img src={img.image_url} alt="" className="w-20 h-12 object-cover rounded" />
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-sm">{img.title || <span className="text-gray-400 italic">No title</span>}</p>
                    <p className="text-xs text-gray-500">{img.subtitle}</p>
                  </TableCell>
                  <TableCell>{img.display_order}</TableCell>
                  <TableCell>{img.active ? "✓" : "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(img)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(img.id)}>Remove</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminHero;
