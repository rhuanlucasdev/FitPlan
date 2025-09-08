import "./App.css";
import DietTable from "./components/Dieta";
import Hero from "./components/hero";
import TreinoTable from "./components/Treino"; // importa a página de treinos
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/treino" element={<TreinoTable />} />
          <Route path="/dieta" element={<DietTable />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
