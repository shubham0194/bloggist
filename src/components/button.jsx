import React from 'react'

function Button(
    {
        children,
        onClick,
        className = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300",
        ...rest
    }
) {
  return (
    <button className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

export default Button