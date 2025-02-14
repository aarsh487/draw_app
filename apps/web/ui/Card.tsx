import React, { ReactElement, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
  title: string;
  content: string;
  icon: ReactElement;
  className?: string;
  children?: ReactNode;
}

export const Card = ({
  title,
  content,
  icon,
  className,
  children,
}: CardProps) => {
  return (
    <div
      className={twMerge(
        "h-58 w-72 lg:max-w-md bg-white border border-secondary p-6 rounded-xl",
        className
      )}
    >
      <div className="flex flex-col gap-3">
        <div>
          <div className="bg-secondary inline-flex text-primary p-3 rounded-lg">
            {icon}
          </div>
        </div>

        <div className="text-black/80 text-xl font-semibold">
          <h1>{title}</h1>
        </div>
        <div className="text-neutral-500 lg:text-sm text-xs">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};
