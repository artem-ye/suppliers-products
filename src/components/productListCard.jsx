import React from 'react';
import ProductImage from './productImage';

const ProductListCard = ({product, productImageURL}) => {    
    return (            
        <div className="card m-1 card-width">
            <div className="h-100 m-1">
                <ProductImage src={productImageURL}/>
            </div>
            <div className="card-body">
                <h5 className="card-title">{product.sku}</h5>
                <p className="card-text card-p">{product.title}</p>
            </div>
        </div>                            
    );    
}
 
export default ProductListCard;