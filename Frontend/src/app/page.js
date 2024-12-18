"use client"

import {useState} from "react";
import Link from "next/link";


export default function Home() {
  const [cars, setCars] = useState([])

  function buttonHandler() {
    if (cars.length === 0) {
      fetch("http://localhost:8080/cars")
        .then(response => response.json())
        .then(data => setCars(data))
        .catch(error => console.error("Error fetching cars:", error));
    }
  }
  

  return (
    <div className="App">
      <h1>My Frontend - The very beginning</h1>
        <button onClick={buttonHandler}>load cars</button>
        <br/>
        <ul>
          { cars.map(car =>
            <li key={car.id}>
                {car.brand + " " + car.model + " (" + car.horsePower + ")"}
            </li>
          )}
        </ul>
        <Link href="/carform">
          <button>Add a new car</button>
        </Link>

    </div>
  )
}
