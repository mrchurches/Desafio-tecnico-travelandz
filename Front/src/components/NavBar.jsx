import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setAccessToken, setUser } from "../redux/myReducer";

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  // const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const accessToken = useSelector((state) => state.myReducer.accessToken);
  const user = useSelector((state) => state.myReducer.user);
  let location = useLocation();

  useEffect(() => {
    console.log("se renderizo el componente NavBar <---");
    // Verificar si hay un token de acceso en el localStorage
    // const accessToken = localStorage.getItem('accessToken');

    setIsLoggedIn(accessToken ? true : false);
  }, []);

  // useEffect(() => {
  //   if(isLoggedIn){
  //     const user =
  //     setUser(user);
  //   }
  // }, [isLoggedIn]);

  const handleLogout = () => {
    // Limpiar el token de acceso del localStorage al cerrar sesión
    // localStorage.removeItem('accessToken');
    dispatch(setAccessToken(""));
    dispatch(setUser({}));
    setIsLoggedIn(false);
    //borrar cookies de acces token y user
    setShowLogout(false);
    localStorage.clear();
  };

  if (location.pathname === "/") {
    return null;
  }

  return (
    <nav className="flex w-screen justify-between p-4">
      <div className="navbar-left content-center text-xl">
        <Link to="/home">Transfers app</Link>
      </div>
      <div className="flex navbar-right gap-x-2">
        {isLoggedIn ? (
          <div className="flex flex-col gap-y-2 items-center">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="relative"
            >
              {user.email}
            </button>
            {showOptions && (
              <div className="absolute top-16 flex flex-col gap-y-2">
                <Link to="/bookings">
                  <button>Bookings</button>
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/sign_in">
              <button>Sign In</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
