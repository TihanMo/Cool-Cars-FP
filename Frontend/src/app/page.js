"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import './styles.css';

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState({ type: 'brand', order: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;

  useEffect(() => {
    fetch("http://localhost:8080/cars")
      .then(response => response.json())
      .then(data => {
        setCars(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching cars:", error);
        setLoading(false);
      });
  }, []);

  function sortCars(type, order) {
    const sortedCars = [...cars].sort((a, b) => {
      const comparison = a[type].localeCompare(b[type]);
      return order === 'asc' ? comparison : -comparison;
    });
    setCars(sortedCars);
  }

  function handleSortChange(event) {
    const { name, value } = event.target;
    const newSortOrder = { ...sortOrder, [name]: value };
    setSortOrder(newSortOrder);
    sortCars(newSortOrder.type, newSortOrder.order);
  }

  // Calculate the cars to display on the current page
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <main>
        <div className="sort-controls">
          <label>
            Sort by:
            <select name="type" value={sortOrder.type} onChange={handleSortChange}>
              <option value="brand">Brand</option>
              <option value="model">Model</option>
            </select>
          </label>
          <label>
            Order:
            <select name="order" value={sortOrder.order} onChange={handleSortChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>
        <br/>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Horse Power</th>
                </tr>
              </thead>
              <tbody>
                {currentCars.map(car => (
                  <tr key={car.id}>
                    <td>{car.brand}</td>
                    <td>{car.model}</td>
                    <td>{car.horsePower}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button className="arrow" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                &larr;
              </button>
              {Array.from({ length: Math.ceil(cars.length / carsPerPage) }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  style={{ backgroundColor: currentPage === index + 1 ? '#0056b3' : '#007bff' }}
                >
                  {index + 1}
                </button>
              ))}
              <button className="arrow" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(cars.length / carsPerPage)}>
                &rarr;
              </button>
            </div>
          </div>
        )}
        <Link href="/carform">
          <button>Add a new car</button>
        </Link>
      </main>
    </div>
  );
}