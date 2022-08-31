import './App.css';
import { Route, Routes } from "react-router-dom";
import Create from "./components/Create/Create";
import Details from "./components/Details/Details";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/details/:id" element={<Details/>} />
        <Route path="/create" element={<Create/>} />
      </Routes>
    </div>
  );
}

export default App;
