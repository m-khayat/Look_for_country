import React from "react";
import CountryItem from "./CountryItem/CountryItem";
import "./CountryList.css";
export default function CountryList({ countries, isDark }) {
  return (
    <div className="container" data-theme={isDark ? "dark" : "white"}>
      {countries.map((country) => (
        <CountryItem
          country={country}
          key={country.name.common}
          isDark={isDark}
        />
      ))}
    </div>
  );
}
