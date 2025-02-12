import React from 'react'
import { twMerge } from 'tailwind-merge';

interface InputProps {
    type: string;
    placeholder: string;
    onChange?: (e: any) => void;
    className?: string;
}

export const Input = ({ type, placeholder, onChange, className}: InputProps) => {
  return (
    <div className={twMerge('bg-transparent w-full text-neutral-400 p-2 border border-secondary rounded-lg hover:text-black', className)}>
        <input type={type} placeholder={placeholder} onChange={onChange} className='outline-none w-full' />
    </div>
  )
}
