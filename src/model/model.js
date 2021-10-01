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
                    id:  encodeURIComponent(el.supplier),                
                    productsCount: el.products.length
                }            
            });
           
            this.suppliersProducts = data.reduce((acc, el) => {               
                return {...acc, [encodeURIComponent(el.supplier)]: el.products}                
            }, {});                                   

            // const supp = this.suppliers[0];
            // const prods = this.getSupplierProducts(supp);
            // console.log(prods[0]);
            // console.log(this.getProductsTags(prods));
    
            resolve();           
        });
    };
    
    getSuppliers() {
        return this.suppliers;
    }    

    getSupplierProducts(supplier) {
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
