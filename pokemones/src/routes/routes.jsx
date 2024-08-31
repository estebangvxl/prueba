import React from 'react';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from '../pages/home/Home';
import PokemonDetails, { loader} from '../pages/pokemon-details/pokemonDetails';


const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "pokemon_details/:name",
      element: <PokemonDetails />,
      loader: loader
    },
  ]);

    return (
        <RouterProvider router={router} />
    );
}

export default Routes;
