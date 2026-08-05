import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control ,label, defaultValue="", ...rest}) {
  return (

    <div className="mb-4 w-full">
        {label && <label htmlFor={name} className="block mb-1 font-medium text-gray-700">{label}</label>}   


    <Controller
      name={name}
      control={control}
      render={({ field  :{ value, onChange } }) => (
        <Editor
          apiKey="yf0g2azcjhqlo5yxvcqp52w9xzgn61e7zorn9ye1qyq2cg91"
          value={value}
          onEditorChange={(content) => onChange(content)}
          init={{
            height: 240,
            menubar: false,
            plugins: [
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help'
          }}
          {...rest}
        />
      )}
    />
      
    </div>
  )
}

