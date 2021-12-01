import React, {useState, useEffect} from 'react';
import { useSuppliersCatalogueModel } from '../../model/useSuppliersCatalogueModel';
import ProductCard from '../productCard';
import ProductsTags from '../productsTags';

const PAGINATION_PAGE_SIZE = 20 * 6;
const DATA_INITIAL_STATE = {
    products: [],
    productsTags: []
};
const FILTER_INITIAL_STATE = {};

const ProductsList = ({supplierId}) => {    
    const {model} = useSuppliersCatalogueModel();

    const [paginationCurrentPageNum, setPaginationCurrentPageNum] = useState(1);
    const [filterOptions, setFilterOptions] = useState(FILTER_INITIAL_STATE);    
    const [data, setData] = useState(DATA_INITIAL_STATE);
    
    useEffect(() => {
        setPaginationCurrentPageNum(1);
        setFilterOptions(FILTER_INITIAL_STATE);

        const dataNewState = {...DATA_INITIAL_STATE};
        const supplier = supplierId && model.getSupplierById(supplierId);        

        if (supplier) {
            const products = model.getSupplierProducts(model.getSupplierById(supplierId));            
            dataNewState.products = products;
            dataNewState.productsTags = model.getProductsTags(products);            
        }

        setData(dataNewState);
    }, [supplierId, model]);    
    

    if (data.products.length === 0) {        
        return null;
    };   

    const filterProducts = (products) => {  
        if (!Array.isArray(products)) {
            return products
        }        
        
        if (filterOptions.tags && filterOptions.tags.length > 0) {                          
            const res =  products.filter(prod => {
                return filterOptions.tags.includes(prod.title);
            });                
            return res;
        }        

        return products;
    };
    
    
    const filteredProducts = filterProducts(data.products);
    
    const TOTAL_PRODUCTS_COUNT = filteredProducts.length;    
    const cropProducts = filteredProducts.slice(0, paginationCurrentPageNum * PAGINATION_PAGE_SIZE);    
    const PRODUCTS_DISPLAYED = cropProducts.length;        
    
    const handlePaginateNextPage = () => {
        setPaginationCurrentPageNum(paginationCurrentPageNum + 1);
    };

    const handleFilterChange = (filterType, data) => {        
        setFilterOptions(prev => ({...prev, [filterType]: data}));        
    };

    return (        
        PRODUCTS_DISPLAYED > 0 &&
        <>
            <div className="container m-2 d-flex flex-wrap">
                <ProductsTags tagsArray={data.productsTags} onChange={(data) => handleFilterChange('tags', data)}/>
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

           {PRODUCTS_DISPLAYED < TOTAL_PRODUCTS_COUNT &&
                <div className="w-100 d-flex justify-content-center">
                    <button 
                        className="btn btn-outline-secondary" 
                        onClick={handlePaginateNextPage}
                        style={{'boxShadow': 'none'}}
                    >{PRODUCTS_DISPLAYED} из {TOTAL_PRODUCTS_COUNT} показать больше... </button>
                </div>
            }
        </>
    );
}
 
export default ProductsList;
