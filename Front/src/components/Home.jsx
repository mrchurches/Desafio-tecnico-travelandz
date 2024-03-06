import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import { BsFillPeopleFill, BsGeoAlt } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { FaCalendarDay } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setSelectedTrip } from "../redux/myReducer";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Home = () => {
  //TODO: poner por defecto el country que tiene guardado el usuario en db
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("ES");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    babies: 0,
  });
  const [availableTransfers, setAvailableTransfers] = useState([]);
  const [openContract, setOpenContract] = useState(false);

  useEffect(() => {
    console.log("se renderizo el componente HOME! <---");
  }, []);

  useEffect(() => {
    console.log(country);
  }, [country]);

  const handleBooking = (data) => {
    // e.preventDefault();
    console.log("Booking");
    dispatch(setSelectedTrip(data))
    navigate("/booking")
  }

  return (
    <div className="flex flex-col items-center w-full min-h-full">
      <p className="text-2xl py-6">¿Buscas un transfer? Encuentralo aquí.</p>
      {/* <Sidebar /> */}
      <SearchBar
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
        // dateFrom={dateFrom}
        // setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        passengers={passengers}
        setPassengers={setPassengers}
        country={country}
        setCountry={setCountry}
        availableTransfers={availableTransfers}
        setAvailableTransfers={setAvailableTransfers}
        loading={loading}
        setLoading={setLoading}
      />
      <div className="flex">
        <div
          id="details-trip"
          className={`${!availableTransfers.length && 'hidden'} bg-slate-300 w-56 my-4 flex flex-col items-center`}
        >
          <div className="text-slate-950">Trip details</div>
          <div className="flex ">
            <BsGeoAlt />
            <p className="">{`${from.address}, ${from.postalCode}, ${from.city}`}</p>
          </div>
          <div className="flex">
            <BsGeoAlt />
            <p>{`${to.address}, ${to.postalCode}, ${to.city}`}</p>
          </div>
          <div>
            <FaCalendarDay />
            <p>{`${dateFrom}, ${dateTo}`}</p>
          </div>
          <div>
            <BsFillPeopleFill />
            <p>{passengers.adults+passengers.children+passengers.babies+' passengers'}</p>
            </div>
        </div>
        <div
          id="available-transfers"
          className="flex flex-wrap flex-col justify-center items-center w-full min-h-full gap-x-2 p-4"
        >
          {!loading && availableTransfers?.services?.length > 0 ? (
            availableTransfers.services.map((transfer, i) => (
              <div
                key={transfer.id}
                className="flex flex-col bg-white rounded-lg p-10 mb-4 text-slate-950 gap-x-4 w-[50rem]"
              >
                <div className="flex gap-x-6 justify-around items-center">
                  <div id="photo-car" className="flex flex-col items-center">
                    {transfer.content.images?.length > 0 &&
                      transfer.content.images[0].url?.length > 0 && (
                        <img
                          src={transfer.content.images[0].url}
                          alt="car"
                          className="h-20 w-auto"
                        />
                      )}
                    <p>{`${transfer.content.category.name} ${transfer.content.vehicle.name}`}</p>
                    <p>(Or similar)</p>
                  </div>
                  <div
                    id="resume-service"
                    className="w-40 gap-y-2 flex flex-col "
                  >
                    <p className="font-bold pb-2 text-blue-500">
                      Service resume
                    </p>
                    {transfer.content.transferDetailInfo.map((detail) => (
                      <div key={detail.id} className="flex flex-col text-sm">
                        <p>{detail.description}</p>
                      </div>
                    ))}
                  </div>
                  <div id="price">
                    <div className="flex flex-col gap-y-4">
                      <p>{`${transfer.price.currencyId} ${transfer.price.totalAmount}`}</p>
                      <p>Final price.</p>
                      <button
                        className="bg-blue-500 text-white rounded-lg p-2 w-20 h-14"
                        onClick={(e) =>{ e.preventDefault(), handleBooking(transfer)}}
                      >
                        Book now
                      </button>
                    </div>
                  </div>
                </div>
                <div id="contract">
                  <div
                    className="flex items-center gap-x-2"
                    onClick={() =>
                      setOpenContract(openContract == i ? null : i)
                    }
                  >
                    <p className="font-bold">Contract</p>
                    <span>
                      <IoIosArrowDown />
                    </span>
                  </div>
                  {openContract == i && (
                    <p>{transfer.content.transferRemarks[0].description}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg font-bold text-slate-400">
              No hay transfers disponibles
            </p>
          )}
          {loading && <Spinner />}
        </div>
      </div>
      <div className="mt-auto">© Transfers App. 2024.</div>
    </div>
  );
};

export default Home;
