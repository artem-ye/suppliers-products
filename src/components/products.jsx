import React, {useState, useEffect} from 'react';
import ProductImage from './productImage';
import ProductsTags from './productsTags';

const PAGINATION_PAGE_SIZE = 6 * 20;
// const PAGINATION_PAGE_SIZE = 6;

const productImageURL = (productSku) => {
    return `http://img.nothingshop.com/images/${productSku}/default/preview.jpg`
}

const Products = ({supplierId, model}) => {    
    const [paginationCurrentPageNum, setPaginationCurrentPageNum] = useState(1);
    
    useEffect(() => {
        setPaginationCurrentPageNum(1);
    }, [supplierId]);    
    
    if (!supplierId) {
        return null
    };

    const supplier = model.getSupplierById(supplierId);
    if (!supplier) {
        return null
    };    

    const products = model.getSupplierProducts(supplier);
    const productsTags = model.getProductsTags(products);    
    
    const TOTAL_PRODUCTS_COUNT = products.length;    
    const cropProducts = products.slice(0, paginationCurrentPageNum * PAGINATION_PAGE_SIZE);
    const DISPLAY_PRODUCTS_COUNT = cropProducts.length;
    
    const handlePaginateNextPage = () => {
        setPaginationCurrentPageNum(paginationCurrentPageNum + 1);
    }
    
    const renderProduct = (product, id) => {
        return (            
            <div key={id} className="card m-1 card-width">
                <div className="h-100 m-1">
                    <ProductImage src={productImageURL(product.sku)}/>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{product.sku}</h5>
                    <p className="card-text card-p">{product.title}</p>
                </div>
            </div>                            
        );
    };        

    return (        
        DISPLAY_PRODUCTS_COUNT > 0 &&
        <>
            <div className="container m-2 d-flex flex-wrap">
                <ProductsTags tagsArray={productsTags}/>
            </div>
            <div className="row row-cols-4 m-2">
                {cropProducts.map(renderProduct)}
            </div>

           {DISPLAY_PRODUCTS_COUNT < TOTAL_PRODUCTS_COUNT &&
                <div className="w-100 d-flex justify-content-center">
                    <button 
                        className="btn btn-outline-secondary" 
                        onClick={handlePaginateNextPage}
                        style={{'boxShadow': 'none'}}
                    >{DISPLAY_PRODUCTS_COUNT} из {TOTAL_PRODUCTS_COUNT} показать больше... </button>
                </div>
            }
        </>
    );
}
 
export default Products;
