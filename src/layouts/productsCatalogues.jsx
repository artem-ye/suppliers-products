import React, { useState, useEffect } from 'react';

import SearchBar from '../components/searchBar.jsx';
import Products from '../components/products';
import SuppliersCatalogueModel from '../model/model';
import { useParams } from 'react-router';

const SearchBarDropDownItemContent = ({allSuppliersItem}) => (
    <>
        {allSuppliersItem.supplier}<span className="badge rounded-pill bg-light text-dark">{allSuppliersItem.productsCount} sku</span>
    </> 
);

const ProductsCatalogue = () => {
    const supplierId = useParams().supplierId;

    console.log('Sup ID is', supplierId);


    // const model = new SuppliersCatalogueModel();    
    const [model, setModel] = useState(new SuppliersCatalogueModel());

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    
    // const [suppliersProducts, setSuppliersProducts] = useState([]);

    const [currentSupplierIndex, setCurrentSupplierIndex] = useState(-1);
    const [allSuppliers, setAllSuppliers] = useState([]);
    const onSupplierChange = (supplierId) => {        
        setCurrentSupplierIndex(supplierId);        
    };

    useEffect(() => {
        model.init()
            .then(() => {
                setIsLoaded(false);                
                setModel(model);
                setAllSuppliers(model.suppliers);
                setIsLoaded(true);
                


                // console.log('Loaded', model.suppliers[0]);

            }).catch(err => {
                setIsLoaded(true);
                setError(err);
            });
        
    }, []);
    
    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Загрузка...</span>
            </div>
        );
    } else {
        
        console.log('Is loaded: ', isLoaded);
        console.log(model.suppliers[0].id);
        console.log(model.suppliers[1].id);
        console.log(model.suppliers[2].id);

        return (
            <>
                <SearchBar 
                    onSupplierChange={onSupplierChange}
                    allSuppliers={allSuppliers.map(
                        e => ({
                            ...e, 
                            content: <SearchBarDropDownItemContent allSuppliersItem={e}/>                                
                        })
                    )} 
                />
                
                <Products
                    // suppliersProducts={suppliersProducts}
                    // currentSupplierIndex={currentSupplierIndex}  
                    supplierId={supplierId}                    
                    model={model}
                />                   
            </>
        );
    }  
}
 
export default ProductsCatalogue;