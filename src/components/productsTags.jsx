import React, { useEffect, useRef, useState } from 'react';

const containerStyles = {
    maxHeight: '90px', 
    overflowY: 'hidden'   
};

const useOverflowDetection = (ref) => {
    const [isOverflow, setIsOverflow] = useState(false);

    useEffect(() => {
        if (ref) {
            console.log('Counting....');
            const el = ref.current;
            const refIsOverflown = (el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth);
            
            if (refIsOverflown !== isOverflow) {
                setIsOverflow(refIsOverflown);
            }           
        }
    });

    return isOverflow;
};

const ProductsTags = ({tagsArray, onChange}) => {
    const containerRef = useRef(null);

    const isContainerOverflowed = useOverflowDetection(containerRef);
    console.log('Is over', isContainerOverflowed);


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
        <>
            <div style={containerStyles} ref={containerRef}>
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
            {isContainerOverflowed && 
                <span className="badge bg-primary m-auto fw-light" role="button" onClick={handleResetSelection}>
                    <i className="bi bi-chevron-double-down"/>&nbsp;
                    <span className="m-2">Показать весь список</span>
                </span>
            }
        </>
    ); 
}
 
export default ProductsTags;