import React from "react";
import "./CountryItem.css";
import { Link } from "react-router-dom";
export default function CountryItem({ country, isDark }) {
  return (
    <Link
      to={`/country/${country.name.common}`}
      className="country"
      data-theme={isDark ? "dark" : "white"}
    >
      <img src={country.flags.png} alt="flag" />
      <div className="inf">
        <h5>{country.name.common}</h5>
        <h6>
          population:<span> {country.population}</span>
        </h6>
        <h6>
          region: <span> {country.region}</span>
        </h6>
        <h6>
          capital: <span> {country.capital} </span>
        </h6>
      </div>
    </Link>
  );
}
