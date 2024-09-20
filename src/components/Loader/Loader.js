import React from "react";
import "./Loader.css";
export default function Loader({ isDark }) {
  return (
    <div className="LoaderPage">
      <div class="loader" data-theme={isDark ? "dark" : "white"}></div>;
    </div>
  );
}
