import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = ({isLoggedIn,setIsLoggedIn}) => {
    const location = useLocation();
    const [user, setUser] = useState({});
    const [showLogout, setShowLogout] = useState(false);

    if(location.pathname === '/'){
        return null;
    }

    useEffect(() => {
        // Verificar si hay un token de acceso en el localStorage
        const accessToken = localStorage.getItem('accessToken');
        setIsLoggedIn(accessToken ? true : false);

        // Agregar un event listener para detectar cambios en el localStorag
    }, []);

    useEffect(() => {
      if(isLoggedIn){
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);
      }
    }, [isLoggedIn]);

    const handleLogout = () => {
        // Limpiar el token de acceso del localStorage al cerrar sesión
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
    };

    return (
        <nav className='flex w-screen justify-between p-4'>
            <div className="navbar-left content-center text-xl"><Link to="/home">Transfers app</Link></div>
            <div className="flex navbar-right gap-x-2">
                {isLoggedIn ? (
                  <div className='flex flex-col gap-y-2 items-center'>
                    <button onClick={()=>setShowLogout(!showLogout)} className='relative'>{user.email}</button>
                    {showLogout && <button onClick={handleLogout} className='absolute top-16'>Logout</button>}
                  </div>
                ) : (
                    <>
                        <Link to="/login"><button>Login</button></Link>
                        <Link to="/sign_in"><button>Sign In</button></Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
