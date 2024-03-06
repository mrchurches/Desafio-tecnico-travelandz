import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";
import Login from "./components/Login";
import Booking from "./components/Booking";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "./redux/myReducer";
import Bookings from "./components/Bookings";
import { getUserData } from "./helpers/userData";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("se renderizo el componente App <---");
    // Verificar si hay un token de acceso en el localStorage
    const accessToken = localStorage.getItem("accessToken");
    const userString = localStorage.getItem("user");
    if (accessToken && userString) {
      const user = JSON.parse(userString); // Convertir la cadena JSON de usuario de nuevo a un objeto
      getUserData(user.uid);
      setIsLoggedIn(true);
      dispatch(setUser(user));
      dispatch(setAccessToken(accessToken));
    }
  }, []);
  

  return (
    <BrowserRouter>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route
          path="/sign_in"
          element={
            <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/login"
          element={
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
