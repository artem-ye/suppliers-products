import React, { useEffect, useState } from 'react';

const ProductsTags = ({tagsArray, onChange}) => {    
    const [data, setData] = useState(tagsArray.map((el, index) => 
        ({label: el, id: el+'_'+index+1, checked: true, index})
    ));

    useEffect(() => {
        const newData = tagsArray.map(
            (el, index) => ({label: el, id: el+'_'+index+1, checked: true, index})
        );
        setData(newData);        
    }, [tagsArray]);    

    const submitChanges = (data) => {
        const selectedItems = data.filter(el => el.checked);        
        if (selectedItems.length > 0) {            
            onChange(selectedItems.map(el => el.label));
        }
    }
  
    const handleChangeSelection = (el) => {
        const newData = [...data];
        newData[el.index].checked = !newData[el.index].checked;
        setData(newData);
        submitChanges(newData);       
    }   
    
    const handleResetSelection = () => {        
        const toggledChecked = !!(data.find(e => !e.checked));        
        const newState = data.map(e => ({...e, checked: toggledChecked}));
        setData(newState);
        if (toggledChecked) {
            submitChanges(newState);
        }
    }
    
    const isMoreThenOneTagProvided = data.length > 1;
    
    return (

        
        // <Spoiler maxHeight="90px">
        <div>
            {
                isMoreThenOneTagProvided &&
                <div key={data.length+1} className="form-check form-check-inline ps-0" style={{fontSize: '0.8em'}}>
                    <span className="badge bg-danger" role="button" onClick={handleResetSelection}>Clear</span>
                </div>
            }
            {
                data.map((el) => (
                    <div key={el.id} className="form-check form-check-inline" style={{fontSize: '0.8em'}}>
                        <input 
                            className="form-check-input" type="checkbox" 
                            id={el.id} checked={el.checked} onChange={() => handleChangeSelection(el)}
                            disabled={!isMoreThenOneTagProvided}
                        />                    
                        <label className="form-check-label" htmlFor={el.id}>{el.label}</label>
                    </div>
                ))
            }                         
        </div>           
        // </Spoiler>
    ); 
}
 
export default ProductsTags;