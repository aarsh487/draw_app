import React from 'react'

function layout({ children }:  Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className='h-screen bg-gradient-to-tr from-slate-50 to-violet-100'>
        {children}
    </div>
  )
}

export default layout