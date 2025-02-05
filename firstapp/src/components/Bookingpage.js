import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTurfDetails, checkAvailable, bookTurf } from "./Apiservice";
import './Bookingpage.css';

const Bookingpage = () => {
  const { turfId } = useParams();
  console.log("Extracted turfId:", turfId);
  const [turf, setTurf] = useState(null);
  const [availableSlots, setAvailableSlots] = useState(0);
  const [userName, setUserName] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [error, setError] = useState("");

  const timings = [
    "6am - 8am", "8am - 10am", "10am - 12pm", "12pm - 2pm",
    "2pm - 4pm", "4pm - 6pm", "6pm - 8pm", "8pm - 10pm"
  ];

  useEffect(() => {
    if (!turfId) {
      console.error("Turf id is Undefined");
      return;
    }
    const fetchTurfData = async () => {
      try {
        const turfDetails = await getTurfDetails(turfId);
        setTurf(turfDetails);
  
        const availability = await checkAvailable(turfId);
        setAvailableSlots(availability.availableSlots);
        setBookedSlots(availability.bookedSlots || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
  
    fetchTurfData();
  }, [turfId]);

  const handleBooking = () => {
    const token = localStorage.getItem("access_token");
    if(!token){
      setError("You must be logged in");
      return;
    }
    if (!userName || !selectedTime) {
      setError("Please enter your name and select a time slot.");
      return;
    }
    if (availableSlots <= 0) {
      setError("No available slots for this turf.");
      return;
    }
    if (bookedSlots.includes(selectedTime)) {
      setError("This time slot is already booked.");
      return;
    }

    bookTurf(turfId, userName, selectedTime,token)
      .then(() => {
        alert("Booking Successful");
        setAvailableSlots((prev) => prev - 1);
        setBookedSlots((prev) => [...prev, selectedTime]);
        console.log("Turf ID:", turfId);

      })
      .catch(() => setError("Booking failed. Please try again."));
  };

  return (
    <div className="container mt-5">
      {turf && (
        <div className="card border-0">
          <div className="row g-0">
            <div className="col-md-6 p-4">
              <h1 className="display-5 text-primary">{turf.turf_name}</h1>
              <div className="info-group">
              <p className="text-muted mb-1 city"><strong>City:</strong> {turf.city}</p>
              <p className="text-muted mb-1 price"><strong>Price:</strong> ₹{turf.price}</p>
              <p className="text-muted mb-3 slots">
                <strong>Available Slots:</strong> {availableSlots}
              </p>
              </div>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="form-control mb-3"
              />
              <select
                className="form-select mb-3"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Select Timing</option>
                {timings.map((time) => (
                  <option
                    key={time}
                    value={time}
                    disabled={bookedSlots.includes(time)}
                    style={{
                      color: bookedSlots.includes(time) ? "red" : "black",
                    }}
                  >
                    {time}
                  </option>
                ))}
              </select>
              <button
                onClick={handleBooking}
                className="btn btn-primary w-100 booking"
              >
                Book Now
              </button>
              {error && <p className="text-danger mt-3">{error}</p>}
            </div>
            <div className="col-md-6">
              <img
                src={turf.image}
                alt={turf.turf_name}
                className="img-fluid rounded-end"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookingpage;
