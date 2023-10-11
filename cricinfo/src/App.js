import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import ThemeContext from "../src/utils/ThemeContext";

function App() {
  const [theme, setTheme] = useState(false);
  const toggleTheme = () => {
    setTheme((previousValue) => !previousValue);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Header />
      <Outlet />
      <Footer />
    </ThemeContext.Provider>
  );
}

export default App;
