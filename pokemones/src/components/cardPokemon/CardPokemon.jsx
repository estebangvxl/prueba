import React from 'react';
import imgDefault from "../../assets/images/pokeball.png"
import { getColorByPokemonType} from '../../utils/getColorByPokemonType';
import "./cardpokemon.css";

const CardPokemon = ({pokemon}) => {
    return (
        <article 
            className='card__pokemon'
            style={{borderColor: getColorByPokemonType(pokemon.type)}}
        >
           <figure className='img_pokemon'>
                <img src={pokemon?.image ? pokemon.image : imgDefault} alt="" />
                <figcaption>{pokemon.name}</figcaption>
           </figure>
        </article>
    );
}

export default CardPokemon;
