import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store/store';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AuthLayout from './components/authLayout';
import { Signup } from './components/index.js';
import AllPosts from './pages/AllPost';
import AddPost from  './pages/addPost';
import Post from './pages/Post';
import EditPost from './pages/editPost';


const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    {
      path: "/",
      element: <AuthLayout ><Home /></AuthLayout>
    },
    {
      path: "/login",
      element: <AuthLayout authentication={false}><Login /></AuthLayout>
    },
    {
      path: "/signup",
      element: <AuthLayout authentication={false}><Signup /></AuthLayout>
    },
    {
      path: "my-posts",
      element: <AuthLayout authentication={true}><AllPosts /></AuthLayout>
    },
    {
      path: "addPost",
      element: <AuthLayout authentication={true}><AddPost /></AuthLayout>
    },
    {
      path: "post/:slug",
      element: <AuthLayout authentication={true}><Post /></AuthLayout>
    },
    {
      path : "edit-post/:slug",
      element:<AuthLayout authentication={true}><EditPost /></AuthLayout>
    }
    
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
