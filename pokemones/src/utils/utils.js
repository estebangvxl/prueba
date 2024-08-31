function getObjectPokemon(pokemon){
    return {
        id: pokemon?.id,
        name: pokemon?.name,
        type: pokemon?.types[0]?.type?.name,
        order: pokemon.order,
        image: pokemon?.sprites?.other["official-artwork"]?.front_default,
        abilities: pokemon?.abilities,
        types: pokemon?.types,
    }
}

export {
    getObjectPokemon
};