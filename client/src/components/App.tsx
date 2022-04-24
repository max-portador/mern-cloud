import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import './App.css'
import Registration from "./Authorization/Registaration";
import Login from "./Authorization/Login";
import {useTypedSelector} from "../hooks/useTypedDispatch";
import {useDispatch} from "react-redux";
import { userAPI } from "../api/api";
import {AppDispatch} from "../redux";
import Disk from "./Disk/Disk";
import Profile from "./Profile/Profile";

function App() {
  const  { isAuth }  = useTypedSelector(state => state.user)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
      dispatch(userAPI.auth())
  }, [])

  return (
      <BrowserRouter>
          <div className="App">
              <Navbar/>
              {!isAuth ?
                  <Routes>
                      <Route path='/registration' element={<Registration/>}/>
                      <Route path='/login' element={<Login />}/>
                      <Route path="*" element={<Navigate to="/login" />}/>
                  </Routes>
                  :
                  <Routes>
                      <Route path='/disk' element={<Disk/>}/>
                      <Route path='/profile' element={<Profile/>} />
                      <Route path="*" element={<Navigate to="/disk" />}/>
                  </Routes>
              }
          </div>
      </BrowserRouter>

  );
}

export default App;
