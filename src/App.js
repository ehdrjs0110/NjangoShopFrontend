import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Demo from "./pages/Demo";
import PrivateRoute  from "./services/PrivateRoute";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  console.log("this is app");


  return (

    <div className="App">
      <Router>
        <Routes>

          <Route path="/Demo" element={<PrivateRoute component={<Demo />}/>}/>

        </Routes>
      </Router>
      
    </div>

  );
}


export default App;
