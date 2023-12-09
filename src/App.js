import Menu from "./Templates/Menu";
import Pagina404 from "./paginas/Pagina404";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TelaCadTelefone from "./telas/TelaCadTelefone";
import TelaCadhospede from "./telas/TelaCadHospede ";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Menu/>} />
          <Route path="/cadastroHospede" element={<TelaCadhospede/>} />
          <Route path="/cadastroTelefone" element={<TelaCadTelefone/>} />
          <Route path="*" element={<Pagina404/>} />    
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

//AtividadeFinal