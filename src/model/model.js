function supplierToHashCode(s){
    return 'sup'+s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);                     
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
    
            this.suppliers = data.map((el, index) => {                        
                return {
                    supplier: el.supplier,                    
                    id: supplierToHashCode(el.supplier).toString(),
                    productsCount: el.products.length
                }            
            });
           
            this.suppliersProducts = data.reduce((acc, el) => {               
                return {...acc, [supplierToHashCode(el.supplier)]: el.products}                
            }, {});                                               
    
            resolve();           
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

        return Object.keys(list).sort();
    }
}

export default SuppliersCatalogueModel;
