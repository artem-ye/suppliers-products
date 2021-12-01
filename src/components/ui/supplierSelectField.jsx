import React from 'react';
import { useSuppliersCatalogueModel } from '../../model/useSuppliersCatalogueModel';
import SearchBar from '../common/searchBar';

const SupplierSelectField = ({onChange, supplierId}) => {
    const {model} = useSuppliersCatalogueModel();   

    const options = (model.suppliers || []).map(sup => {                    
        return {label: sup.supplier, value: sup.id};
    });    
  
    return ( 
        <SearchBar
            onChange={onChange}
            options={options}
            defaultOption={options.find(el => el.value === supplierId)}
        />   
     );
}
 
export default SupplierSelectField;