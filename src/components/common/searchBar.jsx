import React, {useEffect, useState} from 'react';

const DropDownItem = ({handleDropDownListItemSelect, listItem, isActive=false}) => {
    return (
        <button            
            className={'list-group-item list-group-item-action cursor-default' + (isActive ? ' active-light' : '')}                                
            onClick={
                (e) => {
                    handleDropDownListItemSelect({value: listItem.value, label: listItem.label});
                }
            }
            value={listItem.id}                            
        >            
            {listItem.label}
        </button>
    );
}

const SearchBar = ({options, defaultOption, onChange}) => {   
    const [inputValue, setInputValue] = useState(defaultOption?.label || '');
    const [dropdownItems, setDropdownItems] = useState(options || []);    
    const [showDropDown, setShowDropDown] = useState(false);
    
    useEffect(() => {
        let isUnmounted = false;

        if (!isUnmounted) {
            setInputValue(defaultOption?.label || '');
        }        

        return () => {
            isUnmounted = true;
        }
    }, [defaultOption]);    
    
    // Helper functions    
    const applyFilter = (filteredOptions) => {
        setDropdownItems(filteredOptions);                
        setShowDropDown(filteredOptions.length > 0);
    }
    
    const cancel = () => {
        if (!showDropDown) {
            return;
        }

        setTimeout(function(){ 
            if (showDropDown) {    
                setShowDropDown(false);
            }
        }, 200);
    }
    
    //  Select / submit event handlers    
    const handlerSubmit = (event) => {           
        event.preventDefault();                      
        setShowDropDown(false);                              

        if (!inputValue.trim()) {
            onChange({});            
        } else {            
            onChange(dropdownItems.length > 0 ? dropdownItems[0] : {});
        }                       
    }

    const handleDropDownListItemSelect = (dropdownItem) => {                     
        setInputValue(dropdownItem.label);
        setDropdownItems(dropdownItem);        
        onChange(dropdownItem);         
    }        
        
    // List filtering event handlers        
    const handleInputClick = () => {
        if (!inputValue.trim())  {                                  
            applyFilter( showDropDown ? [] : options);
        } else {
            setShowDropDown(prev => !prev);
        }
    }

    const handlerSearchInputChange = (event) => {               
        setInputValue(event.target.value);        
        const value = event.target.value.toLowerCase().trim();        

        const filteredOptions = (!value) 
            ? options
            : options.filter(({label}) => label.toLowerCase().includes(value));

        applyFilter(filteredOptions);        
    }
    
    const handleBlur = () => {
        cancel();
    }

    const handleKeyPress = (event) => {        
        if (event.keyCode === 27) {
            // ESC pressed
            cancel();
        }
    }

    return ( 
        <form className="bg-light w-100 search-nav" onSubmit={handlerSubmit} onBlur={handleBlur} onKeyUp={handleKeyPress}>
            
            <div className="w-100 d-flex">                              
                <input 
                    className="form-control search-nav__input" 
                    type="search" 
                    placeholder="Search by factory" 
                    aria-label="Search"
                    onChange={handlerSearchInputChange}
                    onClick={handleInputClick}                               
                    value={inputValue}
                />

                {/* <button className="btn badge bg-body text-dark">
                    <i className="bi bi-chevron-double-down"></i>
                </button> */}
                {/* <div>
                <i className="bi bi-chevron-double-down"/>
                </div> */}
            </div>  

            {dropdownItems.length > 0 &&
                <div className={"form-control search-nav__dropdown" + (showDropDown ? ' active' : '') }>                
                    <ul className="list-group list-group-flush">
                        {dropdownItems.map((item, index) => {                            
                            return <DropDownItem
                                handleDropDownListItemSelect={handleDropDownListItemSelect}
                                key={index}
                                listItem={item}                            
                                isActive={false}
                            />;    
                        })}
                    </ul>                
                </div>   
            }                                             
            
        </form>   
     );
}
 
export default SearchBar;