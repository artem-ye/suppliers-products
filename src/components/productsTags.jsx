import React from 'react';

const useRandomColors = () => {
    const styles = ['bg-light text-dark', 'bg-secondary',  'bg-warning text-dark', 'bg-dark', 'bg-info text-dark'];
    let lastVal = undefined;

    return () => {
        const stylesArray = styles.filter(val => val !== lastVal);
        const min = 0;
        const max = stylesArray.length-1;
        const index  = Math.floor(Math.random() * (max - min + 1)) + min;        
        lastVal = stylesArray[index];
        return lastVal;
    }
}

const ProductsTags = ({tagsArray}) => {                    
    const getRandomColor = useRandomColors();

    return tagsArray.map((el, i) => (        
        <span key={i} role="button" className={"badge m-1 flex-grow-1 " + getRandomColor()}>{el}</span>
    ));                        
}
 
export default ProductsTags;