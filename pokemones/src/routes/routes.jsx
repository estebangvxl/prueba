import React from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from '../pages/home/Home';
import PokemonDetails from '../pages/pokemon-details/pokemonDetails';


const RoutesApp = () => {
  

    return (
        <HashRouter>
          <Routes>
            <Route path='pokemons' element={<Home />} />
            <Route path='pokemon_details/:name' element={<PokemonDetails />} />
          </Routes>
        </HashRouter>
    );
}

export default RoutesApp;
