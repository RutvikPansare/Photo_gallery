import React from "react";
import './util/App.css';
import {Images} from './Images';
import {  
  BrowserRouter as Router,  
  Routes,  
  Route,   
}   
from 'react-router-dom'; 
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Images/>} />
        </Routes>
      </Router>
  );
}

export default App;
