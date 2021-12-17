import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import useConfig from './hooks/useConfig';
import ProductsCatalogue from './layouts/productsCatalogue';

function App() {
    const CONFIG = useConfig();
    
    return (
        <>
            <Switch>
                <Route path={CONFIG.uriPath.catalogue+":supplierId?/:productSku?"} exact component={ProductsCatalogue}></Route>                
                <Redirect to={CONFIG.uriPath.catalogue}/>                
            </Switch>            
        </>
    );
}

export default App;
