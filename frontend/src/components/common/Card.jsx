import React from 'react';

export default function Card({
  children,
  className = '',
  hover = false,
  padded = true,
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/80 rounded-2xl shadow-subtle ${
        hover ? 'transition-all duration-200 hover:shadow-elevated hover:border-slate-300 dark:hover:border-slate-700' : ''
      } ${padded ? 'p-5 sm:p-6' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
