import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Practica from "./pages/Practica";
import PracticaNivel from "./pages/PracticaNivel";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/practica/:id" element={<Practica />} />
        <Route path="/practica-nivel" element={<PracticaNivel />} /> 
      </Route>
    </Routes>
  </BrowserRouter>
);
