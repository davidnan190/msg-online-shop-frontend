import './Button.scss';

import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({ children, className, onClick }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
