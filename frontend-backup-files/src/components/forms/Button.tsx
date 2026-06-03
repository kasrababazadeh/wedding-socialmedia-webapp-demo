import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", ...props }) => {
  const baseClass = "w-full px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-400 text-black hover:bg-gray-500",
  };

  return (
    <button
      {...props}
      className={`${baseClass} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
