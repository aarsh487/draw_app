import React from 'react'

function layout({ children }:  Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className=' bg-[#131312]'>
        {children}
    </div>
  )
}

export default layout