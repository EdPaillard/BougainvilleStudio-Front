import { Routes, Route } from "react-router-dom";

import Home from "./home/home";
import Banner from "./banner/Banner";
import FragmentsUI from "./fragments/fragmentsUI";
import FragmentUI from "./fragment/fragmentUI";
import BottomNavBar from "./bottomNavBar/BottomNavBar";
import UserProvider from "./contexts/userContext";
import Login from "./login/login";

import ProfilPage from "./profil/profil";
import UserModify from "./profil/modify/modify";
import AdminPanel from "./admin/adminPanel";
import './App.css';
import Register from "./register/register";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Banner/>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/fragments" element={<FragmentsUI />}/>
          <Route exact path="/fragment/:fragID" element={<FragmentUI/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/profil/:id" element={<ProfilPage/>} />
          <Route exact path="/profil/:id/modify" element={<UserModify/>} />
          <Route exact path="/admin" element={<AdminPanel/>} />
          <Route exact path='/register' element={<Register/>} />
        </Routes>
        <BottomNavBar/>
      </UserProvider>
    </div>
  );
}

export default App;
