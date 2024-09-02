import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = ({options}) => {

    const [isIntersecting, setIsintersecting] = useState();
    const element = useRef();
    const observer = useRef(new IntersectionObserver((entries)=>{
                            entries.forEach((entry)=>{
                                setIsintersecting(entry.isIntersecting);
                            });
                        }, options)
                    );

    useEffect(()=>{
        observer.current.observe(element.current);
    }, []);

    return [element, isIntersecting];
}

export default useIntersectionObserver;
