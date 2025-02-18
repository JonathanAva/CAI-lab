import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Outlet /> {/* Aquí se renderizan las rutas */}
    </div>
  );
}

export default App;
