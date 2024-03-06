import { useEffect, useState } from "react";
import { BsGeoAlt } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoIosArrowDown, IoMdCloseCircle } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import {
  checkData,
  getAvailableTransfers,
  handleDate,
  handleTime,
  searchPlaces,
} from "../helpers/searchBar";
import { MdErrorOutline } from "react-icons/md";
import { Tooltip } from "react-tooltip";

const SearchBar = ({
  from,
  setFrom,
  to,
  setTo,
  // dateFrom,
  // setDateFrom,
  // dateTo,
  // setDateTo,
  passengers,
  setPassengers,
  country,
  setCountry,
  availableTransfers,
  setAvailableTransfers,
  loading,
  setLoading,
}) => {
  const URL = import.meta.env.VITE_REACT_APP_URL_API;
  const types = ["One Way Trip", "Round Trip"];
  const [typeOfTrip, setTypeOfTrip] = useState(0);
  const [showPassengersInputs, setShowPassengersInputs] = useState(false);
  const [countries, setCountries] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [pickups, setPickups] = useState([]);
  const [airports, setAirports] = useState([]);
  const [fromResults, setFromResults] = useState([]);
  const [toResults, setToResults] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [errors, setErrors] = useState({});

  const toggleTypeOfTrip = () => {
    setTypeOfTrip(typeOfTrip === 0 ? 1 : 0);
  };

  useEffect(() => {
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (!countries.length) {
      fetch(
        `${import.meta.env.VITE_REACT_APP_URL_API}/search/countries`,
        options
      )
        .then((response) => response.json())
        .then((data) => setCountries(data));
    }
    const date = new Date();
    const localDate = date.toISOString().split("T")[0];
    const localTime = date.toTimeString().slice(0, 5);
    setDateFrom(localDate);
    setTimeFrom(localTime);

  }, []);

  useEffect(() => {
  }, [countries]);

  useEffect(() => {
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(
      `${
        import.meta.env.VITE_REACT_APP_URL_API
      }/search/hotels?countryCodes=${country}`,
      options
    )
      .then((response) => response.json())
      .then((data) => setHotels(data));
    // fetch(`${import.meta.env.VITE_REACT_APP_URL_API}/search/pickups?countryCodes=${country}`, options)
    //   .then((response) => response.json())
    //   .then((data) => setPickups(data));
    fetch(
      `${
        import.meta.env.VITE_REACT_APP_URL_API
      }/search/terminals?countryCodes=${country}`,
      options
    )
      .then((response) => response.json())
      .then((data) => setAirports(data));
  }, [country]);

  // useEffect(() => {
  //   if (hotels.length || pickups.length || airports.length) {
  //     console.log("Hotels:", hotels.length);
  //     console.log("Pickups:", pickups.length);
  //     console.log("Airports:", airports.length);
  //     console.log("aeropuerto", airports[0]);
  //     console.log("pickups", pickups[0]);
  //   }
  // }, [hotels, pickups, airports]);

  // useEffect(() => {
  //   console.log("from: ", dateFrom);
  //   console.log("to: ", dateTo);
  // }, [dateFrom, dateTo]);

  const [timeoutId, setTimeoutId] = useState(null);
  const handleSearch = (data) => {
    clearTimeout(timeoutId);
    setTimeoutId(
      setTimeout(() => {
        searchPlaces(data);
      }, 500)
    );
  };

  // useEffect(() => {
  //   console.log("from: ", from);
  //   console.log("to: ", to);
  // }, [from, to]);

  const handleInputClear = (value) => {
    if (value === "inputFrom") {
      document.getElementById("fromInput").value = "";
      setFrom("");
      setFromResults([]);
    }
    if (value === "inputTo") {
      document.getElementById("toInput").value = "";
      setTo("");
      setToResults([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkData({
      from,
      to,
      dateFrom,
      timeFrom,
      dateTo,
      timeTo,
      passengers,
      typeOfTrip,
      errors,
      setErrors,
    });

    if (!Object.values(errors).some((error) => error)) {
      console.log("no hay errores")
      getAvailableTransfers({
        e,
        from,
        to,
        dateFrom,
        timeFrom,
        dateTo,
        timeTo,
        passengers,
        typeOfTrip,
        availableTransfers,
        setAvailableTransfers,
        URL,
        setLoading,
      });
    }
  };

  // useEffect(()=>{
  //   console.log(errors)
  //   console.log({
  //     from,
  //     to,
  //     dateFrom,
  //     timeFrom,
  //     dateTo,
  //     timeTo
  //   })
  // },[errors])
  return (
    <div className=" text-slate-950">
      <div className="flex items-center gap-x-2 py-2 ml-3 bg-slate-300 w-52 rounded-t-xl justify-center">
        <label>{types[typeOfTrip]}</label>
        <label className="switch">
          <input type="checkbox" onClick={() => toggleTypeOfTrip()} />
          <span className="slider round"></span>
        </label>
      </div>
      <form className="flex p-4 gap-x-4 border-2 rounded-xl justify-around items-center">
        <div className="flex gap-x-2 bg-slate-300 p-2 rounded-lg items-center">
          <BiWorld size="1.4em" />
          <select
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="rounded-lg p-1 bg-slate-300 focus:outline-none text-slate-950"
          >
            {countries.length &&
              countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
          </select>
        </div>
        <div id="from" className="flex flex-col gap-y-2">
          <div className="flex gap-x-2 bg-slate-300 p-2 rounded-lg items-center relative">
            <BsGeoAlt size="1.4em" />
            <input
              id="fromInput"
              type="text"
              placeholder="From.."
              onChange={(e) => {
                if (e.target.value.length > 3) {
                  setErrors({ ...errors, from: false });
                  handleSearch({
                    data: [...hotels, ...airports],
                    term: e.target.value,
                    setResults: setFromResults,
                  });
                }
              }}
              className="truncate rounded-lg p-1 bg-slate-300 focus:outline-none text-slate-950"
              value={
                (from && (from.name || from.content?.description)) || undefined
              }
            />
            {from && (
              <IoMdCloseCircle onClick={() => handleInputClear("inputFrom")} />
            )}

            {errors.from && (
              <a id="fromTooltip" className="w-min">
                <MdErrorOutline color="red" />
              </a>
            )}
            <Tooltip anchorSelect="#fromTooltip" place="top">
              Debes agregar un lugar de partida
            </Tooltip>
            <div
              className={`${
                (from !== "" || !fromResults.length) && "hidden"
              } absolute bg-slate-300 top-8 left-0 rounded-lg w-full p-2`}
            >
              <ul className="flex flex-col gap-y-2 max-h-60 overflow-y-auto">
                {fromResults.map((result) => (
                  <li
                    key={result.code}
                    className="hover:bg-slate-400 p-1 rounded-lg"
                    onClick={() => setFrom(result)}
                  >
                    {result.name || result.content.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-x-2 items-center ">
            <input
              type="date"
              className="bg-slate-300 p-2 rounded-lg"
              value={dateFrom}
              min={dateFrom}
              onChange={(e) => {
                handleDate(e.target.value, 'from', setDateFrom, setErrors, errors );
                // setErrors({ ...errors, fromDate: false });
                // setDateFrom(e.target.value);
              }}
              id="inputDateFrom"
            />
            {errors.dateFrom && (
              <a id="fromDateTooltip" className="w-min">
                <div className="flex w-min">
                  <MdErrorOutline color="red" />
                </div>
              </a>
            )}
            <Tooltip anchorSelect="#fromDateTooltip" place="top">
              Debes cargar un día de partida válido
            </Tooltip>
            <input
              type="time"
              step={600}
              className="bg-slate-300 p-2 rounded-lg"
              value={timeFrom}
              onChange={(e) => handleTime(e.target.value, "from", setTimeFrom, setErrors, errors)}
              id="inputTimeFrom"
            />
            {errors.timeFrom && (
              <a id="fromTimeTooltip" className="w-min">
                <div className="flex w-min">
                  <MdErrorOutline color="red" />
                </div>
              </a>
            )}
            <Tooltip anchorSelect="#fromTimeTooltip" place="bottom">
              Debes cargar una hora de partida válida
            </Tooltip>
          </div>
        </div>
        <div className="text-white">
          {typeOfTrip == 0 ? (
            <FaArrowRight size="2em" />
          ) : (
            <FaArrowRightArrowLeft size="2em" />
          )}
        </div>
        <div id="to" className="flex flex-col gap-y-2">
          <div className="flex gap-x-2 bg-slate-300 p-2 rounded-lg items-center relative">
            <BsGeoAlt size="1.4em" />
            <input
              id="toInput"
              type="text"
              placeholder="To.."
              onChange={(e) => {
                if (e.target.value.length > 3) {
                  setErrors({ ...errors, to: false });
                  handleSearch({
                    data: [...hotels, ...airports],
                    term: e.target.value,
                    setResults: setToResults,
                  });
                }
              }}
              value={(to && (to.name || to.content?.description)) || undefined}
              className="rounded-lg p-1 bg-slate-300 focus:outline-none text-slate-950"
            />
            {to && (
              <IoMdCloseCircle onClick={() => handleInputClear("inputTo")} />
            )}
            {errors.to && (
              <a id="toTooltip" className="w-min">
                <MdErrorOutline color="red" />
              </a>
            )}
            <Tooltip anchorSelect="#toTooltip" place="top">
              Debes agregar un lugar de destino
            </Tooltip>
            <div
              className={`${
                (to !== "" || !toResults.length) && "hidden"
              } absolute bg-slate-300 top-8 left-0 rounded-lg w-full p-2`}
            >
              <ul className="flex flex-col gap-y-2 max-h-60 overflow-y-auto">
                {toResults.map((result) => (
                  <li
                    key={result.code}
                    className="hover:bg-slate-400 p-1 rounded-lg"
                    onClick={(e) => {
                      setTo(result);
                    }}
                  >
                    {result.name || result.content.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex gap-x-2 items-center ">
            <input
              type="date"
              disabled={typeOfTrip == 0}
              className={`bg-slate-300 p-2 rounded-lg ${
                typeOfTrip == 0 && "text-slate-400"
              }`}
              value={dateTo}
              min={dateFrom}
              onChange={(e) => {
                handleDate(e.target.value, 'to', setDateTo, setErrors, errors, dateFrom );
              }}
              id="inputDateTo"
            />
            {errors.dateTo && (
              <a id="toDateTooltip" className="w-min">
                <MdErrorOutline color="red" />
              </a>
            )}
            <Tooltip anchorSelect="#toDateTooltip" place="top">
              Debes cargar un día de vuelta válido
            </Tooltip>
            <input
              type="time"
              disabled={typeOfTrip == 0}
              className={`bg-slate-300 p-2 rounded-lg ${
                typeOfTrip == 0 && "text-slate-400"
              }`}
              value={timeTo}
              onChange={(e) => handleTime(e.target.value, "to", setTimeTo, setErrors, errors, timeFrom)}
              id="inputTimeTo"
            />
            {errors.timeTo && (
              <a id="toTimeTooltip" className="w-min">
                <MdErrorOutline color="red" />
              </a>
            )}
            <Tooltip anchorSelect="#toTimeTooltip" place="top">
              Debes cargar una hora de vuelta válida
            </Tooltip>
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
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (passengers.adults == 1) return;
                  setPassengers({
                    ...passengers,
                    adults: passengers.adults - 1,
                  });
                }}
                className="h-8 flex items-center"
              >
                -
              </button>
              <span className="text-slate-950">{passengers.adults}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPassengers({
                    ...passengers,
                    adults: passengers.adults + 1,
                  });
                }}
                className="h-8  flex items-center"
              >
                +
              </button>
            </div>
            <div className="p-2 flex gap-x-2 items-center text-white">
              <span className="text-slate-950">Children</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (passengers.children == 0) return;
                  setPassengers({
                    ...passengers,
                    children: passengers.children - 1,
                  });
                }}
                className="h-8 flex items-center"
              >
                -
              </button>
              <span className="text-slate-950">{passengers.children}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPassengers({
                    ...passengers,
                    children: passengers.children + 1,
                  });
                }}
                className="h-8  flex items-center"
              >
                +
              </button>
            </div>
            <div className="p-2 flex gap-x-2 items-center text-white">
              <span className="text-slate-950">Babies</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (passengers.babies == 0) return;
                  setPassengers({
                    ...passengers,
                    babies: passengers.babies - 1,
                  });
                }}
                className="h-8 flex items-center"
              >
                -
              </button>
              <span className="text-slate-950">{passengers.babies}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPassengers({
                    ...passengers,
                    babies: passengers.babies + 1,
                  });
                }}
                className="h-8  flex items-center"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={(e) => {
              handleSubmit(e);
            }}
            className="text-white"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
