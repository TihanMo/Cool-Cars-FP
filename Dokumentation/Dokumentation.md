# Cool-Cars Projekt

## Zielsetzung
**Aufgabe**: Umsetzung der Anforderungen des Projekts Cool-Cars mit Fokus auf die Prinzipien der funktionalen Programmierung. Ziel ist es, eine benutzerfreundliche Anwendung zu erstellen und den Kompetenznachweis zu erbringen.

## Ausgangslage
Die Anwendung besteht aus:
- **Spring Boot Backend**: API zur Bereitstellung der Autodaten.
- **Next.js Frontend**: Anzeige und Verwaltung der Daten.

## Backend
- **Entity**:
  ```java
  public class Car {
      private int id;
      private String brand;
      private String model;
      private int horsePower;
  }
  ```
- **Controller**:
  ```java
  @GetMapping("/cars")
  public List<Car> getCars() {
      return carRepository.findAll();
  }
  ```
- **Repository**:
  ```java
  public interface CarRepository extends CrudRepository<Car, Integer> {}
  ```

## Frontend
- **Datenabruf und Anzeige**:
  ```javascript
  const [cars, setCars] = useState([]);

  function loadCars() {
    if (cars.length === 0) {
      fetch("http://localhost:8080/cars")
        .then(res => res.json())
        .then(setCars);
    }
  }

  {cars.map(car => (
    <li key={car.id}>{car.brand} {car.model} ({car.horsePower})</li>
  ))}
  ```

## Kompetenznachweis
Die bisherigen Arbeiten erfüllen folgende Kompetenzen:
1. **AG1 AE1**: Anwendung von Funktionen zur Verarbeitung und Anzeige von Daten.
2. **Pure Functions**: Die Funktion `loadCars` hat keinen Seiteneffekt und lädt Daten nur einmal.
3. **Immutable Values**: Die Daten werden nach dem Abrufen nur einmal im State gespeichert und nicht verändert.

## Aktueller Stand
- **Backend** liefert die Autodaten erfolgreich.
- **Frontend** zeigt die Autos in einer Liste an.
- **Problem gelöst**: Mehrfaches Laden der Autos verhindert.

## Nächste Schritte
1. **Sortierfunktion**: Autos nach `horsePower` sortieren (auf-/absteigend).
2. **Suchfunktion**: Filterung der Autos nach Marke/Modell.
3. **Paging**: Aufteilung der Autoliste in kleinere Seiten.

---
**Fokus**: Die nächsten Schritte beinhalten die Erweiterung des Frontends unter Anwendung der Konzepte der funktionalen Programmierung wie Higher-Order Functions und Immutable Data.
