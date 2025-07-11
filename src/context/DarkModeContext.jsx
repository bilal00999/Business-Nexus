import { useEffect, useState } from "react";

const ToggleDarkMode = () => {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 text-sm border rounded mt-2"
    >
      {dark ? "🌙 Dark On" : "☀️ Light On"}
    </button>
  );
};

export default ToggleDarkMode;
