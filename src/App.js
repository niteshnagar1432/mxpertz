import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Page_2 from "./pages/Page_2";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/item/:id" element={<Page_2 />} />
    </Routes>
  );
}

export default App;
