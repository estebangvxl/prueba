import React from 'react';
import Searcher from '../../components/searcher/Searcher';
import ListPokemons from '../../components/ListPokemons/ListPokemons';
import { useState } from 'react';

const SearchPokemon = () => {

    const [search, setSearch] = useState("");

    return (
        <>
            <section className='page__home'>

                <header className="header">
                    <h1>Pokemones</h1>
                    <Searcher change={(value) => {setSearch(value)}} />
                </header>
                <ListPokemons filter={search} />
                
            </section>
        </>
    );
}

export default SearchPokemon;
