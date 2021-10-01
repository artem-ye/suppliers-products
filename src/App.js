import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/searchBar.jsx';
import Products from './components/products';
import SuppliersCatalogueModel from './model/model';

const SearchBarDropDownItemContent = ({allSuppliersItem}) => (
    <>
        {allSuppliersItem.supplier}<span className="badge rounded-pill bg-light text-dark">{allSuppliersItem.productsCount} sku</span>
    </> 
);

function App() {      
    const modelSuppliersCatalogue = new SuppliersCatalogueModel();
    modelSuppliersCatalogue.init();

    

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const [suppliersProducts, setSuppliersProducts] = useState([]);

    const [currentSupplierIndex, setCurrentSupplierIndex] = useState(-1);
    const [allSuppliers, setAllSuppliers] = useState([]);
    const onSupplierChange = (supplierId) => {        
        setCurrentSupplierIndex(supplierId);        
    };

    useEffect(() => {
        const JSON_URL = '/suppliers_products.json';
        fetch(JSON_URL)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);

                    const suppliers = result.map((el, index) => {                        
                        return {
                            supplier: el.supplier,
                            id: index,
                            productsCount: el.products.length
                        }
                    });                    

                    setAllSuppliers(suppliers);
                    setSuppliersProducts(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
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
                    suppliersProducts={suppliersProducts}
                    currentSupplierIndex={currentSupplierIndex}                    
                />                   
            </>
        );
    }   
}

export default App;
