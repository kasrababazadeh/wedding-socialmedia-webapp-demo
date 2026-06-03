import React, { useRef, useState, useEffect } from "react";

interface FileUploaderProps {
  onChange: (files: File[]) => void;
  multiple?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onChange, multiple = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith("image/"));

    setSelectedFiles(imageFiles);
    onChange(imageFiles);
  };

  useEffect(() => {
    const objectUrls = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(objectUrls);

    return () => {
      objectUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4 w-full">
        <button
          type="button"
          onClick={handleButtonClick}
          className="py-2 px-4 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold hover:bg-blue-100"
        >
          انتخاب فایل
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Preview section */}
      <div className="flex flex-wrap gap-2 mt-2 w-full">
        {previews.map((src, index) => (
          <div
            key={index}
            className="w-full h-48 flex items-center justify-center border rounded overflow-hidden bg-transparent"
          >
            <img
              src={src}
              alt={`Preview ${index + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ))}
        {previews.length === 0 && (
          <span className="text-sm text-gray-500">هیچ فایلی انتخاب نشده</span>
        )}
      </div>
      
    </div>
  );
};

export default FileUploader;
