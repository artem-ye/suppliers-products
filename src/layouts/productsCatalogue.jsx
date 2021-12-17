import React, { useState } from 'react';

import ProductsList from '../components/ui/productList/productsList';
import { useHistory, useParams } from 'react-router';
import { SuppliersCatalogueModelProvider } from '../model/useSuppliersCatalogueModel.js';
import SupplierSelectField from '../components/ui/supplierSelectField.jsx';
import useConfig from '../hooks/useConfig';
import ProductCard from '../components/ui/productCard';
// import { useEffect } from 'react';

const ProductsCatalogue = () => {
    const ParamsSuppId = useParams().supplierId;

    const [supplierId, setSupplierId] = useState( ParamsSuppId );    
    const productSku = useParams().productSku;        

    const history = useHistory();        
    const CONFIG = useConfig();
  
    const handleSupplierChange = (supplier) => {
        if (!supplier.value) {
            return;
        }               
        history.push(CONFIG.uriPath.catalogue + supplier.value);        
        setSupplierId(supplier.value);        
    }

    const handleProductsListCardClick = (product) => {                
        history.push(history.location.pathname+'/'+product.sku);
    }     
    
    
    const displayNoStyle = {display: 'none'};
          
    return (
        <SuppliersCatalogueModelProvider>             
            <SupplierSelectField
                onChange={handleSupplierChange}
                supplierId={supplierId}
            />            
            {
                productSku &&             
                 <ProductCard 
                    productSku={productSku}
                 />             
            }                      
            <div style={(productSku ? displayNoStyle : {})}>
                <ProductsList                    
                    supplierId={supplierId}
                    onProductCardClick={handleProductsListCardClick}                    
                />  
            </div>
           
        </SuppliersCatalogueModelProvider>
    );
   
}
 
export default ProductsCatalogue;