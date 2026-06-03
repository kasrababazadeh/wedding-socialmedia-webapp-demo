import React from 'react';

interface SpinnerProps {
  size?: string;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'w-10 h-10', color = 'blue-500' }) => {
  return (
    <div
      className={`${size} border-4 border-t-4 border-solid border-gray-200 dark:border-gray-700 border-t-${color} rounded-full animate-spin`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};


export default Spinner;