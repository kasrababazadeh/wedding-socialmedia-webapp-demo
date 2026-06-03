// src/components/forms/TextArea.tsx
import React from "react";

interface Props {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  id?: string;
  placeholder?: string;
}

export default function TextArea({ label, value, onChange, id, placeholder }: Props) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded px-3 py-2 h-28 resize-none"
      />
    </div>
  );
}
