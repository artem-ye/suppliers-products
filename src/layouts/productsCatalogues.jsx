import React, { useState } from 'react';

import ProductsList from '../components/ui/productList/productsList';
import { useHistory, useParams } from 'react-router';
import { SuppliersCatalogueModelProvider } from '../model/useSuppliersCatalogueModel.js';
import SupplierSelectField from '../components/ui/supplierSelectField.jsx';

const ProductsCatalogue = () => {
    const [supplierId, setSupplierId] = useState(useParams().supplierId);
    const history = useHistory();        
  
  
    const handleSupplierChange = (supplier) => {
        if (!supplier.value) {
            return;
        }
        history.push('/'+supplier.value);        
        setSupplierId(supplier.value);
    }
          
    return (
        <SuppliersCatalogueModelProvider>             
            <SupplierSelectField
                onChange={handleSupplierChange}
                supplierId={supplierId}
            />
            <ProductsList                    
                supplierId={supplierId}                    
            />                   
        </SuppliersCatalogueModelProvider>
    );
   
}
 
export default ProductsCatalogue;