function strToHashCode(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

class SuppliersCatalogueModel {
    JSON_URL = '/suppliers_products.json';
    
    constructor() {
        this.suppliers = undefined;
        this.suppliersProducts = undefined;
    }

    init() {
        return this.fetchData();
    }

    async fetchData() {
        return new Promise(async (resolve, reject) => {            
            const res = await fetch(this.JSON_URL).catch(err => reject(err));
            const data = await res.json().catch(err => reject(err));                                             

            // Convert API data
            const {suppliers, suppliersProducts} = data.reduce((acc, el) => {
                const {suppliers, suppliersProducts} = {...acc};
                const supplierId = 'sup' + strToHashCode(el.supplier).toString();

                suppliers.push({
                    supplier: el.supplier.trim(),                    
                    id: supplierId,
                    productsCount: el.products.length
                });

                suppliersProducts[supplierId] = el.products;

                return {suppliers, suppliersProducts};
            }, {
                suppliers: [],
                suppliersProducts: {}
            });

            this.suppliers = suppliers.sort((a, b) => a.supplier > b.supplier ? 1 : -1);
            this.suppliersProducts = suppliersProducts;
    
            resolve(this);           
        });
    };
    
    getSuppliers() {
        return this.suppliers;
    }   
    
    getSupplierById(suppId) {
        if (!this.suppliers) {            
            return undefined;
        };

        return this.suppliers.find(e => e.id === suppId);
    }

    getSupplierProducts(supplier) {              
        if (!supplier) return undefined;
       
        const products = this.suppliersProducts[supplier.id];
        return products.map(product => {
            const title = product.title.slice(product.title.indexOf('/')+1);
            return {...product, title};
        });
    }

    getProductsTags(products) {
        const list = products.reduce((acc, el) => {
            return {...acc, [el.title]: el.title };
        }, {});

       

        const sortFn = (a, b) => a.trimStart().substring(0, 1) > b.trimStart().substring(0, 1) ? 1 : -1;

        return Object.keys(list).sort(sortFn);
    }

    getProductPreviewImageURL(product) {
        return `http://img.nothingshop.com/images/${product.sku}/default/preview.jpg`;
    }
}

export default SuppliersCatalogueModel;
