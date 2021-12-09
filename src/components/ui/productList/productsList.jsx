import React, {useState, useEffect} from 'react';
import { useSuppliersCatalogueModel } from '../../../model/useSuppliersCatalogueModel';
import ProductListCard from './productListCard';
import ProductsTags from '../../productsTags';
import SortDropdown from './productsListSortDropdown';

const PAGINATION_PAGE_SIZE = 5 * 6;
const DATA_INITIAL_STATE = {
    products: [],
    productsTags: []
};
const FILTER_INITIAL_STATE = {};

const SORT_ORDERS = {
    SKU: {
        title: 'Артикул',
        key: 'sku'
    }, 
    TITLE: {
        title: 'Наименование',
        key: 'title'
    }    
};

const ProductsList = ({supplierId}) => {    
    const {model} = useSuppliersCatalogueModel();

    const [paginationCurrentPageNum, setPaginationCurrentPageNum] = useState(1);
    const [filterOptions, setFilterOptions] = useState(FILTER_INITIAL_STATE);
    const [sortOrder, setSortOrder] = useState(SORT_ORDERS.TITLE);
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

    const sortProducts = (products) => {        
        switch (sortOrder?.key) {
            case SORT_ORDERS.TITLE.key:
                return products.sort((a, b) => a.title > b.title ? 1 : -1);
            case SORT_ORDERS.SKU.key:
                return products.sort((a, b) => Number(a.sku) > Number(b.sku) ? 1 : -1);                        
            default:
                return products;
        }                
    }
    
    const filteredProducts = sortProducts( filterProducts(data.products) );    
    const TOTAL_PRODUCTS_COUNT = filteredProducts.length;    
    const cropProducts = filteredProducts.slice(0, paginationCurrentPageNum * PAGINATION_PAGE_SIZE);    
    const PRODUCTS_DISPLAYED = cropProducts.length;        
    
    const handlePaginateNextPage = () => {
        setPaginationCurrentPageNum(paginationCurrentPageNum + 1);
    };

    const handleFilterChange = (filterType, data) => {
        if (paginationCurrentPageNum !== 1) {
            setPaginationCurrentPageNum(1);
        }
        setFilterOptions(prev => ({...prev, [filterType]: data}));        
    };    

    const sortOptions = Object.values(SORT_ORDERS).map(entry => 
        ({title: entry.title, value: entry.key })
    );

    const handleSortOrderChange = (sortOption) => {
        const sortOrderVal = Object.values(SORT_ORDERS).find(entry => entry.key === sortOption.value);
        setSortOrder(sortOrderVal);
    }

    return (        
        PRODUCTS_DISPLAYED > 0 &&
        <>
            <SortDropdown 
                options={sortOptions}
                defaultOption={sortOptions[1]}
                onChange={handleSortOrderChange}
            />
            <div className="collapse" id="collapseTags">               
                 <div className="container m-2 d-flex flex-wrap">
                    <ProductsTags tagsArray={data.productsTags} onChange={(data) => handleFilterChange('tags', data)}/> 
                </div>
            </div>           

            <div className="row row-cols-4 m-2">
                {                    
                    cropProducts.map((product, key) => (
                        <ProductListCard 
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
