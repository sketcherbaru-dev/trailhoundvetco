import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Product } from "@shared/api";
import { toast } from "sonner";
import { uploadImage } from "@/lib/imageUpload";

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "books",
    badge: "",
    external_link: "",
    stripe_product_id: "",
    features: "",
    featured: false,
    field_guide_featured: false,
    shop_hero_featured: false,
  });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadImage(file);
      setFormData({ ...formData, image: url });
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data.data || []);
    } catch (error) {
      toast.error("Failed to load products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingId ? `/api/admin/products/${editingId}` : "/api/admin/products";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to save product");
      }

      await fetchProducts();
      resetForm();
      setIsOpen(false);
      toast.success(editingId ? "Product updated successfully" : "Product created successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save product");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to delete product");
      }

      await fetchProducts();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete product");
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price ?? 0,
      image: product.image,
      category: product.category,
      badge: product.badge || "",
      external_link: product.external_link || "",
      stripe_product_id: product.stripe_product_id || "",
      features: product.features || "",
      featured: product.featured,
      field_guide_featured: product.field_guide_featured || false,
      shop_hero_featured: product.shop_hero_featured || false,
    });
    setEditingId(product.id);
    setIsOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      image: "",
      category: "books",
      badge: "",
      external_link: "",
      stripe_product_id: "",
      features: "",
      featured: false,
      field_guide_featured: false,
      shop_hero_featured: false,
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>+ New Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Product" : "Create New Product"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option>books</option>
                    <option>kits</option>
                    <option>gear</option>
                    <option>supplies</option>
                    <option>courses</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Product Image</label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="block flex-1 text-sm border rounded-md p-2"
                  />
                </div>
                {formData.image && (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-green-600">✓ Uploaded</p>
                    <img src={formData.image} alt="Product preview" className="w-20 h-20 object-cover rounded" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Badge (e.g., PRE-ORDER)</label>
                  <Input
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">External Link</label>
                  <Input
                    value={formData.external_link}
                    onChange={(e) => setFormData({ ...formData, external_link: e.target.value })}
                    type="url"
                    placeholder="Optional"
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

              <div>
                <label className="block text-sm font-medium mb-1">
                  Feature Bullets (satu per baris — tampil di Field Guide)
                </label>
                <Textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={4}
                  placeholder={"Covers 50+ trail emergencies step-by-step\nBuilt for the moments you don't plan for\nBites, cuts, heat stroke, altitude & more"}
                />
                <p className="text-xs text-gray-400 mt-1">Setiap baris = satu poin bullet di halaman Field Guide</p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="featured" className="text-sm font-medium">
                    Featured Product (Shop page)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="field_guide_featured"
                    checked={formData.field_guide_featured}
                    onChange={(e) => setFormData({ ...formData, field_guide_featured: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="field_guide_featured" className="text-sm font-medium">
                    Field Guide Best Seller (shows in Field Guide page)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="shop_hero_featured"
                    checked={formData.shop_hero_featured}
                    onChange={(e) => setFormData({ ...formData, shop_hero_featured: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="shop_hero_featured" className="text-sm font-medium">
                    Shop Hero Featured (shows in Shop page hero section)
                  </label>
                </div>
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
                <TableHead>Product Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Field Guide</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.price != null ? `$${(product.price as number).toFixed(2)}` : "—"}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.featured ? "✓" : "—"}</TableCell>
                  <TableCell>{product.field_guide_featured ? "✓" : "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(product.id)}
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

export default AdminProducts;
