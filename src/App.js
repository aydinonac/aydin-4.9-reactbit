import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Items from './Items';
import Categories from './Categories';

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        {/* need to change route path for categories to /categories*/}
        {/* <Route path='/' element={<Register_Login />} />  */}
        <Route path='/' element={<Categories />} />
        <Route path='/items' element={<Items />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;