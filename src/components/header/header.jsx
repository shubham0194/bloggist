import React from 'react'
import { Container, Logo, Logout} from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state)=> state.auth.status );
  const navigate = useNavigate();

  const naItems = [
    {
      name : "Home",
      slug : "/",
      active : true
    },
    {
      name : "Login",
      slug : "/login",
      active : !authStatus
    },
    {
      name : "Register",
      slug : "/signup",
      active : !authStatus  
    },
    {
      name : "add Post",
      slug : "/addPost",
      active : authStatus
    },
    {
      name : "MY Posts",
      slug : "/my-posts",
      active : authStatus
    }
  ]
  return (
    <header className="w-full bg-linear-to-b from-[#5524B7] to-[#380B60] text-white/70 py-4">
      <Container>
        <div className="flex items-center justify-between">
          <Logo width={80} height={80}/>
          <nav>
            <ul className="flex space-x-4">
              {naItems.map((item) => (
                item.active && (
                  <li key={item.slug} className="hover:text-white transition-all duration-300 group">
                    <Link to={item.slug} onClick={()=>navigate(item.slug)}>
                      {item.name}
                    </Link>
                  </li>
                )
              ))}
            </ul>
          </nav>
              {authStatus && <Logout />}
        </div>
        <div></div>
      </Container>
    </header>
  )
}

export default Header