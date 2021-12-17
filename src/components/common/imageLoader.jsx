import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ImageLoader = ({src, spinner, fallBack, alt, ...rest}) => {    
    // const ERR_SRC = src404;	    
    
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
    
    if (isError) {
        return fallBack || <DefaultFallBack/>;
    }

    return (              
        isLoaded 
            ? (<img src={src} alt={alt} {...rest}/>)
            : spinner
    );        
    
};

const DefaultFallBack = () => (
    <div className='w-100 d-flex align-items-center justify-content-center'>
        <div style={{maxWidth: '300px', maxHeight: '300px'}}>
            <img src={'/404.jpeg'} alt='fuck' style={{width: '100%'}}/>
        </div>
    </div>
);

ImageLoader.propTypes = {
    src: PropTypes.string.isRequired,
    src404: PropTypes.string,
    alt: PropTypes.string,    
    spinner: PropTypes.node,
    fallBack: PropTypes.oneOf([PropTypes.node, null])
};

ImageLoader.defaultProps = {
    sinner: null,
    fallBack: null,
    alt: '...'
}

export default ImageLoader;