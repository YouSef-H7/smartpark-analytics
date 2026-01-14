
import React from 'react';

interface BannerProps {
  message: string | null;
  type: 'error' | 'warning';
}

const Banner: React.FC<BannerProps> = ({ message, type }) => {
  if (!message) return null;

  const styles = {
    error: "bg-red-500/10 border-red-500/50 text-red-200",
    warning: "bg-amber-500/10 border-amber-500/50 text-amber-200"
  };

  return (
    <div className={`border-b px-4 py-2 text-center text-sm font-medium animate-pulse ${styles[type]}`}>
      <span className="inline-block mr-2">⚠️</span>
      {message}
    </div>
  );
};

export default Banner;
