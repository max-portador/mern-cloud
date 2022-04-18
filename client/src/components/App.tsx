import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import './App.css'
import Registration from "./Authorization/Registaration";
import Login from "./Authorization/Login";
import {useTypedSelector} from "../hooks/useTypedDispatch";
import {useDispatch} from "react-redux";
import {auth} from "../actions/user";

function App() {
  const  { isAuth }  = useTypedSelector(state => state.user)
  const dispatch = useDispatch<any>()

  useEffect(() => {
      dispatch(auth())
  }, [])


  return (
      <BrowserRouter>
          <div className="App">
              <Navbar/>
              {!isAuth &&
                  <Routes>
                      <Route path='/registration' element={<Registration/>}/>
                      <Route path='/login' element={<Login />}/>
                  </Routes>
              }
          </div>
      </BrowserRouter>

  );
}

export default App;
