import React, {useState} from 'react';

const DropDownItem = ({handleDropDownListItemSelect, listItem, isActive=false}) => {   
    //const {supplier, productsCount} = listItem;

    return (
        <button            
            className={'list-group-item list-group-item-action cursor-default' + (isActive ? ' active-light' : '')}                                
            onClick={
                () => { handleDropDownListItemSelect(listItem) }
            }                
        >            
            {listItem.content}
        </button>
    );
}

const SearchBar = ({allSuppliers, onSupplierChange}) => {    
    const [inputValue, setInputValue] = useState('');
    const [dropdownItems, setFilteredItems] = useState([]);    
    const [showDropDown, setShowDropDown] = useState(false);
    
    // const inputRef = useRef(null);        
    // const ACTIVE_DROP_DOWN_ITEM_INDEX_INITIAL_STATE = -1;
    // const [activeDropDownItemIndex, setActiveDropDownItemIndex] = useState(ACTIVE_DROP_DOWN_ITEM_INDEX_INITIAL_STATE);
    
    const handlerSearchInputChange = (event) => {       
        // setActiveDropDownItemIndex(ACTIVE_DROP_DOWN_ITEM_INDEX_INITIAL_STATE);
        setInputValue(event.target.value);
        // console.log('change', event.target.value);
        const value = event.target.value.toLowerCase().trim();        
        const newStateFilteredItems = value.length < 1 
            ? [] 
            : allSuppliers.filter(
                ({supplier}) => supplier.toLowerCase().includes(value)
            ).sort((a, b) => a.supplier > b.supplier ? 1 : -1);
        
        setFilteredItems(newStateFilteredItems);                
        setShowDropDown(newStateFilteredItems.length > 0);

        // if (!value) {            
        //     onSupplierChange(-1);
        // }
    }  

    const handlerSubmit = (event) => {        
        event.preventDefault();        

        // if (dropdownItems.length) {
        //     const supplierIndex = (activeDropDownItemIndex === ACTIVE_DROP_DOWN_ITEM_INDEX_INITIAL_STATE ? 0 : activeDropDownItemIndex);
        //     setInputValue(dropdownItems[supplierIndex].supplier);
        //     onSupplierChange(dropdownItems[supplierIndex].id);
        // }  else {
        //     onSupplierChange(-1);
        // }   
        
        setShowDropDown(false);        
    }

    const handleDropDownListItemSelect = (dropdownItem) => {                          
        setInputValue(dropdownItem.supplier);
        // setActiveDropDownItemIndex(dropDownItemIndex); 
        // inputRef.current.focus();      
    }              

    return ( 
        <form className="bg-light w-100 search-nav" onSubmit={handlerSubmit}>
            
            <div className="w-100 d-flex">                              
                <input 
                    className="form-control search-nav__input" 
                    type="search" 
                    placeholder="Search by factory" 
                    aria-label="Search"
                    onChange={handlerSearchInputChange}                               
                    value={inputValue}
                    // ref={inputRef}
                />                
            </div>  

            {dropdownItems.length > 0 &&
                <div className={"form-control search-nav__dropdown" + (showDropDown ? ' active' : '') }>                
                    <ul className="list-group list-group-flush">
                        {dropdownItems.map((item, index) => {
                            // const {supplier, id, productsCount} = el;        
                            return <DropDownItem
                                handleDropDownListItemSelect={handleDropDownListItemSelect}
                                key={index}
                                listItem={item}
                                // supplier={supplier}
                                // productsCount={productsCount}
                                // dropDownItemIndex={index}
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