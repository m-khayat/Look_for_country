import "./Header.css";
export default function Header({ setIsDark, isDark }) {
  function handleChangeThime() {
    setIsDark(!isDark);
  }
  return (
    <nav data-theme={isDark ? "dark" : "white"}>
      <p>Where in the world?</p>
      <button onClick={handleChangeThime}>
        {isDark ? "🌙 Dark Mode" : "🌞 White Mode"}
      </button>
    </nav>
  );
}
