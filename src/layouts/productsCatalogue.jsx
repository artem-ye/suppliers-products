import React, { useState } from 'react';

import ProductsList from '../components/ui/productList/productsList';
import { useHistory, useParams } from 'react-router';
import { SuppliersCatalogueModelProvider } from '../model/useSuppliersCatalogueModel.js';
import SupplierSelectField from '../components/ui/supplierSelectField.jsx';
import useConfig from '../hooks/useConfig';
import ProductCard from '../components/ui/productCard';

const ProductsCatalogue = () => {
    const [supplierId, setSupplierId] = useState(useParams().supplierId);    
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
          
    return (
        <SuppliersCatalogueModelProvider>             
            <SupplierSelectField
                onChange={handleSupplierChange}
                supplierId={supplierId}
            />
            {
                productSku 
                    ?<ProductCard 
                        productSku={productSku}
                    />
                    :<ProductsList                    
                        supplierId={supplierId}
                        onProductCardClick={handleProductsListCardClick}                    
                    />                   
            }
        </SuppliersCatalogueModelProvider>
    );
   
}
 
export default ProductsCatalogue;