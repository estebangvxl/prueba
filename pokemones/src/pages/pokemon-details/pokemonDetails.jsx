import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonByName } from '../../services/Pokemons';
import { getObjectPokemon } from '../../utils/utils';
import "./pokemon_details.css";

export async function loader({ params }) {
    const pokemon = await getPokemonByName(params.name);
    return getObjectPokemon(pokemon);
  }

const PokemonDetails = () => {

    const {name} = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(
        ()=>{
            const getDetailsPokemon = async () => {
                const details = await getPokemonByName(name);
                console.log(details)
                setPokemon(getObjectPokemon(details));
            }
            getDetailsPokemon();
        },
    []);

    return (
        <>
            {
                pokemon && 
                <section className="page__pokemon_details">
                    <img src={pokemon.image} alt="" />
                    <ul className='list_details'>
                        <li className='name-pokemon'> Name: {pokemon.name}</li>
                        <li className="item-pokemon">
                            abilities: {pokemon.abilities.map((ability, index)=> <div key={index} className='sublist'>{ability.ability.name}</div>)}
                        </li>
                        <li className='item-pokemon'>Types: {pokemon.types.map((type, index)=> <div key={index} className='sublist'>{type.type.name}</div>)}</li>
                    </ul>
                </section>
            }
        </>
    );
}

export default PokemonDetails;
