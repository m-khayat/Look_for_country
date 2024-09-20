import React from "react";
import "./Error.css";
export default function Error({ err }) {
  return <p className="error">⛔{err}⛔</p>;
}
