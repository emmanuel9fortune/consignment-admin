import React, { useState } from "react";

export default function CountrySearch({ data, onSelect }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value === "") {
      setFiltered([]);
      return;
    }

    // Filter unique countries that match the query
    const countries = [...new Set(
      data
        .filter(item => item.country.toLowerCase().includes(value.toLowerCase()))
        .map(item => item)
    )];

    setFiltered(countries);    
  };

  
  const handleSelect = (country) => {
    setQuery(country);
    setFiltered([]);
    if (onSelect) onSelect(country);
  };

  

  return (
    <div style={{ position: "relative", width: "300px" }}>
      <input
        type="text"
        value={query.country}
        onChange={handleChange}
        placeholder="Search country..."
        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
      />

      {filtered.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            border: "1px solid #ccc",
            maxHeight: "200px",
            overflowY: "auto",
            backgroundColor: "white",
            margin: 0,
            padding: 0,
            listStyle: "none",
            zIndex: 1000,
          }}
        >
          {filtered.map((country, index) => (
            country?.coordinates &&
            <li
              key={index}
              onClick={() => handleSelect(country)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {country.country}-{country.type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
