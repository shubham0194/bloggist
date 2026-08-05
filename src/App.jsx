import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './Appwrite/Auth';
import { login, logout } from './store/slice';
import { Header, Footer } from './components/index';
import { serializeUser } from './utils/serializeUser';
import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(()=>{
        authService.getUser().then((userData)=>{
            if(userData){
                dispatch(login({userData: serializeUser(userData)}));
            }
            else{
                dispatch(logout());
            }
        })
        .finally(()=>{
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        });
    },[]);


    return !loading ? (
        <div className="w-full min-h-screen flex flex-col">
            <Header />
            <main className="flex-center w-full max-w-7xl mx-auto p-4 grow">
                <Outlet />
            </main>
            <Footer className="w-full mt-auto" />
        </div>
    ) : (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-900 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-gray-500 animate-bounce [animation-delay:-.5s]"></div>
            </div>
        </div>
    )
}

export default App
