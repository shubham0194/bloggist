import React from 'react'
import logo from '../assets/logo.png'

function Logo({width = 100, height = 100}) {
  return (
    <div style={{width, height}}>
      <img src={logo} alt="bloggist logo" className="w-full h-full object-contain" />
    </div>
  )
}

export default Logo