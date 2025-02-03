import React, { useEffect, useState } from "react";
import { getturf } from "./Apiservice";
import './Turf.css'
import { Link } from 'react-router-dom'


const Turf = () => {
    const [turf, setTurf] = useState([])
    useEffect(() => {
        getturf()
            .then(res => {
                console.log("Response from api", res)
                setTurf(res)
            })
    }, [])

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">AVAILABLE TURFS</h1>
            <div className="row">
                {turf.map((item, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        {console.log("Turf ID:", item.id)}
                        <Link to={`/booking/${item.id}`} className="text-decoration-none">
                            <div className="card h-100">
                                <img
                                    src={item.image}
                                    alt={item.turf_name}
                                    className="card-img-top"
                                    style={{ height: "200px", objectFit: "cover" }}></img>
                                <div className="card-body">
                                    <h5 className="card-title">{item.turf_name}</h5>
                                    <p className="card-text">City:{item.city}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    );


};
export default Turf;