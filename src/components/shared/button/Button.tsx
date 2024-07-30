import './Button.scss';

import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
