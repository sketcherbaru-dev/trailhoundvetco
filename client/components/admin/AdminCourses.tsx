import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Course } from "@shared/api";
import { toast } from "sonner";
import { uploadImage } from "@/lib/imageUpload";

const AdminCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "Beginner",
    format: "In-Person",
    thumbnail: "",
    category: "pet-owner",
    curriculum: "",
    stripe_product_id: "",
    featured: false,
    start_date: "",
    end_date: "",
  });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadImage(file);
      setFormData({ ...formData, thumbnail: url });
      toast.success("Thumbnail uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload thumbnail");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/courses");
      const data = await response.json();
      setCourses(data.data || []);
    } catch (error) {
      toast.error("Failed to load courses");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingId ? `/api/admin/courses/${editingId}` : "/api/admin/courses";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to save course");
      }

      await fetchCourses();
      resetForm();
      setIsOpen(false);
      toast.success(editingId ? "Course updated successfully" : "Course created successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save course");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      const response = await fetch(`/api/admin/courses/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to delete course");
      }

      await fetchCourses();
      toast.success("Course deleted successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete course");
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    try {
      await fetch('/api/admin/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table: 'courses', id, direction }),
      });
      await fetchCourses();
    } catch {
      toast.error('Failed to reorder');
    }
  };

  const handleEdit = (course: Course) => {
    setFormData({
      title: course.title,
      description: course.description,
      level: course.level,
      format: course.format,
      thumbnail: course.thumbnail,
      category: course.category,
      curriculum: course.curriculum || "",
      stripe_product_id: course.stripe_product_id || "",
      featured: course.featured,
      start_date: course.start_date || "",
      end_date: course.end_date || "",
    });
    setEditingId(course.id);
    setIsOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      level: "Beginner",
      format: "In-Person",
      thumbnail: "",
      category: "pet-owner",
      curriculum: "",
      stripe_product_id: "",
      featured: false,
      start_date: "",
      end_date: "",
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Courses</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>+ New Course</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Course" : "Create New Course"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Course Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Professional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Format</label>
                  <select
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option>In-Person</option>
                    <option>Online</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Course Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="block w-full text-sm border rounded-md p-2"
                />
                {formData.thumbnail && (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-green-600">✓ Uploaded</p>
                    <img src={formData.thumbnail} alt="Thumbnail preview" className="w-20 h-20 object-cover rounded" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="pet-owner">Pet Owner</option>
                  <option value="sar">Working Dog Handlers & SAR</option>
                  <option value="first-responders">First Responders</option>
                  <option value="vet">Veterinary Professionals</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Curriculum (Optional)</label>
                <Textarea
                  value={formData.curriculum}
                  onChange={(e) => setFormData({ ...formData, curriculum: e.target.value })}
                  rows={3}
                  placeholder="List course topics..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date (Optional)</label>
                  <Input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date (Optional)</label>
                  <Input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Stripe Product ID (Optional)</label>
                <Input
                  value={formData.stripe_product_id}
                  onChange={(e) => setFormData({ ...formData, stripe_product_id: e.target.value })}
                  placeholder="prod_..."
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Featured Course
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  {editingId ? "Update" : "Create"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Title</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.level}</TableCell>
                  <TableCell>{course.format}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>{course.featured ? "✓" : "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => handleReorder(course.id, 'up')}>↑</Button>
                      <Button size="sm" variant="outline" onClick={() => handleReorder(course.id, 'down')}>↓</Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(course)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(course.id)}
                      >
                        Delete
                      </Button>
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

export default AdminCourses;
