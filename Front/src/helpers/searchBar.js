
export function searchPlaces({data, term, setResults}) {
    // Convertir el término de búsqueda a minúsculas para hacer la búsqueda sin distinción entre mayúsculas y minúsculas
    console.log("data: ", data);
    console.log("term: ", term);
    console.log("setResults: ", setResults);
    const searchTerm = term.toLowerCase();
    console.log("searchTerm: ", searchTerm);
    // Filtrar los objetos que coincidan con el término de búsqueda en el nombre o la dirección
    const results = data.filter(item => {
        // Convertir el nombre y la dirección a minúsculas para hacer la comparación
        let itemName;
        let itemAddress;
        if(item.type === "ATLAS"){
            itemName = item.name.toLowerCase();
        itemAddress = item.address.toLowerCase();
        }
        if(item.type === "IATA"){
            itemName = item.content.description.toLowerCase();
            itemAddress = null;
        }
        if(itemName.includes(searchTerm))console.log("itemName: ", itemName);
        return itemName.includes(searchTerm) || (itemAddress && itemAddress.includes(searchTerm));
        // return itemName.includes(searchTerm) || itemAddress.includes(searchTerm);
    });
    console.log("results en  la funcionnn: ", results);
    
    setResults(results);
}

export const getAvailableTransfers = ({e,from,to,dateFrom,timeFrom,dateTo,timeTo,passengers,typeOfTrip, availableTransfers, setAvailableTransfers, URL,setLoading}) => {
    e.preventDefault();
    setLoading(true);
    let queryParameters = {
      from: `${from.type}/${from.code}`,
      to: `${to.type}/${to.code}`,
      dateFrom: `${dateFrom}T${timeFrom}`,
      dateTo: typeOfTrip === 0 ? undefined : `${dateTo}T${timeTo}`,
      adults: passengers.adults,
      children: passengers.children,
      babies: passengers.babies,
    };
    if (typeOfTrip === 0) {
        delete queryParameters.dateTo;
        fetch(
            `${URL}/search/availability/one_way?${new URLSearchParams(
            queryParameters
            )}`
        )
        .then((response) => response.json())
        .then((response) => {
          if(response.status == 'no content'){
            setLoading(false)
            setAvailableTransfers([])
          }else{
            setLoading(false)
            setAvailableTransfers(response.data)
          }
        })
    } else {
      fetch(
        `${URL}/search/availability/round_trip?${new URLSearchParams(
          queryParameters
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          setLoading(false)
          if(data.status == 'no content'){
            setAvailableTransfers([])
          }else{
            setAvailableTransfers(data);
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

export const checkData = ({ from, to, dateFrom, timeFrom, dateTo, timeTo, passengers, typeOfTrip, setErrors }) => {
    let validateFrom = Object.keys(from).length === 0;
    let validateTo = Object.keys(to).length === 0;
    let validateDateFrom = dateFrom.length == 0;
    let validateTimeFrom = timeFrom.length == 0;
    let validateDateTo = false;
    let validateTimeTo = false;
    if (typeOfTrip === 1) {
      validateDateTo = dateTo.length > 0;
      validateTimeTo = timeTo.length > 0;
    }
    //if no errors set the properties in false
    setErrors({
      from: validateFrom,
      to: validateTo,
      dateFrom: validateDateFrom,
      timeFrom: validateTimeFrom,
      dateTo: validateDateTo,
      timeTo: validateTimeTo,
    });
  };


export const handleDate = (date, origin, setToOrigin, setErrors, errors, dateFrom) => {
  if(date == '')return;
  if(origin === "from"){
    setToOrigin(date);
    if(!date){
      console.log('entra a cargar error en date')
      setErrors({...errors, dateFrom: true})
    }
  }else{
    setToOrigin(date);
    if(!date){
      setErrors({...errors, dateTo: true})
    }
}
};

export const handleTime = (time, origin, setToOrigin, setErrors, errors, timeFrom) => {
  if(time == '')return;
      //round time always to half hour if it is not, for exaple 12:15 to 12:00
      let timeArr = time.split(':');
      let minutes = timeArr[1];
      let hours = timeArr[0];
      if(minutes > 30){
        timeArr[1] = '30';
      }
      else{
        timeArr[1] = '00';
      }
      time = timeArr.join(':');
  if(origin === "from"){
    setToOrigin(time);
    console.log(time)
    if(!time){
      setErrors({...errors, timeFrom: true})
    }
  }
  else{
    setToOrigin(time);
    console.log(time)
    console.log(timeFrom)
    if(!time){
      setErrors({...errors, timeTo: true})
    }
  }
};



    // "search": {
  //   "language": "en",
  //   "departure": {
  //     "date": "2024-03-02",
  //     "time": "12:15:00"
  //   },
  //   "comeBack": {
  //     "date": "-999999999-01-01",
  //     "time": "00:00:00"
  //   },
  //   "occupancy": {
  //     "adults": 2,
  //     "children": 0,
  //     "infants": 0
  //   },
  //   "from": {
  //     "code": "265",
  //     "description": "HM Jaime III",
  //     "type": "ATLAS"
  //   },
  //   "to": {
  //     "code": "PMI",
  //     "description": "TEST - Majorca - Palma Airport",
  //     "type": "IATA"
  //   }
  // },