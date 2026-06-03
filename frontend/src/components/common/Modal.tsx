// components/common/Modal.tsx
import React from "react";

const Modal = ({ onClose, title, children }: { onClose: () => void; title: string; children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
