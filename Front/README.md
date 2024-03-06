# Api body to confirm POST
      {
      	"language": "en",
          "holder": {
              "name": "John",
              "surname": "Doe",
              "email": "john.doe@hotelbeds.com",
              "phone": "+16543245812"
          },
          "transfers": [
              {
                  "rateKey": "ARRIVAL|IATA|BCN|ATLAS|398692|2024-01-11|15:25|2024-01-11|15:25|2~0~0||99|||||102|SHRD||SH|STND|20.01||||39|398692|SIMPLE|173a9268801b66cdac4a1bbe6430b137|1269799|T|1b3814dfc98b4495220e3ecb1ff1ee6f",
                  "transferDetails": [
                  	{
                  		"type": "FLIGHT",
                  		"direction": "ARRIVAL",
                  		"code": "XR1234",
                  		"companyName": "null"
                  	}
              	]
              }
          ],

          "clientReference": "BOSTON#12-203#456754",
          "welcomeMessage": "Welcome Mr. John Doe",
          "remark": "Booking remarks go here."
      }