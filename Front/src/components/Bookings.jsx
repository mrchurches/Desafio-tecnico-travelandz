import React from "react";
import { useSelector } from "react-redux";

const Bookings = () => {
    const user = useSelector((state) => state.myReducer.user);

    return(
        <div className="flex flex-col items-center">
            <h1>Bookings</h1>
            {
                user.confirmations.map((confirmation) => {
                    return (
                        <div key={confirmation.reference} className="flex flex-col items-center">
                            <h3>Trayecto</h3>
                            {confirmation.transfers.map(({pickupInformation})=>{
                                return(
                                    <div key={pickupInformation.rateKey}>
                                        <div>{`Desde ${pickupInformation.from.description},(${pickupInformation.pickup.address},${pickupInformation.pickup.town}) hacia ${pickupInformation.to.description}`}</div>
                                        <p>{pickupInformation.date}</p>
                                        <p>{pickupInformation.time}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Bookings;