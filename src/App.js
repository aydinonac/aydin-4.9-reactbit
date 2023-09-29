import { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Items from './Items';
import Categories from './Categories';

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

