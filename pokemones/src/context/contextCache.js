import React, { createContext, useState } from 'react';


const CacheContext = createContext({});


const CacheProvider = ({children}) => {

    /**Se almacena la información en un objeto */
    const [cache, setCache] = useState({});

    /**
     * Obtiene el valor almacenado en cache mediante su atributo.
     * @param {String} field - Atributo
     * @param {*} defaultValue - valor por defecto si no hay referencias.
     * @returns 
     */
    const getDataCache = (field, defaultValue)=>{
        return field in cache ? cache[field] : defaultValue !== undefined ? defaultValue : null;
    }

    /**
     * Almacena o actualiza los atributos del objeto en cache.
     * @param {Object} data - Data a almacenar
     */
    const updateDataCache = (data)=>{
        setCache({
            ...cache,
            ...data
        })
    }

    return (
        <CacheContext.Provider value={{getDataCache, updateDataCache}}>
            {children}
        </CacheContext.Provider>
    );
}

export {CacheProvider, CacheContext};
