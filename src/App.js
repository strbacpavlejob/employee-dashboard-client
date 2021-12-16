import { BrowserRouter, Route, Routes } from "react-router-dom";
import CurrentEmployee from "./pages/CurrentEmployees";
import DeletedEmployees from "./pages/DeletedEmployees";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<CurrentEmployee />} />
        <Route exact path="/deleted" element={<DeletedEmployees />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
