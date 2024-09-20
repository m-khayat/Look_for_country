import { useEffect, useState } from "react";
import "./Inputs.css";
export default function Inputs({
  search,
  setSearch,
  setIsLoading,
  setCountries,
  isDark,
}) {
  const [region, setRegion] = useState("");

  useEffect(
    function () {
      try {
        async function fetchCountryByRegion() {
          if (!region) return;
          setIsLoading(true);
          const res = await fetch(
            `https://restcountries.com/v3.1/region/${region}`
          );
          const data = await res.json();
          setCountries(data);
        }
        fetchCountryByRegion();
      } catch (error) {
        console.error("Error fetching region data:", error);
        setCountries([]);
      } finally {
        setIsLoading(false);
      }
    },
    [region, setIsLoading, setCountries]
  );
  return (
    <div className="inputs" data-theme={isDark ? "dark" : "white"}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="🔍 search for a country..."
      />

      <div className="selector">
        <label htmlFor="filter">Filter by Region </label>
        <select
          name="filter"
          id="filter"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="africa">Africa</option>
          <option value="americas">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
        </select>
      </div>
    </div>
  );
}
