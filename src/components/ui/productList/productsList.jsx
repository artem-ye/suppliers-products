import React, {useState, useEffect} from 'react';
import { useSuppliersCatalogueModel } from '../../../model/useSuppliersCatalogueModel';
import ProductListCard from './productListCard';
import ProductsTags from '../../productsTags';
import SortDropdown from './productsListSortDropdown';

const PAGINATION_PAGE_SIZE = 3 * 6;
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

        return products.sort((a, b) => a.title > b.title ? 1 : -1);
    };    
    
    const filteredProducts = filterProducts(data.products);    
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

    // const controlsTextStyle = 'text-primary';

    const sortOptions = [
        {title: 'Артикул', value: 'sku'},
        {title: 'Наименование', value: 'title'},
        {title: 'Дата создания', value: 'default'}
    ];

    return (        
        PRODUCTS_DISPLAYED > 0 &&
        <>
            <SortDropdown 
                options={sortOptions}
                defaultOption={sortOptions[2]}
            />
            {/* <div className="btn-group m-2">
                <button 
                    className={"btn "+controlsTextStyle+" btn-sm dropdown-toggle"}
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapseTags" 
                    aria-expanded="false" 
                    aria-controls="collapseTags"
                >
                    Фильтр
                </button>

                <div className="dropdown ms-1">
                    <button 
                        className={"btn "+controlsTextStyle+" btn-sm dropdown-toggle"} 
                        type="button" 
                        id="dropdownMenuButton1" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                    >
                        Сортировка
                    </button>
                    <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton1">
                        <li><button className={"dropdown-item  "}>Артикул</button></li>
                        <li><button className="dropdown-item">Наименование</button></li>
                        <li><button className="dropdown-item">Дата создания</button></li>
                    </ul>
                </div>
            </div> */}

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
