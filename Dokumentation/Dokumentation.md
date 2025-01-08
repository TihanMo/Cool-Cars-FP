# Kompetenznachweis – Projekt "Cool Cars"

**Name:** Dominik Hämmerle / Tihan Morrol 
**Datum:** 08.01.2025  

---

## Einleitung
Das Projekt **Cool Cars** ist eine Webanwendung, die es ermöglicht, eine Fahrzeugliste anzuzeigen, zu sortieren und zu paginieren. Ziel war es, die Prinzipien der funktionalen Programmierung im Kontext von **React** und **JavaScript** umzusetzen.

**Verwendete Technologien:**
- React (Next.js)
- JavaScript (ES6)
- Tailwind CSS
- Node.js (Backend)
- REST API

---

## Persönliche Kompetenzstufe
**Kompetenzstufe:** Fortgeschritten

**Begründung:**  
Ich habe die Prinzipien der funktionalen Programmierung (FP) wie **pure functions**, **immutable data** und **Higher Order Functions** (HOFs) angewendet. Beispielsweise verwende ich `map()`, `filter()` und `sort()` in der `page.js`-Datei, um Daten zu transformieren und zu sortieren.

---

## Umsetzung der Funktionalen Programmierung
### Pure Functions
In der `sortCars`-Funktion wird die Sortierung der Fahrzeuge ohne Seiteneffekte umgesetzt. Die ursprünglichen Daten bleiben unverändert.

```javascript
function sortCars(type, order) {
    const sortedCars = [...cars].sort((a, b) => {
      const comparison = a[type].localeCompare(b[type]);
      return order === 'asc' ? comparison : -comparison;
    });
    setCars(sortedCars);
}
```

**Erklärung:**  
- **Pure Function:** Keine Veränderung der `cars`-Liste.  
- **Immutable Data:** Durch `[...cars]` wird ein neues Array erstellt.

---

### Higher-Order Functions (HOFs)
Die Funktion `sortCars` verwendet `Array.prototype.sort()`, welches ein Beispiel für eine Higher-Order Function ist.

```javascript
const sortedCars = [...cars].sort((a, b) => a[type].localeCompare(b[type]));
```

**Warum HOF?**  
- `sort()` akzeptiert eine Callback-Funktion zur Bestimmung der Sortierreihenfolge.  
- Der Rückgabewert wird verwendet, um das Array neu zu ordnen.

---

### Immutability
**Datenveränderung vermeiden:**  
Die Verwendung des Spread-Operators `[...cars]` sorgt dafür, dass die Originaldaten erhalten bleiben.

---

### State Management mit `useState` (FP-Prinzipien)
```javascript
const [cars, setCars] = useState([]);
const [loading, setLoading] = useState(true);
```

Der `useState`-Hook verwendet ebenfalls ein **Immutable State Management**, bei dem der Zustand nur durch Aufrufe von `setCars()` verändert wird.

---

## Reflexion
**Herausforderungen:**  
- Das Verständnis von **pure functions** und deren korrekte Implementierung erforderte einige Versuche.  
- Der Unterschied zwischen **mutable** und **immutable** Daten war anfangs ungewohnt.  

**Lösung:**  
- Ich habe die Nutzung von Spread-Operatoren vertieft.  
- Die Konzepte wurden in der `sortCars`- und `paginate`-Funktion korrekt umgesetzt.

**Was ich gelernt habe:**  
- Funktionale Programmierung vermeidet Seiteneffekte und erhöht die Code-Qualität.  
- **Higher Order Functions** und **pure functions** helfen, den Code klarer und wartungsfreundlicher zu gestalten.

---

## Notengebung
**Selbsteinschätzung:** 9/10  
**Begründung:**  
Ich habe alle Anforderungen des Projekts erfüllt, funktionale Konzepte korrekt implementiert und den Code gut strukturiert. Verbesserungsbedarf sehe ich bei der erweiterten Nutzung von **Composition Functions**.

---

## Bewertungskriterien Checkliste
✅ Formale Anforderungen erfüllt  
✅ Pure Functions verwendet  
✅ Higher Order Functions implementiert  
✅ Immutable Data Structures angewendet  
✅ Sortierung, Paging, und Datenabfrage umgesetzt  
✅ Markdown-Dokumentation erstellt

---

**Ende des Kompetenznachweises**
