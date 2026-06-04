import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PackTestimonial } from "@shared/api";
import { toast } from "sonner";

const AdminPackTestimonials = () => {
  const [testimonials, setTestimonials] = useState<PackTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    quote: "",
    name: "",
    role: "",
    date: "",
    avatar_initial: "",
    display_order: 0,
    active: true,
  });

  useEffect(() => { fetchTestimonials(); }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/pack-testimonials");
      const data = await res.json();
      setTestimonials(data.data || []);
    } catch {
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/admin/pack_testimonials/${editingId}` : "/api/admin/pack_testimonials";
      const method = editingId ? "PUT" : "POST";
      const body = {
        ...formData,
        avatar_initial: formData.avatar_initial || formData.name.charAt(0).toUpperCase(),
      };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save");
      }
      await fetchTestimonials();
      resetForm();
      setIsOpen(false);
      toast.success(editingId ? "Testimonial updated" : "Testimonial added");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/admin/pack_testimonials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      await fetchTestimonials();
      toast.success("Testimonial deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete");
    }
  };

  const handleEdit = (t: PackTestimonial) => {
    setFormData({
      quote: t.quote,
      name: t.name,
      role: t.role || "",
      date: t.date || "",
      avatar_initial: t.avatar_initial,
      display_order: t.display_order,
      active: t.active,
    });
    setEditingId(t.id);
    setIsOpen(true);
  };

  const resetForm = () => {
    setFormData({ quote: "", name: "", role: "", date: "", avatar_initial: "", display_order: testimonials.length, active: true });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">From The Pack — Testimonials</h2>
          <p className="text-sm text-gray-500 mt-1">Community testimonials displayed on The Pack page.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>+ Add Testimonial</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Quote <span className="text-red-500">*</span></label>
                <Textarea value={formData.quote} onChange={(e) => setFormData({ ...formData, quote: e.target.value })} rows={3} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name <span className="text-red-500">*</span></label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. DR. ELENA C." required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <Input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="e.g. Hiker & Dog Mom" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <Input value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} placeholder="e.g. Aug 2023" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Avatar Initial (auto-set from name if blank)</label>
                <Input value={formData.avatar_initial} onChange={(e) => setFormData({ ...formData, avatar_initial: e.target.value })} maxLength={1} placeholder="e.g. E" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Display Order</label>
                  <Input type="number" min="0" value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })} />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input type="checkbox" id="active_t" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} className="w-4 h-4" />
                  <label htmlFor="active_t" className="text-sm font-medium">Active</label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1">{editingId ? "Update" : "Add"}</Button>
                <Button type="button" variant="outline" onClick={() => { setIsOpen(false); resetForm(); }}>Cancel</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-lg border">
          <p className="font-medium">No testimonials yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Quote</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium text-sm">{t.name}</TableCell>
                  <TableCell className="text-sm text-gray-500">{t.role}</TableCell>
                  <TableCell className="text-sm max-w-xs truncate italic">"{t.quote}"</TableCell>
                  <TableCell>{t.display_order}</TableCell>
                  <TableCell>{t.active ? "✓" : "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(t)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(t.id)}>Delete</Button>
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

export default AdminPackTestimonials;
