import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import CardPokemon from '../cardPokemon/CardPokemon';
import { getDetailsPokemon, getListPokemons, getPokemonByName } from '../../services/Pokemons';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { getObjectPokemon, getElementsByString, emptyObject } from '../../utils/utils';
import "./list-pokemons.css";

const ListPokemons = ({filter = ""}) => {

    let nextUrl = useRef(null);
    const [pokemons, setPokemons] = useState({});
    const [pokemonsFilter, setPokemonsFilter] = useState({});
    const [
            observerList, 
            isIntersectingList,
          ] = useIntersectionObserver({root: null,rootMargin: "50px",threshold: 1.0});

    useEffect(()=>{
        if(isIntersectingList){
            getPokemons()
        }
    },[isIntersectingList]);

    useEffect(()=>{
        getPokemonByName(filter).then((data)=>{
                setPokemons(
                    {
                        ...pokemons, 
                        [data.id]: getObjectPokemon(data)
                    }
                );
        }).catch(()=>{
            setPokemonsFilter(getElementsByString(pokemons, filter));
        })

    },[filter])

    useEffect(()=>{
        setPokemonsFilter(getElementsByString(pokemons, filter));
        
    }, [pokemons]);

    const getPokemons = async () =>{
        let data = null;
        try {
            data = await getListPokemons(nextUrl.current);
        } catch (error) {
        }
        const pokemonsObject = {};

        for(let pokemon of data.data.results){
            const pokemonDetail = await getDetailsPokemon(pokemon.url);
            try {
                pokemonsObject[pokemonDetail?.id] = getObjectPokemon(pokemonDetail);
            } catch (error) {
            }
        }
        nextUrl.current = data.data.next;
        setPokemons({...pokemons,...pokemonsObject});
    }


    return (
        <>
            {
                filter ?
                <ul className="list__pokemons">
                {
                    pokemonsFilter.map((pokemon, index)=> 
                        <li key={index}>
                           <Link to={`pokemon_details/${pokemon.name}`}> 
                                <CardPokemon pokemon={pokemon} /> 
                           </Link>
                        </li>
                    )
                } 
                </ul> :

                <ul className="list__pokemons">
                {
                    Object.values(pokemons).map((pokemon, index)=> 
                        <li key={index}>
                            <Link to={`pokemon_details/${pokemon.name}`}> 
                                <CardPokemon pokemon={pokemon} /> 
                           </Link>
                        </li>
                    ) 
                } 
                </ul>
            }

            {
                emptyObject(pokemons) ? <div>NO HAY POKEMONES CARGADOS</div> : ''
            }

            {
                emptyObject(pokemonsFilter) && !emptyObject(pokemons) ? <div>NO HAY POKEMONES CON ESE NOMBRE</div> : ''
            }
            <div id="oberver-pokemons" ref={observerList}></div>
        </>
    );
}

export default ListPokemons;
