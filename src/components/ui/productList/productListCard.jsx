import React from 'react';
import ImageLoader from '../../common/imageLoader';
import Spinner from '../../common/spinner';
// import ProductImage from '../../productImage';


const ProductListCard = ({product, productImageURL, onClick}) => {    
    const handleClick = (product) => {
        onClick(product);
    }

    return (            
        <div className="card m-1 card-width" data-sku={product.sku} onClick={() => handleClick(product)}>
            <div className="h-100 m-1">                
                <ImageLoader 
                    src={productImageURL} 
                    className="img-fluid card-img-top" 
                    alt="" 
                    spinner={<Spinner/>}
                />
            </div>
            <div className="card-body">
                <h5 className="card-title">{product.sku}</h5>
                <p className="card-text card-p">{product.title}</p>
            </div>
        </div>                            
    );    
}
 
export default ProductListCard;