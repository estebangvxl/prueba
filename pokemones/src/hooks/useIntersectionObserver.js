import React, { useEffect } from 'react';

const useIntersectionObserver = ({ref, config, handler}) => {

    let observer = null;

    const handlerIntersection = (entries, observer_) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                handler();
            }
        });
    }

    useEffect(()=>{
        observer = new IntersectionObserver(handlerIntersection, config);

        observer.observe(ref.current);
    }, []);

    return observer;
}



export default useIntersectionObserver;
