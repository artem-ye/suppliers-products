import React, {useState, useEffect} from 'react';
import ProductCard from './productCard';
import ProductsTags from './productsTags';

const PAGINATION_PAGE_SIZE = 6 * 20;
// const PAGINATION_PAGE_SIZE = 6;

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

    return (        
        DISPLAY_PRODUCTS_COUNT > 0 &&
        <>
            <div className="container m-2 d-flex flex-wrap">
                <ProductsTags tagsArray={productsTags}/>
            </div>
            <div className="row row-cols-4 m-2">
                {                    
                    cropProducts.map((product, key) => (
                        <ProductCard 
                            key={key}
                            product={product} 
                            productImageURL={model.getProductPreviewImageURL(product)}
                        />
                    ))
                }
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
