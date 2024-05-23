import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Sign from './pages/Sign/Sign';
import SignIn from './pages/Sign/SignIn';
import SignUp from './pages/Sign/SignUp';
import Main from './pages/Main/Main';
import Promotion from './pages/Promotion/Promotion';
import Logout from "./pages/Logout/Logout";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Sign" element={<Sign />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/Promotion" element={<Promotion />} />
          <Route path="/Logout" element={<Logout/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
