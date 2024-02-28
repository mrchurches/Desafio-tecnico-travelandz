import { useEffect, useState } from "react";
import { BsGeoAlt } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
const BASE_URL = import.meta.env.VITE_REACT_APP_URL_BACK;


const SearchBar = ({
  from,
  setFrom,
  to,
  setTo,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  passengers,
  setPassengers,
}) => {
  const URL = import.meta.env.VITE_REACT_APP_URL_BACK;
  const types = ["One Way Trip", "Round Trip"];
  const [typeOfTrip, setTypeOfTrip] = useState(0);
  const [showPassengersInputs, setShowPassengersInputs] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    console.log(typeOfTrip);
  }, [typeOfTrip]);

  const toggleTypeOfTrip = () => {
    setTypeOfTrip(typeOfTrip === 0 ? 1 : 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:");
    let queryParameters = {
      from: from,
      to: to,
      dateFrom: dateFrom,
      dateTo: typeOfTrip === 0 ? undefined : dateTo,
      adults: passengers.adults,
      children: passengers.children,
      babies: passengers.babies,
    }
  };

  useEffect(() => {
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    // console.log(import.meta.env.VITE_REACT_APP_URL_API);
    fetch(`${import.meta.env.VITE_REACT_APP_URL_API}/search/countries`, options)
      .then((response) => response.json())
      .then((data) => setCountries(data));
  },[]);
  return (
    <div className=" h-[10rem] text-slate-950">
      <div className="flex items-center gap-x-2 py-2 ml-3 bg-slate-300 w-52 rounded-t-xl justify-center">
        <label>{types[typeOfTrip]}</label>
        <label className="switch">
          <input type="checkbox" onClick={toggleTypeOfTrip} />
          <span className="slider round"></span>
        </label>
      </div>
      <form className="flex p-4 gap-x-4 border-2 rounded-xl justify-around items-center">
        <div className="flex gap-x-2 bg-slate-300 p-2 rounded-lg items-center">
          <BiWorld size="1.4em" />
          {/* <select type="text" placeholder="Country" className="rounded-lg p-1 bg-slate-300 focus:outline-none text-slate-950" /> */}
          <select
            name="country"
            id="country"
            className="rounded-lg p-1 bg-slate-300 focus:outline-none text-slate-950">
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
            </select>
        </div>
        <div id="from" className="flex flex-col gap-y-2">
          <div className="flex gap-x-2 bg-slate-300 p-2 rounded-lg items-center">
            <BsGeoAlt size="1.4em" />
            <input
              type="text"
              placeholder="From.."
              className="rounded-lg p-1 bg-slate-300 focus:outline-none text-slate-950"
            />
          </div>
          <div className="flex gap-x-2 items-center ">
            <input type="date" className="bg-slate-300 p-2 rounded-lg" />
            <input type="time" className="bg-slate-300 p-2 rounded-lg" />
          </div>
          <div></div>
        </div>
        <div className="text-white">
          {typeOfTrip == 0 ? (
            <FaArrowRight size="2em" />
          ) : (
            <FaArrowRightArrowLeft size="2em" />
          )}
        </div>
        <div id="to" className="flex flex-col gap-y-2">
          <div className="flex gap-x-2 bg-slate-300 p-2 rounded-lg items-center">
            <BsGeoAlt size="1.4em" />
            <input
              type="text"
              placeholder="To.."
              className="rounded-lg p-1 bg-slate-300 focus:outline-none text-slate-950"
            />
          </div>
          <div className="flex gap-x-2 items-center ">
            <input
              type="date"
              disabled={typeOfTrip == 0}
              className={`bg-slate-300 p-2 rounded-lg ${
                typeOfTrip == 0 && "text-slate-400"
              }`}
            />
            <input
              type="time"
              disabled={typeOfTrip == 0}
              className={`bg-slate-300 p-2 rounded-lg ${
                typeOfTrip == 0 && "text-slate-400"
              }`}
            />
          </div>
          <div></div>
        </div>
        <div id="passengers" className="rounded-lg p-1 bg-slate-300">
          <div className="flex p-2 gap-x-2 relative">
            <BsFillPeopleFill size="1.4em" />
            <div className=" w-24 truncate">
              {Object.entries(passengers)
                .filter(([key, value]) => value > 0)
                .map(([key, value]) => `${value} ${key}`)
                .join(", ")}
            </div>
            <div
              className={`${showPassengersInputs && "transform rotate-180"}`}
              onClick={() => setShowPassengersInputs(!showPassengersInputs)}
            >
              <IoIosArrowDown size="1.4em" />
            </div>
          </div>
          <div
            className={`${
              !showPassengersInputs && "hidden"
            } absolute flex flex-col gap-y-2 py-3 bg-slate-300 rounded-lg`}
          >
            <div className="p-2 flex gap-x-2 items-center text-white">
              <span className="text-slate-950">Adults</span>
              <button onClick={(e)=>{
                e.preventDefault();
                if(passengers.adults==1)return;
                setPassengers({...passengers,adults: passengers.adults-1})}} className="h-8 flex items-center">-</button>
              <span className="text-slate-950">{passengers.adults}</span>
              <button onClick={(e)=>{e.preventDefault();setPassengers({...passengers,adults: passengers.adults+1})}} className="h-8  flex items-center">+</button>
            </div>
            <div className="p-2 flex gap-x-2 items-center text-white">
              <span className="text-slate-950">Children</span>
              <button onClick={(e)=>{
                e.preventDefault();
                if(passengers.children==0)return;
                setPassengers({...passengers,children: passengers.children-1})}} className="h-8 flex items-center">-</button>
              <span className="text-slate-950">{passengers.children}</span>
              <button onClick={(e)=>{e.preventDefault();setPassengers({...passengers,children: passengers.children+1})}} className="h-8  flex items-center">+</button>
            </div>
            <div className="p-2 flex gap-x-2 items-center text-white">
              <span className="text-slate-950">Babies</span>
              <button onClick={(e)=>{
                e.preventDefault();
                if(passengers.babies==0)return;
                setPassengers({...passengers,babies: passengers.babies-1})}} className="h-8 flex items-center">-</button>
              <span className="text-slate-950">{passengers.babies}</span>
              <button onClick={(e)=>{e.preventDefault();setPassengers({...passengers,babies: passengers.babies+1})}} className="h-8  flex items-center">+</button>
            </div>
          </div>
        </div>
        <div>
          <button onClick={(e) => handleSubmit(e)} className="text-white">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;