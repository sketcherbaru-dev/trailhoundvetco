import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Article } from "@shared/api";
import { toast } from "sonner";
import { uploadImage } from "@/lib/imageUpload";

const AdminArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "PHYSIOLOGY",
    author: "",
    thumbnail: "",
    image: "",
    date: new Date().toISOString().split("T")[0],
    read_time: "5 min read",
    featured: false,
    home_featured: false,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/articles");
      const data = await response.json();
      setArticles(data.data || []);
    } catch (error) {
      toast.error("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.title.trim()) errs.title = "Title is required";
    if (!formData.excerpt.trim()) errs.excerpt = "Excerpt is required";
    if (!formData.content.trim()) errs.content = "Content is required";
    if (!formData.author.trim()) errs.author = "Author is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    try {
      const url = editingId ? `/api/admin/articles/${editingId}` : "/api/admin/articles";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to save article");
      }

      await fetchArticles();
      resetForm();
      setIsOpen(false);
      toast.success(editingId ? "Article updated successfully" : "Article created successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save article");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to delete article");
      }

      await fetchArticles();
      toast.success("Article deleted successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete article");
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    try {
      await fetch('/api/admin/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table: 'articles', id, direction }),
      });
      await fetchArticles();
    } catch {
      toast.error('Failed to reorder');
    }
  };

  const handleEdit = (article: Article) => {
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      author: article.author,
      thumbnail: article.thumbnail,
      image: article.image,
      date: article.date,
      read_time: article.readTime,
      featured: article.featured,
      home_featured: article.home_featured ?? false,
    });
    setErrors({});
    setEditingId(article.id);
    setIsOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'thumbnail' | 'image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadImage(file);
      setFormData({ ...formData, [field]: url });
      toast.success(`${field === 'thumbnail' ? 'Thumbnail' : 'Image'} uploaded successfully`);
    } catch (error) {
      toast.error(`Failed to upload ${field}`);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "PHYSIOLOGY",
      author: "",
      thumbnail: "",
      image: "",
      date: new Date().toISOString().split("T")[0],
      read_time: "5 min read",
      featured: false,
      home_featured: false,
    });
    setErrors({});
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Articles</h2>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>+ New Article</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Article" : "Create New Article"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title <span className="text-red-500">*</span></label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={errors.title ? "border-red-500" : ""}
                  placeholder="Enter article title"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Excerpt <span className="text-red-500">*</span></label>
                <Input
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className={errors.excerpt ? "border-red-500" : ""}
                  placeholder="Short summary of the article"
                />
                {errors.excerpt && <p className="text-red-500 text-xs mt-1">{errors.excerpt}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Content <span className="text-red-500">*</span></label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  className={errors.content ? "border-red-500" : ""}
                  placeholder="Full article content"
                />
                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option>PHYSIOLOGY</option>
                    <option>INJURY</option>
                    <option>NUTRITION</option>
                    <option>TRAINING</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Author <span className="text-red-500">*</span></label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className={errors.author ? "border-red-500" : ""}
                    placeholder="Author name"
                  />
                  {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'thumbnail')}
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

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Feature Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'image')}
                  disabled={uploading}
                  className="block w-full text-sm border rounded-md p-2"
                />
                {formData.image && (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-green-600">✓ Uploaded</p>
                    <img src={formData.image} alt="Image preview" className="w-20 h-20 object-cover rounded" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Read Time</label>
                  <Input
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                    placeholder="5 min read"
                  />
                </div>
              </div>

              <div className="space-y-2 p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-semibold text-gray-700">Display Options</p>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="featured" className="text-sm">
                    Featured Article <span className="text-gray-500">(shown in Field Notes featured section)</span>
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="home_featured"
                    checked={formData.home_featured}
                    onChange={(e) => setFormData({ ...formData, home_featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="home_featured" className="text-sm">
                    Home Featured <span className="text-gray-500">(shown in "THE COLLECTION" on homepage)</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={uploading}>
                  {uploading ? "Uploading..." : editingId ? "Update Article" : "Create Article"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => { setIsOpen(false); resetForm(); }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading articles...</div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-lg border">
          <p className="text-lg font-medium">No articles yet</p>
          <p className="text-sm mt-1">Click "+ New Article" to create your first article.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Home</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">{article.title}</TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>{article.date}</TableCell>
                  <TableCell>{article.featured ? "✓" : "—"}</TableCell>
                  <TableCell>{article.home_featured ? "✓" : "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => handleReorder(article.id, 'up')}>↑</Button>
                      <Button size="sm" variant="outline" onClick={() => handleReorder(article.id, 'down')}>↓</Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(article)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(article.id)}>
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

export default AdminArticles;
