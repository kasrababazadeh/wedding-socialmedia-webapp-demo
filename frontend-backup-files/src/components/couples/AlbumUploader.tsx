// src/components/couples/AlbumUploader.tsx
"use client";
import { useState } from "react";
import api from "../../lib/api";

interface Props {
  coupleId: string;
  onUploaded?: () => void; // optional callback
}

export default function AlbumUploader({ coupleId, onUploaded }: Props) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!files) return;
    setLoading(true);
    setError(null);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("album", file));
    try {
      await api.post(`/couples/${coupleId}/album`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (onUploaded) onUploaded();
    } catch (err: any) {
      setError(err.message || "خطایی رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow max-w-md mx-auto space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(e.target.files)}
        className="block w-full text-sm text-gray-700"
      />
      <button
        type="button"
        onClick={handleUpload}
        disabled={loading || !files}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "در حال آپلود…" : "آپلود"}
      </button>
    </div>
  );
}
