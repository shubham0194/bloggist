import React from 'react'

function Logo({width = 100, height = 100}) {
  return (
    <div style={{width, height}}>
      <img src="./src/assets/logo.png" alt="bloggist logo" className="w-full h-full object-contain" />
    </div>
  )
}

export default Logo