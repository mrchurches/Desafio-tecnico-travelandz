import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  noSymbols,
  validateCVC,
  validateCardNumber,
  validateCardholderName,
  validateExpirationDate,
  validateNumber,
} from "../helpers/booking";
import Spinner from "./Spinner";
import { setUser } from "../redux/myReducer";
import { BsGeoAlt } from "react-icons/bs";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";

const Booking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: datos de reserva, 2: pago, 3: confirmación
  const [isForOwner, setIsForOwner] = useState(true);
  const selectedTrip = useSelector((state) => state.myReducer.selectedTrip);
  const [typeOfPickup, setTypeOfPickup] = useState(true);
  const user = useSelector((state) => state.myReducer.user);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupDetails, setPickupDetails] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCVC] = useState("");
  const [bookingResponse, setBookingResponse] = useState({});
  const [loading, setLoading] = useState(false);
  //   {
  //     "bookings": [
  //         {
  //             "reference": "1-7611297",
  //             "bookingFileId": null,
  //             "creationDate": "2024-03-05T20:21:31",
  //             "status": "CONFIRMED",
  //             "modificationsPolicies": {
  //                 "cancellation": true,
  //                 "modification": true
  //             },
  //             "holder": {
  //                 "name": "Laureano",
  //                 "surname": "Iglesias",
  //                 "email": "laureanoiglesias34@gmail.com",
  //                 "phone": "1234567891"
  //             },
  //             "transfers": [
  //                 {
  //                     "id": 1,
  //                     "rateKey": "DEPARTURE|ATLAS|265|IATA|PMI|2024-03-07|07:40|2024-03-07|10:00|1~0~0||4|||||1|PRVT||CR|STND|37.93||||43|PMI|SIMPLE|ed4c60b0a4b0cc3b9fa40f10e740b9c1|1275900|T|6c283a51234f840091c29b61fdb0a8cf",
  //                     "status": "CONFIRMED",
  //                     "transferType": "PRIVATE",
  //                     "vehicle": {
  //                         "code": "CR",
  //                         "name": "Car"
  //                     },
  //                     "category": {
  //                         "code": "STND",
  //                         "name": "Standard"
  //                     },
  //                     "pickupInformation": {
  //                         "from": {
  //                             "code": "265",
  //                             "description": "HM Jaime III",
  //                             "type": "ATLAS"
  //                         },
  //                         "to": {
  //                             "code": "PMI",
  //                             "description": "TEST - Majorca - Palma Airport",
  //                             "type": "IATA"
  //                         },
  //                         "date": "2024-03-07",
  //                         "time": "07:40:00",
  //                         "pickup": {
  //                             "address": "Passeig De Mallorca,14B  ",
  //                             "number": null,
  //                             "town": "PALMA DE MALLORCA",
  //                             "zip": "07012",
  //                             "description": "\nFINDING YOUR DRIVER\n\nPlease be waiting at the hotel reception 10/15 minutes before your pick up time.\n\nIf you are not staying in a hotel (private residence, villa or hostel), please be outside 10/15 minutes before your pick up time.\n\nIdentify yourself by showing your voucher to the Supplier, for whom we act as a booking agent.\n\nDIFFICULTY IN LOCATING YOUR DRIVER\nContact your supplier for assistance. Do not leave without having contacted your supplier on +34 871 170 555 first.\n\nIn the event you are delayed for your departure pick up you must call the supplier.",
  //                             "altitude": null,
  //                             "latitude": 39.57301,
  //                             "longitude": 2.642626,
  //                             "checkPickup": {
  //                                 "mustCheckPickupTime": false,
  //                                 "url": null,
  //                                 "hoursBeforeConsulting": null
  //                             },
  //                             "pickupId": null,
  //                             "stopName": null,
  //                             "image": null
  //                         }
  //                     },
  //                     "paxes": [
  //                         {
  //                             "type": "ADULT",
  //                             "age": 30
  //                         }
  //                     ],
  //                     "content": {
  //                         "vehicle": {
  //                             "code": "CR",
  //                             "name": "Car"
  //                         },
  //                         "category": {
  //                             "code": "STND",
  //                             "name": "Standard"
  //                         },
  //                         "images": [
  //                             {
  //                                 "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/private.jpg",
  //                                 "type": "EXTRALARGE"
  //                             },
  //                             {
  //                                 "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/private.jpg",
  //                                 "type": "LARGE"
  //                             },
  //                             {
  //                                 "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/private.jpg",
  //                                 "type": "MEDIUM"
  //                             },
  //                             {
  //                                 "url": "https://assets.holidaytaxis.com/imgs/default/vehicle_set/private.jpg",
  //                                 "type": "SMALL"
  //                             }
  //                         ],
  //                         "transferDetailInfo": [
  //                             {
  //                                 "id": "TRFTIME",
  //                                 "name": "Transfer Time",
  //                                 "description": "min. Estimated journey time",
  //                                 "type": "GENERAL_INFO"
  //                             },
  //                             {
  //                                 "id": "MINPAX",
  //                                 "name": "Minimum pax",
  //                                 "description": "passenger(s) minimum",
  //                                 "type": "GENERAL_INFO"
  //                             },
  //                             {
  //                                 "id": "MAXPAX",
  //                                 "name": "Maximum pax",
  //                                 "description": "passenger(s) maximum",
  //                                 "type": "GENERAL_INFO"
  //                             },
  //                             {
  //                                 "id": "LUGGAGE",
  //                                 "name": "Number of suitcases",
  //                                 "description": "suitcases permitted",
  //                                 "type": "GENERAL_INFO"
  //                             }
  //                         ],
  //                         "customerTransferTimeInfo": [],
  //                         "supplierTransferTimeInfo": [],
  //                         "transferRemarks": [
  //                             {
  //                                 "type": "CONTRACT",
  //                                 "description": "\nFINDING YOUR DRIVER\n\nPlease be waiting at the hotel reception 10/15 minutes before your pick up time.\n\nIf you are not staying in a hotel (private residence, villa or hostel), please be outside 10/15 minutes before your pick up time.\n\nIdentify yourself by showing your voucher to the Supplier, for whom we act as a booking agent.\n\nDIFFICULTY IN LOCATING YOUR DRIVER\nContact your supplier for assistance. Do not leave without having contacted your supplier on +34 871 170 555 first.\n\nIn the event you are delayed for your departure pick up you must call the supplier.",
  //                                 "mandatory": true
  //                             }
  //                         ]
  //                     },
  //                     "price": {
  //                         "totalAmount": 37.93,
  //                         "netAmount": null,
  //                         "currencyId": "EUR"
  //                     },
  //                     "cancellationPolicies": [
  //                         {
  //                             "amount": 35.48,
  //                             "from": "2024-03-06T00:00:00",
  //                             "currencyId": "EUR",
  //                             "isForceMajeure": false
  //                         }
  //                     ],
  //                     "factsheetId": 43,
  //                     "arrivalFlightNumber": null,
  //                     "departureFlightNumber": "123",
  //                     "arrivalShipName": null,
  //                     "departureShipName": null,
  //                     "arrivalTrainInfo": null,
  //                     "departureTrainInfo": null,
  //                     "transferDetails": [
  //                         {
  //                             "type": "FLIGHT",
  //                             "direction": "DEPARTURE",
  //                             "code": "123",
  //                             "companyName": null
  //                         }
  //                     ],
  //                     "sourceMarketEmergencyNumber": "34971211630",
  //                     "links": [
  //                         {
  //                             "rel": "transferCancel",
  //                             "href": "/booking/en/reference/1-7611297",
  //                             "method": "DELETE"
  //                         }
  //                     ]
  //                 }
  //             ],
  //             "clientReference": "BOSTON#12-203#456754",
  //             "remark": "",
  //             "invoiceCompany": {
  //                 "code": "E14"
  //             },
  //             "supplier": {
  //                 "name": "HOTELBEDS SPAIN, S.L.U",
  //                 "vatNumber": "ESB28916765"
  //             },
  //             "totalAmount": 35.48,
  //             "totalNetAmount": 35.48,
  //             "pendingAmount": 35.48,
  //             "currency": "EUR",
  //             "links": [
  //                 {
  //                     "rel": "self",
  //                     "href": "/booking/en/reference/1-7611297",
  //                     "method": "GET"
  //                 },
  //                 {
  //                     "rel": "bookingDetail",
  //                     "href": "/booking/en/reference/1-7611297",
  //                     "method": "GET"
  //                 },
  //                 {
  //                     "rel": "bookingCancel",
  //                     "href": "/booking/en/reference/1-7611297",
  //                     "method": "DELETE"
  //                 }
  //             ],
  //             "paymentDataRequired": false
  //         }
  //     ]
  // }

  useEffect(() => {
    console.log("se renderizo el componente Booking <---");
    console.log(selectedTrip);
    console.log(Object.keys(selectedTrip).length);
    setFullName(user.fullName);
    setEmail(user.email);
    setConfirmEmail(user.email);
    setLoading(false)
  }, []);

  const handlePickupDetails = (e, from) => {
    if (typeOfPickup) {
      if (from == "number") {
        pickupDetails == ""
          ? setPickupDetails(`#${e.target.value}`)
          : setPickupDetails(
              `${pickupDetails.split("#")[0]}#${e.target.value}`
            );
      } else {
        pickupDetails == ""
          ? setPickupDetails(`${e.target.value}#`)
          : setPickupDetails(
              `${e.target.value}#${pickupDetails.split("#")[1]}`
            );
      }
    } else {
      setPickupDetails(e.target.value);
    }
  };

  const handleSubmit = (e, step) => {
    e.preventDefault();
    console.log("Booking");
    // dispatch(setSelectedTrip(data))
    // navigate("/booking")
    if (step === 1) {
      let fullNameCheck = fullName.length > 3 && noSymbols(fullName);
      let emailCheck =
        email.length && confirmEmail.length && email == confirmEmail;
      let phoneCheck = validateNumber(phone);
      let pickupDetailsCheck = pickupDetails.length > 3;
      if (fullNameCheck && emailCheck && phoneCheck && pickupDetailsCheck) {
        setStep(2);
      } else {
        setErrors({
          fullName: !fullNameCheck,
          email: !emailCheck,
          confirmEmail: !emailCheck,
          phone: !phoneCheck,
          pickupDetails: !pickupDetailsCheck,
        });
      }
    }
    if (step === 2) {
      let cardholderNameCheck = validateCardholderName(cardholderName);
      let cardNumberCheck = validateCardNumber(cardNumber);
      let expirationDateCheck = validateExpirationDate(expirationDate);
      let cvcCheck = validateCVC(cvc);
      if (
        cardholderNameCheck &&
        cardNumberCheck &&
        expirationDateCheck &&
        cvcCheck
      ) {
        setStep(3);
      } else {
        setErrors({
          cardholderName: !cardholderNameCheck,
          cardNumber: !cardNumberCheck,
          expirationDate: !expirationDateCheck,
          cvc: !cvcCheck,
        });
      }
    }
    if (step === 3) {
      setLoading(true);
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: "en",
          holder: {
            name: fullName.split(" ")[0],
            surname: fullName.split(" ")[1],
            email: email,
            phone: phone,
          },
          transfers: [
            {
              rateKey: selectedTrip.rateKey,
              transferDetails: [
                {
                  type: typeOfPickup ? "FLIGHT" : "OTHER",
                  direction: "DEPARTURE",
                  code: pickupDetails.split("#")[0],
                  companyName: pickupDetails.split("#")[1],
                },
              ],
            },
          ],
          clientReference: "BOSTON#12-203#456754",
          welcomeMessage: "Welcome Mr. John Doe",
          remark: description,
        }),
      };
      console.log(options.body, "body a enviar!");
      fetch(`http://localhost:3001/booking/confirm?uid=${user.uid}`, options)
        .then((response) => response.json())
        .then(({ response, data }) => {
          console.log(data, "data de la reserva en el front ")
          if (response == "ok") {
            dispatch(setUser({ ...user, confirmations: [...user.confirmations, data] }));
            setBookingResponse(data);
            setLoading(false);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (isForOwner) {
      setFullName(user.fullName);
      setEmail(user.email);
      setConfirmEmail(user.email);
    } else {
      setFullName("");
      setEmail("");
      setConfirmEmail("");
    }
  }, [isForOwner]);
  return (
    <div className="flex flex-col items-center gap-y-2">
      <h1>Booking</h1>
      <div className="flex justify-center gap-x-4 items-center">
        <div
          className={`${
            step == 1 && "bg-gray-200 rounded-full text-slate-950"
          } flex w-10 h-10 items-center justify-center`}
        >
          1
        </div>
        <div className="bg-slate-300 h-1 w-4"></div>
        <div
          className={`${
            step == 2 && "bg-gray-200 rounded-full text-slate-950"
          } flex w-10 h-10 items-center justify-center`}
        >
          2
        </div>
        <div className="bg-slate-300 h-1 w-4"></div>
        <div
          className={`${
            step == 3 && "bg-gray-200 rounded-full text-slate-950"
          } flex w-10 h-10 items-center justify-center`}
        >
          3
        </div>
      </div>
      <div id="step-1" className={`${step !== 1 && "hidden"}`}>
        <p>Completa tus datos y finaliza tu reserva</p>
        <form className="flex flex-col gap-y-4">
          <p>¿Para quién es la reserva?</p>
          <div className="flex items-center justify-between">
            <label>{"Para otro"}</label>
            <label className="switch">
              <input
                type="checkbox"
                onClick={() => setIsForOwner(!isForOwner)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <input
            type="text"
            placeholder="Nombre completo"
            id="full_name_booking"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && (
            <p className="text-red-700">{"Debes completar el nombre"}</p>
          )}
          {/* <input type="text" placeholder="Apellido" /> */}
          <input
            type="text"
            placeholder="Email"
            id="email_booking"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* {errors.email && <p>{'Debes completar el mail'}</p>} */}
          <input
            type="text"
            placeholder="Confirmar mail"
            id="confirm_email_booking"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
          {errors.confirmEmail && (
            <p className="text-red-700">{"Los mails deben coincidir"}</p>
          )}
          <input
            type="text"
            placeholder="Teléfono"
            id="phone_booking"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && (
            <p className="text-red-700">{"Debes completar el teléfono"}</p>
          )}
          <p>¿Dónde te recogemos?</p>
          {/* choose between airport or other with a toggle */}
          <div className="flex items-center justify-between">
            <label>{typeOfPickup ? "Aeropuerto" : "Otro"}</label>
            <label className="switch">
              <input
                type="checkbox"
                onClick={() => setTypeOfPickup(!typeOfPickup)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          {typeOfPickup ? (
            <>
              <input
                type="text"
                placeholder="Número de vuelo"
                onChange={(e) => handlePickupDetails(e, "number")}
              />
              <input
                type="text"
                placeholder="Aerolinea"
                onChange={(e) => handlePickupDetails(e, "aero")}
              />
            </>
          ) : (
            <input
              type="text"
              placeholder="Descripción de punto de recogida"
              onChange={(e) => handlePickupDetails(e)}
            />
          )}
          {errors.pickupDetails && (
            <p className="text-red-700">
              {"Debes completar los detalles de recogida"}
            </p>
          )}
          <p>¿Algo más que quieras agregar?</p>
          <textarea
            name="description"
            id="description_booking"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit" onClick={(e) => handleSubmit(e, 1)}>
            Pagar
          </button>
        </form>
      </div>
      <div id="step-2" className={`${step !== 2 && "hidden"}`}>
        <p>Paga tu reserva con tarjeta de crédito/débito</p>
        <form className="flex flex-col gap-y-4">
          <input
            type="text"
            placeholder="Nombre del titular"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
          />
          {errors.cardholderName && (
            <p className="text-red-700">
              {"Debes completar el nombre del titular"}
            </p>
          )}
          <input
            type="text"
            placeholder="Número de tarjeta"
            value={cardNumber}
            onChange={(e) => {
              if (e.target.value.length <= 16) {
                setCardNumber(e.target.value);
              }
            }}
          />
          {errors.cardNumber && (
            <p className="text-red-700">
              {"Debes completar el número de tarjeta"}
            </p>
          )}
          <input
            type="text"
            placeholder="Fecha de expiración"
            value={expirationDate}
            onChange={(e) => {
              if (e.target.value.length <= 5) {
                setExpirationDate(e.target.value);
              }
            }}
          />
          {errors.expirationDate && (
            <p className="text-red-700">
              {"Debes completar la fecha de expiración"}
            </p>
          )}
          <input
            type="text"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => {
              if (e.target.value.length <= 3) {
                setCVC(e.target.value);
              }
            }}
          />
          {errors.cvc && (
            <p className="text-red-700">{"Debes completar el cvc"}</p>
          )}
          <button type="submit" onClick={(e) => handleSubmit(e, 2)}>
            Confirmar
          </button>
        </form>
      </div>
      <div
        id="step-3"
        className={`flex flex-col items-center gap-y-4 ${
          step !== 3 && "hidden"
        }`}
      >
        {!loading && Object.keys(bookingResponse).length == 0 && (
          <div>
            <p>Revisa tus datos antes de confirmar...</p>
            <div>
              <div>
                <BsGeoAlt />
                <p>{selectedTrip.pickupInformation?.from.description}</p>
              </div>
              <div>
                <BsGeoAlt />
                <p>{selectedTrip.pickupInformation?.to.description}</p>
              </div>
              <div>
                <FaRegCalendarCheck />
                <p>{selectedTrip.pickupInformation?.date}</p>
              </div>
              <div>
                <IoTimeOutline />
                <p>{selectedTrip.pickupInformation?.time}</p>
              </div>
            </div>
            <div>
              <p>Nombre: {fullName}</p>
              <p>Email: {email}</p>
              <p>Teléfono: {phone}</p>
              <p>Recogida: {pickupDetails}</p>
              <p>Descripción: {description}</p>
            </div>
            <button onClick={(e) => handleSubmit(e, 3)}>Confirmar</button>
          </div>
        )}
        {loading && <Spinner />}
        {Object.keys(bookingResponse).length > 0 && (
          <div>
            <p>¡Listo! Tu reserva ha sido confirmada</p>
            <button onClick={(e) =>{e.preventDefault();navigate('/home')}}>Volver al inicio</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
