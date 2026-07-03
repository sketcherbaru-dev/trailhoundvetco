import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Podcast } from "@shared/api";
import { toast } from "sonner";
import { uploadImage } from "@/lib/imageUpload";
import { uploadAudio } from "@/lib/audioUpload";

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
  const [uploading, setUploading] = useState(false);
  const [audioMode, setAudioMode] = useState<"link" | "upload">("link");
  const [audioUploading, setAudioUploading] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioFileName, setAudioFileName] = useState("");

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setAudioUploading(true);
      setAudioProgress(0);
      const url = await uploadAudio(file, setAudioProgress);
      setFormData((prev) => ({ ...prev, audio_url: url }));
      setAudioFileName(file.name);
      toast.success("Audio uploaded successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload audio");
      console.error(error);
    } finally {
      setAudioUploading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadImage(file);
      setFormData({ ...formData, image: url });
      toast.success("Cover image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

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

    if (audioUploading) {
      toast.error("Please wait for the audio upload to finish");
      return;
    }
    if (!formData.audio_url.trim()) {
      toast.error(audioMode === "upload" ? "Please upload an audio file first" : "Please enter an audio URL");
      return;
    }

    try {
      const url = editingId ? `/api/admin/podcasts/${editingId}` : "/api/admin/podcasts";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to save podcast");
      }

      await fetchPodcasts();
      resetForm();
      setIsOpen(false);
      toast.success(editingId ? "Podcast updated successfully" : "Podcast created successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save podcast");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      const response = await fetch(`/api/admin/podcasts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to delete podcast");
      }

      await fetchPodcasts();
      toast.success("Podcast deleted successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete podcast");
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    try {
      await fetch('/api/admin/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table: 'podcasts', id, direction }),
      });
      await fetchPodcasts();
    } catch {
      toast.error('Failed to reorder');
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
    setAudioMode("link");
    setAudioFileName("");
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
    setAudioMode("link");
    setAudioFileName("");
    setAudioProgress(0);
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

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Audio</label>
                {/* Mode toggle: paste a link OR upload a file */}
                <div className="inline-flex rounded-md border overflow-hidden text-sm mb-1">
                  <button
                    type="button"
                    onClick={() => setAudioMode("link")}
                    className={`px-3 py-1.5 font-medium transition-colors ${
                      audioMode === "link" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Paste Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setAudioMode("upload")}
                    className={`px-3 py-1.5 font-medium transition-colors ${
                      audioMode === "upload" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Upload File
                  </button>
                </div>

                {audioMode === "link" ? (
                  <Input
                    value={formData.audio_url}
                    onChange={(e) => setFormData({ ...formData, audio_url: e.target.value })}
                    type="url"
                    placeholder="https://example.com/audio.mp3"
                    required={audioMode === "link"}
                  />
                ) : (
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioUpload}
                      disabled={audioUploading}
                      className="block w-full text-sm border rounded-md p-2"
                    />
                    {audioUploading && (
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-orange-500 h-2 transition-all" style={{ width: `${audioProgress}%` }} />
                      </div>
                    )}
                    {formData.audio_url && !audioUploading && (
                      <div className="space-y-1">
                        <p className="text-xs text-green-600">✓ Uploaded{audioFileName ? `: ${audioFileName}` : ""}</p>
                        <audio controls src={formData.audio_url} className="w-full h-9" />
                      </div>
                    )}
                  </div>
                )}
                <p className="text-xs text-gray-400">
                  {audioMode === "link"
                    ? "Paste a direct link to an audio file (mp3, m4a, etc.)."
                    : "Upload an audio file (max 100MB). It is stored in Supabase Storage."}
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Cover Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="block w-full text-sm border rounded-md p-2"
                />
                {formData.image && (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-green-600">✓ Uploaded</p>
                    <img src={formData.image} alt="Cover preview" className="w-20 h-20 object-cover rounded" />
                  </div>
                )}
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
        <div className="bg-white rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Episode Title</TableHead>
                <TableHead>Episode #</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead>Order</TableHead>
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
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => handleReorder(podcast.id, 'up')}>↑</Button>
                      <Button size="sm" variant="outline" onClick={() => handleReorder(podcast.id, 'down')}>↓</Button>
                    </div>
                  </TableCell>
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
