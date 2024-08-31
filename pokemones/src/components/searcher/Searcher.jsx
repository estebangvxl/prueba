import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import './searcher.css'

const Searcher = ({change = ()=>{}}) => {

    const debounced = useDebouncedCallback(
        (value) => {
          change(value);
        },
        1000
      );

    return (
        <>
            <input 
                className='searcher' 
                type="search"
                placeholder='Buscar pokemon...'
                onChange={(e)=>{debounced(e.target.value)}}
            />   
        </>
    );
}

export default Searcher;
