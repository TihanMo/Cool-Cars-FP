"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./styles.css";

export default function CarForm() {
  const [car, setCar] = useState({
    brand: "",
    model: "",
    horsePower: "",
  });

  const router = useRouter();

  function handleChange(e) {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!car.brand || !car.model || !car.horsePower) {
      alert("Please fill in all fields!");
      return;
    }

    if (parseInt(car.horsePower, 10) <= 0) {
      alert("Horse power must be a positive number.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...car,
          horsePower: parseInt(car.horsePower, 10),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response text:", errorText);
        throw new Error(`Failed to add car. Server response: ${errorText}`);
      }

      alert("Car added successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      alert(`An error occurred while adding the car: ${error.message}`);
    }
  }

  return (
    <div className="carFormContainer">
      <h1 className="carFormTitle">Add a New Car</h1>
      <form onSubmit={handleSubmit} className="carForm">
        <label>
          Brand:
          <input
            name="brand"
            value={car.brand}
            onChange={handleChange}
            required
            className="carFormInput"
          />
        </label>
        <label>
          Model:
          <input
            name="model"
            value={car.model}
            onChange={handleChange}
            required
            className="carFormInput"
          />
        </label>
        <label>
          Horse Power:
          <input
            name="horsePower"
            type="number"
            value={car.horsePower}
            onChange={handleChange}
            required
            className="carFormInput"
          />
        </label>
        <button type="submit" className="carFormButton">
          Add Car
        </button>
      </form>
      <Link href="/">
        <button className="carFormBackButton">
          Back
        </button>
      </Link>
    </div>
  );
}