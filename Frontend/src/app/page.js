"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import './styles.css';

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState({ type: 'brand', order: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
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

  function sortCars(type) {
    let order = 'asc';
    if (sortOrder.type === type) {
      order = sortOrder.order === 'asc' ? 'desc' : 'asc';
    }
    const sortedCars = [...cars].sort((a, b) => {
      let comparison;
      if (type === 'horsePower') {
        comparison = a[type] - b[type];
      } else {
        comparison = a[type].localeCompare(b[type]);
      }
      return order === 'asc' ? comparison : -comparison;
    });
    setCars(sortedCars);
    setSortOrder({ type, order });
  }

  function handleFilterChange(event) {
    setFilter(event.target.value.trim().toLowerCase());
  }
  
  const filteredCars = cars.filter((car) => {
    return (
      car.brand.toLowerCase().includes(filter) ||
      car.model.toLowerCase().includes(filter)
    );
  });

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <main>
        <div className="filter-controls">
          <label>
            Filter:
            <input type="text" value={filter} onChange={handleFilterChange} placeholder="Filter by brand or model" />
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
                  <th onClick={() => sortCars('brand')} style={{cursor: 'pointer'}}>
                    Brand {sortOrder.type === 'brand' && (sortOrder.order === 'asc' ? '▲' : '▼')}
                  </th>
                  <th onClick={() => sortCars('model')} style={{cursor: 'pointer'}}>
                    Model {sortOrder.type === 'model' && (sortOrder.order === 'asc' ? '▲' : '▼')}
                  </th>
                  <th onClick={() => sortCars('horsePower')} style={{cursor: 'pointer'}}>
                    Horse Power {sortOrder.type === 'horsePower' && (sortOrder.order === 'asc' ? '▲' : '▼')}
                  </th>
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
              {Array.from({ length: Math.ceil(filteredCars.length / carsPerPage) }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  style={{ backgroundColor: currentPage === index + 1 ? '#0056b3' : '#007bff' }}
                >
                  {index + 1}
                </button>
              ))}
              <button className="arrow" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredCars.length / carsPerPage)}>
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