import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import "./Details.css";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";

export default function Details({
  setIsLoading,
  setCountries,
  setErr,
  setIsErr,
  countries,
  isLoading,
  isDark,
}) {
  const navigate = useNavigate();
  const { name } = useParams();
  const [borderCountries, setBorderCountries] = useState([]); // State to hold full country names for borders

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSearchedCountry() {
      if (!name) return;
      try {
        // Clear the countries state before fetching new data
        setCountries([]);
        setIsLoading(true);

        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          if (res.status === 404) {
            setCountries([]);
            setErr("Country not found");
            setIsErr(true);
          } else {
            throw new Error("Failed to fetch data");
          }
        } else {
          const data = await res.json();
          setCountries(Array.isArray(data) ? data : []);
          setIsErr(false);

          // Fetch border country names if borders exist
          const borders = data[0]?.borders || [];
          if (borders.length > 0) {
            const borderPromises = borders.map(async (borderCode) => {
              const borderRes = await fetch(
                `https://restcountries.com/v3.1/alpha/${borderCode}`
              );
              const borderData = await borderRes.json();
              return borderData[0]?.name?.common;
            });
            const borderNames = await Promise.all(borderPromises);
            setBorderCountries(borderNames);
          } else {
            setBorderCountries(["None"]); // No borders
          }
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching country data:", err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchSearchedCountry();

    return () => {
      controller.abort();
    };
  }, [name]);

  // Early return if still loading
  if (isLoading) {
    return <Loader />;
  }

  // Handle case when countries data is not available or is an empty array
  if (!countries || countries.length === 0) {
    return (
      <>
        <Loader isDark={isDark} />
      </>
    );
  }

  // Assuming countries[0] is the country to display
  const country = countries[0];
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map(({ name }) => name)
        .join(", ")
    : "N/A";

  return (
    <div data-theme={isDark ? "dark" : "white"} className="detailsPage">
      <button className="btn" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <div className="container1">
        <img
          className="flagImg"
          src={country.flags.png}
          alt={`${country.name.common} flag`}
        />

        <div className="details">
          <h1>{country.name.common}</h1>
          <div className="supCountainer">
            <div className="left">
              <p>
                Population: <span> {country.population.toLocaleString()}</span>
              </p>
              <p>
                Region: <span> {country.region}</span>
              </p>
            </div>
            <div className="right">
              <p>
                Top Level Domain: <span> {country.tld[0]}</span>
              </p>
              <p>
                Language: <span> {languages}</span>
              </p>
            </div>
          </div>
          <div>
            <p>
              Currencies: <span> {currencies}</span>
            </p>
            <p>
              Capital: <span> {country.capital}</span>
            </p>
            <p>
              Border Countries:
              <span className="border-countries-container">
                {borderCountries.map((borderCountry, index) => (
                  <span key={index} className="border-country">
                    {borderCountry}
                  </span>
                ))}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
