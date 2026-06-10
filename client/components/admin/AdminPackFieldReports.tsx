import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FieldReport } from "@shared/api";
import { toast } from "sonner";
import { uploadImage } from "@/lib/imageUpload";

const BADGE_COLORS = [
  { value: "bg-th-teal", label: "Teal" },
  { value: "bg-th-orange", label: "Orange" },
  { value: "bg-th-dark-teal", label: "Dark Teal" },
  { value: "bg-th-dark", label: "Dark" },
];

const AdminPackFieldReports = () => {
  const [reports, setReports] = useState<FieldReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    badge: "",
    badge_color: "bg-th-teal",
    image_url: "",
    quote: "",
    attribution: "",
    display_order: 0,
    active: true,
  });

  useEffect(() => { fetchReports(); }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/pack-field-reports");
      const data = await res.json();
      setReports(data.data || []);
    } catch {
      toast.error("Failed to load field reports");
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
    try {
      const url = editingId ? `/api/admin/field_reports/${editingId}` : "/api/admin/field_reports";
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
      await fetchReports();
      resetForm();
      setIsOpen(false);
      toast.success(editingId ? "Field report updated" : "Field report added");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this field report?")) return;
    try {
      const res = await fetch(`/api/admin/field_reports/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      await fetchReports();
      toast.success("Field report deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete");
    }
  };

  const handleEdit = (report: FieldReport) => {
    setFormData({
      badge: report.badge,
      badge_color: report.badge_color,
      image_url: report.image_url,
      quote: report.quote,
      attribution: report.attribution,
      display_order: report.display_order,
      active: report.active,
    });
    setEditingId(report.id);
    setIsOpen(true);
  };

  const resetForm = () => {
    setFormData({ badge: "", badge_color: "bg-th-teal", image_url: "", quote: "", attribution: "", display_order: reports.length, active: true });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Field Reports</h2>
          <p className="text-sm text-gray-500 mt-1">Stories shown in the Field Reports section on The Pack page.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>+ Add Field Report</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Field Report" : "Add Field Report"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Badge Text <span className="text-red-500">*</span></label>
                <Input value={formData.badge} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} placeholder="e.g. SUMMIT DOG" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Badge Color</label>
                <select value={formData.badge_color} onChange={(e) => setFormData({ ...formData, badge_color: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm">
                  {BADGE_COLORS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Photo <span className="text-red-500">*</span></label>
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="block w-full text-sm border rounded-md p-2" />
                {formData.image_url && (
                  <div className="rounded-lg overflow-hidden h-32 bg-gray-100">
                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quote <span className="text-red-500">*</span></label>
                <Textarea value={formData.quote} onChange={(e) => setFormData({ ...formData, quote: e.target.value })} rows={3} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Attribution <span className="text-red-500">*</span></label>
                <Input value={formData.attribution} onChange={(e) => setFormData({ ...formData, attribution: e.target.value })} placeholder="e.g. MARCUS & LUNA" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Display Order</label>
                  <Input type="number" min="0" value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })} />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input type="checkbox" id="active_r" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} className="w-4 h-4" />
                  <label htmlFor="active_r" className="text-sm font-medium">Active</label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1" disabled={uploading}>{uploading ? "Uploading..." : editingId ? "Update" : "Add"}</Button>
                <Button type="button" variant="outline" onClick={() => { setIsOpen(false); resetForm(); }}>Cancel</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : reports.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-lg border">
          <p className="font-medium">No field reports yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Badge</TableHead>
                <TableHead>Attribution</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((r) => (
                <TableRow key={r.id}>
                  <TableCell><img src={r.image_url} alt="" className="w-16 h-10 object-cover rounded" /></TableCell>
                  <TableCell><span className={`${r.badge_color} text-white text-xs px-2 py-1 rounded`}>{r.badge}</span></TableCell>
                  <TableCell className="text-sm">{r.attribution}</TableCell>
                  <TableCell>{r.display_order}</TableCell>
                  <TableCell>{r.active ? "✓" : "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(r)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(r.id)}>Delete</Button>
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

export default AdminPackFieldReports;
