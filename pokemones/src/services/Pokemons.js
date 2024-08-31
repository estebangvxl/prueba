import axios from 'axios';

const BASE_URL = "https://pokeapi.co/api/v2/";

async function getListPokemons(nextUrl){

    const url = BASE_URL + "/pokemon?limit=20&offset=0";

    const data = await axios.get(nextUrl || url);

    return data;

}

async function getDetailsPokemon(url){

    const {data} = await axios.get(url);

    return data;
}

async function getPokemonByName(name){

    const url = BASE_URL + `/pokemon/${name}/`

   try {

    const {data} = await axios.get(url);
    return data;

   } catch (error) {
    return error;
   }
}

export {
    getListPokemons,
    getDetailsPokemon,
    getPokemonByName
}