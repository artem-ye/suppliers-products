import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ProductsCatalogue from './layouts/productsCatalogues';

function App() {         
    return (
        <>
            <Route path="/:supplierId?" exact component={ProductsCatalogue}></Route>
        </>
    );
}

export default App;
