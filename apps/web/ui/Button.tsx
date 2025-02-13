import React, { ReactNode } from 'react';
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const classes = cva(
  "border text-md h-10 rounded-lg px-4 font-medium cursor-pointer", {
    variants: {
      variant: {
        primary: "bg-primary border-primary text-white hover:bg-secondary hover:text-black",
        secondary: "border-secondary text-black bg-transparent hover:bg-secondary hover:border-primary"
      },
      size: {
        lg: "w-full",
        sm: "w-12"
      }
    }
  } 
);

interface ButtonProps {
  variant: "primary" | "secondary";
  size?: "lg" | "sm";
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  children: ReactNode;
  disabled?: any;
}

export const Button = ({ variant, size, className, children, onClick, disabled }: ButtonProps) => {
  return (
    <button disabled={disabled} onClick={onClick} className={twMerge(classes({ variant, size }), className)}>
      {children}
    </button>
  );
};
