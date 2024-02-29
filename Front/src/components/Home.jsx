import React, { useState } from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";

const Home = () => {
  //TODO: poner por defecto el country que tiene guardado el usuario en db
  const [country, setCountry] = useState("AR");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    babies: 0,
  });
  return (
    <div className="flex flex-col items-center w-full min-h-full">
      <p className="text-2xl py-6">¿Buscas un transfer? Encuentralo aquí.</p>
      {/* <Sidebar /> */}
      <SearchBar from={from} setFrom={setFrom} to={to} setTo={setTo} dateFrom={dateFrom} setDateFrom={setDateFrom} dateTo={dateTo} setDateTo={setDateTo} passengers={passengers} setPassengers={setPassengers} country={country} setCountry={setCountry}/>
      <div className="mt-auto">© Transfers App. 2024.</div>
    </div>
  );
};

export default Home;
