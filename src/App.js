import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import Details from "./Pages/Details";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import { useLocalStorage } from "@uidotdev/usehooks";
function App() {
  const [countries, setCountries] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [isDark, setIsDark] = useLocalStorage("isDark", false);

  useEffect(() => {
    document.body.setAttribute("data-theme", isDark ? "dark" : "white");
  }, [isDark]);

  return (
    <>
      <Header setIsDark={setIsDark} isDark={isDark} />
      <BrowserRouter basename="/Look_for_country">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                countries={countries}
                setCountries={setCountries}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                err={err}
                setErr={setErr}
                isErr={isErr}
                setIsErr={setIsErr}
                isDark={isDark}
              />
            }
          />
          <Route
            path="/country/:name"
            element={
              <Details
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                setCountries={setCountries}
                countries={countries}
                setErr={setErr}
                setIsErr={setIsErr}
                isDark={isDark}
              />
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
