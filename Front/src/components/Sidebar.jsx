import { useState } from "react";

const Sidebar = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleVehicleTypeChange = (e) => {
    setVehicleType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform search based on location, date, and vehicle type
    // You can make an API call here or handle the search logic as per your requirements
    console.log("Search submitted:", location, date, vehicleType);
  };

  return (
    <div className="h-full">
      <form
        onSubmit={handleSubmit}
        className="justify-center flex sm:flex-col items-center gap-x-2"
      >
        <label>
          Country:
          <input type="text" value={location} onChange={handleLocationChange} />
        </label>
        <br />
        <label>
          Date:
          <input type="date" value={date} onChange={handleDateChange} />
        </label>
        <br />
        <label>
          Vehicle Type:
          <select value={vehicleType} onChange={handleVehicleTypeChange}>
            <option value="">Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="van">Van</option>
          </select>
        </label>
        <br />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Sidebar;
