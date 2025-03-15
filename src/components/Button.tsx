import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled = false
}) => {
  return (
    <button
      disabled={disabled}
      className={`w-full px-4 py-2 transition-colors hover:cursor-pointer bg-sky-600 text-white hover:bg-sky-700 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};