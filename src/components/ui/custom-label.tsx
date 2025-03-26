
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ 
  htmlFor, 
  children, 
  className = "", 
  ...props 
}) => {
  return (
    <label 
      htmlFor={htmlFor} 
      className={`text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
