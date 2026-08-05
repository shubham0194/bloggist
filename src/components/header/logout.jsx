import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/slice';
import authService from '../../Appwrite/Auth';

function LogoutButton() {
    
    const dispatch = useDispatch();

    const handleLogout = () => {
        authService.logout().then(()=>{
            dispatch(logout());
        })
    }
  return (
    
    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300">
        Logout
    </button>
  )
}

export default LogoutButton