// App.js

import React, { useEffect } from 'react';
import ARScene from './ARScene';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Home';
import Uploadfiles from './Uploadfiles';


const App = () => {
 
  return (  
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/ar' element={<ARScene />}></Route>
        <Route path='/uploadfiles' element={<Uploadfiles />}></Route>
      </Routes>
    </BrowserRouter>
       
    </>
     
  );
};

export default App;
