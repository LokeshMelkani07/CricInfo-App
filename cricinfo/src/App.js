import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <div>
      <Header theme={theme} setTheme={setTheme} />
      <Outlet theme={theme} />
      <Footer theme={theme} />
    </div>
  );
}

export default App;
