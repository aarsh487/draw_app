import { ChildProcess } from 'child_process';
import { Brush } from 'lucide-react';
import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge';

interface TagProps {
    className?: string;
    children: ReactNode;
}

export const Tags = ({ className, children } : TagProps) => {
  return (
    <div className={twMerge("inline-flex gap-2 items-center bg-gradient-to-r from-slate-50 to-violet-200 border border-secondary text-primary px-3 py-2 rounded-full uppercase", className)}>
      <span><Brush size={20} color="#9b87f5" strokeWidth={2.5} /></span>
        <span>{children}</span>
    </div>
  )
}
