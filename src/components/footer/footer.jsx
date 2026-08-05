import React from 'react'
import { Logo } from '../index';

function Footer({ className = '' }) {
  return (
<footer className={`flex flex-col items-center justify-center w-full py-8 bg-linear-to-b from-[#5524B7] to-[#380B60] text-white/70 ${className}`}>
      <div className="flex items-center gap-2">
        {/* <img src={Logo} alt="Logo" className="w-12 h-12 mb-4" /> */}
        <Logo />
        <h1 className="text-2xl font-bold text-center text-white">Bloggist</h1>
      </div>
    
    <p className="mt-4 text-center">Copyright © 2025 <a className='hover:text-white' href="https://prebuiltui.com">Bloggist</a>. All rights reservered.</p>
    <div className="flex items-center gap-4 mt-5">
        <a href="https://www.instagram.com/shubham_0194" className="group hover:-translate-x-1 transition-all duration-300">
            <i className="fab fa-instagram text-white/50 text-2xl group-hover:text-pink-300 transition-all duration-300"></i>
        </a>
        <a href="https://www.linkedin.com/in/shubham-yadav-cs0194/" className="group hover:-translate-y-1 transition-all duration-300">
            <i className="fab fa-linkedin text-white/50 text-2xl group-hover:text-blue-300 transition-all duration-300"></i>
        </a>
        <a href="#" className="group hover:-translate-x-1 transition-all duration-300">
            <i className="fab fa-twitter text-white/50 text-2xl group-hover:text-blue-300 transition-all duration-300"></i>
        </a>
        <a href=" https://github.com/shubham0194/" className="group hover:-translate-y-1 transition-all duration-300">
            <i className="fab fa-github text-white/50 text-2xl group-hover:text-gray-900 transition-all duration-300"></i>
        </a>
    </div>
</footer>
  )
}

export default Footer