import React from 'react'
import './index.css'
import {Routes , Route, BrowserRouter, Link } from "react-router-dom" 
import PokemonInfo1 from './PokemonInfo1';
import PokemonInfo2 from './PokemonInfo2';
import { Button , Box } from 'grommet';

const App = () => {
  return (
    <Box align="center" justify="center">
      <BrowserRouter>
      <Box direction='row'>
      <Link  to='/Rood'>
        <Button 
        label="Rood"
        pad="medium"
        margin="medium"
        />
      </Link>
      <Link to='/Blauw'>
        <Button
         label="Blauw"
         pad="medium"
         margin="medium"
        />
      </Link>
      </Box>
      <Routes> 
            <Route path="/" element={<PokemonInfo1/> } /> 
            <Route path="/Rood" element={<PokemonInfo1/> } /> 
            <Route path="/Blauw" element={<PokemonInfo2/> } /> 
       </Routes> 
      </BrowserRouter>


    </Box>
  );
};

export default App;
