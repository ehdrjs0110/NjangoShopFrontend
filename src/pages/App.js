import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import '../styles/App.css';

import Test from './Test/Test';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Test" element={<Test />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
