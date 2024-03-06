const express = require("express");
const headers = require("../headersHelper");
const { db } = require("../../firebase");
const { updateDoc, collection, query, getDocs, where } = require("firebase/firestore");
const router = express.Router();

// {
// 	"language": "en",
//     "holder": {
//         "name": "John",
//         "surname": "Doe",
//         "email": "john.doe@hotelbeds.com",
//         "phone": "+16543245812"
//     },
//     "transfers": [
//         {
//             "rateKey": "ARRIVAL|IATA|BCN|ATLAS|398692|2024-01-11|15:25|2024-01-11|15:25|2~0~0||99|||||102|SHRD||SH|STND|20.01||||39|398692|SIMPLE|173a9268801b66cdac4a1bbe6430b137|1269799|T|1b3814dfc98b4495220e3ecb1ff1ee6f",
//             "transferDetails": [
//             	{
//             		"type": "FLIGHT",
//             		"direction": "ARRIVAL",
//             		"code": "XR1234",
//             		"companyName": "null"
//             	}
//         	]
//         }
//     ],

//     "clientReference": "BOSTON#12-203#456754",
//     "welcomeMessage": "Welcome Mr. John Doe",
//     "remark": "Booking remarks go here."
// }

router.post("/", async (req, res) => {
    const userUid = req.query.uid;
    const url = "https://api.test.hotelbeds.com/transfer-api/1.0/booking/";
  
    try {
      const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(req.body),
      };
      const response = await fetch(url, options);
      let data = await response.json();
      data = data.bookings[0];
      console.log('-'*100)
      console.log('body:', req.body);
      console.log('data de la api',data)
      console.log('-'*100)
      const usersDataRef = collection(db, "users_data");
      const q = query(usersDataRef, where("uid", "==", userUid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        updateDoc(querySnapshot.docs[0].ref, { // Aquí actualizamos el documento directamente usando la referencia del documento
          confirmations: [...userData.confirmations, data], // Accedemos a la propiedad 'bookings' directamente, no necesitas llamar a .data() nuevamente
        });
        res.send({ response: "ok", data });
      } else {
        res.send({ response: "error", data });
      }
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  });

  

module.exports = router;
