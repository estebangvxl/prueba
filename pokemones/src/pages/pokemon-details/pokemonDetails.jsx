import React, { useEffect, useState } from 'react';
import {useLoaderData } from "react-router-dom";
import { getPokemonByName } from '../../services/Pokemons';
import { getObjectPokemon } from '../../utils/utils';
import "./pokemon_details.css";

export async function loader({ params }) {
    const pokemon = await getPokemonByName(params.name);
    return getObjectPokemon(pokemon);
  }

const PokemonDetails = () => {


    const pokemon = useLoaderData();
    console.log(pokemon)

    return (
        <section class="page__pokemon_details">
            <img src={pokemon.image} alt="" />
            <ul className='list_details'>
                <li className='name'> Name: {pokemon.name}</li>
                <li>
                    abilities: {pokemon.abilities.map((ability)=> <div className='sublist'>{ability.ability.name}</div>)}
                </li>
                <li>Types: {pokemon.types.map((type)=> <div className='sublist'>{type.type.name}</div>)}</li>
            </ul>
        </section>
    );
}

export default PokemonDetails;
