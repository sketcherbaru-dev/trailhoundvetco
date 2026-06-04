import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PackGalleryImage } from "@shared/api";
import { toast } from "sonner";
import { uploadImage } from "@/lib/imageUpload";

const AdminPackGallery = () => {
  const [images, setImages] = useState<PackGalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    image_url: "",
    alt_text: "",
    display_order: 0,
    active: true,
  });

  useEffect(() => { fetchImages(); }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/pack-gallery");
      const data = await res.json();
      setImages(data.data || []);
    } catch {
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image_url) { toast.error("Please upload an image first"); return; }
    try {
      const url = editingId ? `/api/admin/pack_gallery/${editingId}` : "/api/admin/pack_gallery";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save");
      }
      await fetchImages();
      resetForm();
      setIsOpen(false);
      toast.success(editingId ? "Gallery image updated" : "Gallery image added");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this gallery image?")) return;
    try {
      const res = await fetch(`/api/admin/pack_gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      await fetchImages();
      toast.success("Gallery image deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete");
    }
  };

  const handleEdit = (img: PackGalleryImage) => {
    setFormData({
      image_url: img.image_url,
      alt_text: img.alt_text,
      display_order: img.display_order,
      active: img.active,
    });
    setEditingId(img.id);
    setIsOpen(true);
  };

  const resetForm = () => {
    setFormData({ image_url: "", alt_text: "", display_order: images.length, active: true });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Collective Moments — Gallery</h2>
          <p className="text-sm text-gray-500 mt-1">Photo gallery shown in the Collective Moments section on The Pack page.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>+ Add Photo</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Gallery Photo" : "Add Gallery Photo"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Photo <span className="text-red-500">*</span></label>
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="block w-full text-sm border rounded-md p-2" />
                {formData.image_url && (
                  <div className="rounded-lg overflow-hidden h-40 bg-gray-100">
                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Alt Text</label>
                <Input value={formData.alt_text} onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })} placeholder="Describe the photo for accessibility" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Display Order</label>
                  <Input type="number" min="0" value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })} />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input type="checkbox" id="active_g" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} className="w-4 h-4" />
                  <label htmlFor="active_g" className="text-sm font-medium">Active</label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1" disabled={uploading}>{uploading ? "Uploading..." : editingId ? "Update" : "Add Photo"}</Button>
                <Button type="button" variant="outline" onClick={() => { setIsOpen(false); resetForm(); }}>Cancel</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : images.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-lg border">
          <p className="font-medium">No gallery images yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Alt Text</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {images.map((img) => (
                <TableRow key={img.id}>
                  <TableCell><img src={img.image_url} alt={img.alt_text} className="w-16 h-10 object-cover rounded" /></TableCell>
                  <TableCell className="text-sm text-gray-600">{img.alt_text || "—"}</TableCell>
                  <TableCell>{img.display_order}</TableCell>
                  <TableCell>{img.active ? "✓" : "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(img)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(img.id)}>Delete</Button>
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

export default AdminPackGallery;
