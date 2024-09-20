import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Inputs from "../components/inputs/Inputs";
import CountryList from "../components/CountryList/CountryList";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import "./Home.css";
export default function Home({
  countries,
  setCountries,
  isLoading,
  setIsLoading,
  err,
  setErr,
  isErr,
  setIsErr,
  isDark,
}) {
  const [search, setSearch] = useState([]);
  useEffect(
    function () {
      try {
        async function fetchCountry() {
          setIsLoading(true);
          const res = await fetch("https://restcountries.com/v3.1/all");
          const data = await res.json();
          setCountries(data);
          setIsErr(false);
        }

        fetchCountry();
      } catch {
        setErr("sonthing went wrong check your internet coniction");
        setIsErr(true);
      } finally {
        setIsLoading(false);
      }
    },
    [search]
  );

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSearchedCountry() {
      if (!search) return;
      if (search.length < 4) return;
      try {
        setIsLoading(true);

        const res = await fetch(
          `https://restcountries.com/v3.1/name/${search.toLowerCase()}`,
          { signal: controller.signal }
        );

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
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.Error("Error fetching country data:", err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchSearchedCountry();

    return () => {
      controller.abort();
    };
  }, [search]);
  return (
    <div data-theme={isDark ? "dark" : "white"} className="appBody">
      <Inputs
        search={search}
        setSearch={setSearch}
        setCountries={setCountries}
        setIsLoading={setIsLoading}
        isDark={isDark}
      />
      {isLoading ? (
        <Loader isDark={isDark} />
      ) : isErr ? (
        <Error err={err} />
      ) : (
        <CountryList countries={countries} isDark={isDark} />
      )}
    </div>
  );
}
