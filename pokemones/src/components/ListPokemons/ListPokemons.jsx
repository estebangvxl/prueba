import React, { memo, useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { CacheContext } from '../../context/contextCache';
import CardPokemon from '../cardPokemon/CardPokemon';
import { getDetailsPokemon, getListPokemons, getPokemonByName } from '../../services/Pokemons';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { getObjectPokemon, getElementsByString, emptyObject } from '../../utils/utils';
import "./list-pokemons.css";
import Spinner from '../spinner/Spinner';

const ListPokemons = memo(({filter = ""}) => {

    const {getDataCache, updateDataCache} = useContext(CacheContext);

    let nextUrl = useRef(getDataCache('nextUrl'));
    const [loading, setLoading] = useState(false);
    const [pokemons, setPokemons] = useState(getDataCache('pokemons', {}));
    const [pokemonsFilter, setPokemonsFilter] = useState({});
    const [
            observerList, 
            isIntersectingList,
          ] = useIntersectionObserver({options: {root: null,rootMargin: "10px",threshold: 1.0}});

    useEffect(()=>{
        if(isIntersectingList){
            getPokemons()
        }
    },[isIntersectingList]);

    useEffect(()=>{
        getPokemonByName(filter)
        .then((data)=>{
            setPokemons({
                    ...pokemons, 
                    [data.id]: getObjectPokemon(data)
                });
        }).catch(()=>{
            setPokemonsFilter(getElementsByString(pokemons, filter));
        })

    },[filter])

    useEffect(()=>{
        setPokemonsFilter(getElementsByString(pokemons, filter));
        setLoading(false);
        updateDataCache({
            nextUrl: nextUrl.current,
            pokemons: pokemons
        });
        
    }, [pokemons]);

    const getPokemons = async () =>{
        setLoading(true)
        let data = null;
        try {
            data = await getListPokemons(nextUrl.current);
            const pokemonsObject = {};

            for(let pokemon of data.data.results){
                const pokemonDetail = await getDetailsPokemon(pokemon.url);
                pokemonsObject[pokemonDetail?.id] = getObjectPokemon(pokemonDetail);
            }
            nextUrl.current = data.data.next;

            setPokemons({...pokemons,...pokemonsObject});
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            {
                filter ?
                <ul className="list__pokemons">
                {
                    pokemonsFilter.map((pokemon, index)=> 
                        <li key={index}>
                           <Link to={`/pokemon_details/${pokemon.name}`}> 
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
                            <Link to={`/pokemon_details/${pokemon.name}`}> 
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
            <Spinner isLoading={loading}/>
        </>
    );
})

export default ListPokemons;
