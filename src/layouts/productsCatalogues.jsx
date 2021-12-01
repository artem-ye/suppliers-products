import React, { useState } from 'react';

import ProductsList from '../components/ui/productsList';
import { useHistory, useParams } from 'react-router';
import { SuppliersCatalogueModelProvider } from '../model/useSuppliersCatalogueModel.js';
import SupplierSelectField from '../components/ui/supplierSelectField.jsx';


// const SearchBarDropDownItemContent = ({allSuppliersItem}) => (
//     <>
//         {allSuppliersItem.supplier}<span className="badge rounded-pill bg-light text-dark">{allSuppliersItem.productsCount} sku</span>
//     </> 
// );

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