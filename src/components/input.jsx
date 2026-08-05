import React,{ useId } from 'react'
import { forwardRef } from 'react';

const Input = React.forwardRef(function Input({

    label,
    className = "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
    ...rest
}, ref) {
  const id = useId();
  return (
    <div className="mb-4 w-full">
        {label && <label htmlFor={id} className="block mb-1 font-medium text-gray-700">{label}</label>}
        <input id={id} className={className} ref={ref} {...rest} />
    </div>
  )
}
)

export default Input