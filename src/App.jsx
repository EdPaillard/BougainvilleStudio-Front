import { Routes, Route } from "react-router-dom";

import Home from './Components/Home/Home'
import Banner from './Components/Banner/Banner';
import Fragments from "./Components/Fragments/Fragments";
import Fragment from "./Components/Fragment/Fragment";

import './App.css';

function App() {
  return (
    <div className="App">
      <Banner />
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/fragments" element={<Fragments />}/>
        <Route exact path="/fragment/:id" element={<Fragment/>} />
      </Routes>
    </div>
  );
}

export default App;
