import React, { useEffect, useState } from 'react';

// const useRandomColors = () => {
//     const styles = ['bg-light text-dark', 'bg-secondary',  'bg-warning text-dark', 'bg-dark', 'bg-info text-dark'];
//     let lastVal = undefined;

//     return () => {
//         const stylesArray = styles.filter(val => val !== lastVal);
//         const min = 0;
//         const max = stylesArray.length-1;
//         const index  = Math.floor(Math.random() * (max - min + 1)) + min;        
//         lastVal = stylesArray[index];
//         return lastVal;
//     }
// }

const ProductsTags = ({tagsArray}) => {           
    const [data, setData] = useState(tagsArray.map((el, index) => 
        ({label: el, id: el+'_'+index+1, checked: true, index})
    ));

    useEffect(() => {
        const newData = tagsArray.map(
            (el, index) => ({label: el, id: el+'_'+index+1, checked: true, index})
        );
        setData(newData);
    }, [tagsArray])

    const handleChange = (el) => {
        const newData = [...data];
        newData[el.index].checked = !newData[el.index].checked;
        setData(newData);
    }   
    
    const handleClear = () => {        
        const toggledChecked = !!(data.find(e => !e.checked));        
        setData(prev => prev.map(e => ({...e, checked: toggledChecked})));
    }

    const component = data.map((el) => (
        <div key={el.id} className="form-check form-check-inline" style={{fontSize: '0.8em'}}>
            <input className="form-check-input" type="checkbox" id={el.id} checked={el.checked} onChange={() => handleChange(el)}/>
            <label className="form-check-label" htmlFor={el.id}>{el.label}</label>
        </div>
    ));

    if (component.length > 1) {
        component.unshift(
            // <div key={component.length} className="form-check form-check-inline" style={{fontSize: '0.8em'}}>
            //     <span class="badge bg-primary">Primary</span>
            // </div>      
            
            // <span class="form-check form-check-inline form-check-label badge bg-primary">Primary</span>
            <div key={component.length+1} className="form-check form-check-inline ps-0" style={{fontSize: '0.8em'}}>
                <span className="badge bg-danger" role="button" onClick={handleClear}>Clear</span>
            </div>
            
        )
    }

    return component; 
    
}
 
export default ProductsTags;