"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

  function handleSubmit(e) {
    e.preventDefault();

    if (!car.brand || !car.model || !car.horsePower) {
      alert("Please fill in all fields!");
      return;
    }

    fetch("http://localhost:8080/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...car,
        horsePower: parseInt(car.horsePower, 10),
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Car added successfully!");
          router.push("/");
        } else {
          throw new Error("Failed to add car");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while adding the car.");
      });
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Add a New Car</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>
          Brand:
          <input
            name="brand"
            value={car.brand}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "5px", margin: "5px 0" }}
          />
        </label>
        <label>
          Model:
          <input
            name="model"
            value={car.model}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "5px", margin: "5px 0" }}
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
            style={{ width: "100%", padding: "5px", margin: "5px 0" }}
          />
        </label>
        <button type="submit" style={{ padding: "10px", backgroundColor: "#0070f3", color: "#fff", border: "none", cursor: "pointer" }}>
          Add Car
        </button>
      </form>
    </div>
  );
}
