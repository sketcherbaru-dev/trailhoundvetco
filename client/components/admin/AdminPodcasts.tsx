import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Podcast } from "@shared/api";
import { toast } from "sonner";

const AdminPodcasts = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    audio_url: "",
    episode_number: 1,
    published_date: new Date().toISOString().split("T")[0],
    transcript: "",
    image: "",
  });

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/podcasts");
      const data = await response.json();
      setPodcasts(data.data || []);
    } catch (error) {
      toast.error("Failed to load podcasts");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingId ? `/api/admin/podcasts/${editingId}` : "/api/admin/podcasts";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save podcast");

      await fetchPodcasts();
      resetForm();
      setIsOpen(false);
      toast.success(editingId ? "Podcast updated" : "Podcast created");
    } catch (error) {
      toast.error("Failed to save podcast");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      const response = await fetch(`/api/admin/podcasts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      await fetchPodcasts();
      toast.success("Podcast deleted");
    } catch (error) {
      toast.error("Failed to delete podcast");
    }
  };

  const handleEdit = (podcast: Podcast) => {
    setFormData({
      title: podcast.title,
      description: podcast.description,
      audio_url: podcast.audio_url,
      episode_number: podcast.episode_number,
      published_date: podcast.published_date,
      transcript: podcast.transcript || "",
      image: podcast.image || "",
    });
    setEditingId(podcast.id);
    setIsOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      audio_url: "",
      episode_number: 1,
      published_date: new Date().toISOString().split("T")[0],
      transcript: "",
      image: "",
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Podcasts</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>+ New Episode</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Episode" : "Create New Episode"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Episode Title</label>
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
                  <label className="block text-sm font-medium mb-1">Episode Number</label>
                  <Input
                    type="number"
                    value={formData.episode_number}
                    onChange={(e) => setFormData({ ...formData, episode_number: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Published Date</label>
                  <Input
                    type="date"
                    value={formData.published_date}
                    onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Audio URL</label>
                <Input
                  value={formData.audio_url}
                  onChange={(e) => setFormData({ ...formData, audio_url: e.target.value })}
                  type="url"
                  placeholder="https://example.com/audio.mp3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Cover Image URL (Optional)</label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  type="url"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Transcript (Optional)</label>
                <Textarea
                  value={formData.transcript}
                  onChange={(e) => setFormData({ ...formData, transcript: e.target.value })}
                  rows={5}
                  placeholder="Paste transcript here..."
                />
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
        <div className="bg-white rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Episode Title</TableHead>
                <TableHead>Episode #</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {podcasts.map((podcast) => (
                <TableRow key={podcast.id}>
                  <TableCell className="font-medium">{podcast.title}</TableCell>
                  <TableCell>#{podcast.episode_number}</TableCell>
                  <TableCell>{podcast.published_date}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(podcast)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(podcast.id)}
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

export default AdminPodcasts;
