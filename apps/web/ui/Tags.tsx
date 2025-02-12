import { ChildProcess } from 'child_process';
import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge';

interface TagProps {
    className?: string;
    children: ReactNode;
}

export const Tags = ({ className, children } : TagProps) => {
  return (
    <div className={twMerge("inline-flex items-center bg-secondary border border-secondary text-primary px-3 py-2 rounded-full uppercase")}>
        <span>{children}</span>
    </div>
  )
}
