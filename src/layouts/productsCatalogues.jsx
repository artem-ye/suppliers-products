import React, { useState, useEffect } from 'react';

import SearchBar from '../components/searchBar.jsx';
import Products from '../components/products';
import SuppliersCatalogueModel from '../model/model';
import { useHistory, useParams } from 'react-router';


// const SearchBarDropDownItemContent = ({allSuppliersItem}) => (
//     <>
//         {allSuppliersItem.supplier}<span className="badge rounded-pill bg-light text-dark">{allSuppliersItem.productsCount} sku</span>
//     </> 
// );

const ProductsCatalogue = () => {
    const [supplierId, setSupplierId] = useState(useParams().supplierId);
    const history = useHistory();
    
    const [model, setModel] = useState(new SuppliersCatalogueModel());
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);          
    const [allSuppliers, setAllSuppliers] = useState([]);
    

    useEffect(() => {        
        model.init()
            .then(() => {
                setIsLoaded(false);                
                setModel(model);                                                
                const suppliers = model.suppliers.map(sup => {                    
                    return {label: sup.supplier, value: sup.id};
                });
                setAllSuppliers(suppliers);
                setIsLoaded(true);
            }).catch(err => {
                setIsLoaded(true);
                setError(err);
            });
    }, []);    
  
  
    const handleSupplierChange = (supplier) => {
        if (!supplier.value) {
            return;
        }
        history.push('/'+supplier.value);        
        setSupplierId(supplier.value);
    }
    
    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Загрузка...</span>
            </div>
        );
    } else {                

        return (
            <>
                <SearchBar 
                    onChange={handleSupplierChange}
                    options={allSuppliers}
                    defaultOption={allSuppliers.find(el => el.value === supplierId)}
                />               
                <Products                    
                    supplierId={supplierId}                    
                    model={model}
                />                   
            </>
        );
    }  
}
 
export default ProductsCatalogue;