import React,{ forwardRef, useId } from 'react'

function Select({
    options = [],
    label,
    className = "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
    ...rest

},ref) {
    const id = useId();
  return (
    <div className="mb-4 w-full">
        {label && <label htmlFor={id} className="block mb-1 font-medium text-gray-700">{label}</label>}
        <select id={id} className={className} ref={ref} {...rest}>
            {options?.map((option,index) => (
                <option key={index} value={typeof option === 'string' ? option : option.value}>
                    {typeof option === 'string' ? option : option.label}
                </option>
            ))}
        </select>
    </div>
  )
}

export default forwardRef(Select)