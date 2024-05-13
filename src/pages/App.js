import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import '../styles/App.css';
import jjangu from '../assets/jjangu.jpg';

import Sign from './Sign/Sign';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Sign" element={<Sign />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
