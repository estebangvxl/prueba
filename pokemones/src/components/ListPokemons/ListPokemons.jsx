import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import CardPokemon from '../cardPokemon/CardPokemon';
import { getDetailsPokemon, getListPokemons, getPokemonByName } from '../../services/Pokemons';
import { getObjectPokemon } from '../../utils/utils';
import "./list-pokemons.css";

const ListPokemons = ({filter = ""}) => {
    console.log(filter)

    const [pokemons, setPokemons] = useState({});
    const [pokemonsFilter, setPokemonsFilter] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    
    
    let nextUrl = useRef(null);
    let elemObserver = useRef(null);
    let observer = null;

    useEffect(()=>{
        if(isVisible){
            getPokemons()
        }
    },[isVisible]);

    useEffect(()=>{

        const pokemonByName = async()=>{
            if(!filter.length)return;
            try {
              const data = await getPokemonByName(filter);

            let id = data.id;
            setPokemons(
                {
                    ...pokemons, 
                    [id]: getObjectPokemon(data)
                }
            );
            } catch (error) {
                console.error(error)
            }
        }

        pokemonByName();

    },[filter])

    useEffect(()=>{
        setPokemonsFilter(Object.values(pokemons).filter(
            (item)=> item.name.includes(filter)
        ));
    }, [pokemons]);

    const getPokemons = async () =>{
        let data = null;
        try {
            data = await getListPokemons(nextUrl.current);
        } catch (error) {
            console.log(error)
        }
        const pokemonsObject = {};

        for(let pokemon of data.data.results){
            const pokemonDetail = await getDetailsPokemon(pokemon.url);
            try {
                pokemonsObject[pokemonDetail?.id] = getObjectPokemon(pokemonDetail);
            } catch (error) {
                console.log(error)
            }
        }
        nextUrl.current = data.data.next;
        setPokemons({...pokemons,...pokemonsObject});
    }

    useEffect(()=>{
    console.log(pokemons)},[pokemons])

    useEffect(()=>{
        console.log('effect')
        observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
          }, {
            root: null,
            rootMargin: "50px",
            threshold: 1.0,
           });

        observer.observe(elemObserver.current);
    }, []);


    return (
        <>
            {
                filter ?
                <ul className="list__pokemons">
                {
                    pokemonsFilter.length ? pokemonsFilter.map((pokemon, index)=> 
                        <li key={index}>
                           <Link to={`pokemon_details/${pokemon.name}`}> 
                                <CardPokemon pokemon={pokemon} /> 
                           </Link>
                        </li>
                    ) 
                    : <li className="not-found-pokemon">No hay resultados con ese nombre</li>
                } 
                </ul> :

                <ul className="list__pokemons">
                {
                    Object.keys(pokemons).length ? Object.values(pokemons).map((pokemon, index)=> 
                        <li key={index}>
                            <Link to={`pokemon_details/${pokemon.name}`}> 
                                <CardPokemon pokemon={pokemon} /> 
                           </Link>
                        </li>
                    ) 
                    : <li className="not-found-pokemon">No tienes pokemones cargados</li>
                } 
                </ul>
            }
            <div id="oberver-pokemons" ref={elemObserver}></div>
        </>
    );
}

export default ListPokemons;
