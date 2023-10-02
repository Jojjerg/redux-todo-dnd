import "@/styles/wrapper.scss";

import React, { ReactNode } from 'react'

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className='wrapper'>{children}</div>
  )
}

export default Wrapper