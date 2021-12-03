import React, {useState, useEffect} from 'react';
import Spinner from './common/spinner';

const ProductImage = ({src}) => {    
    const ERR_SRC = '/404.jpeg';
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const handlerOnLoad = () => {
            setIsError(false);
            setIsLoaded(true);           
        };

        const handlerOnErr = () => {
            setIsLoaded(true);
            setIsError(true);
        }

        setIsLoaded(false);

        const img = new Image();                
        img.addEventListener('load', handlerOnLoad);
        img.addEventListener('error', handlerOnErr)
        img.src = src;

        return () => {
            img.removeEventListener('load', handlerOnLoad);
            img.removeEventListener('error', handlerOnErr)
        };
    }, [src]);               

    return (              
        isLoaded 
            ? (<img src={isError ? ERR_SRC : src} className="card-img-top" alt="..." />)
            : <Spinner />
        
    );            
    
}    
 
export default ProductImage;
