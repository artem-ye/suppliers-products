import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Products from './components/products';

function App() {    
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
                <Navbar allSuppliers={allSuppliers} onSupplierChange={onSupplierChange}/>
                
                <Products
                    suppliersProducts={suppliersProducts}
                    currentSupplierIndex={currentSupplierIndex}                    
                />                   
            </>
        );
    }   
}

export default App;
