import React from 'react';
import Carousel from '../common/carousel';
// import { useSuppliersCatalogueModel } from '../../model/useSuppliersCatalogueModel';

const ProductCard = ({productSku}) => {
    // const {model} = useSuppliersCatalogueModel();
    //style="max-width: 540px;"
    // const containerStyle = {maxWidth: '1200px'};
    const containerStyle = {};

    const images = [
        // 'http://img.nothingshop.com/images/'+productSku+'/default/preview.jpg',
        'http://img.nothingshop.com/images/'+productSku+'/default/IMG_'+productSku+'_1_main.jpg',
        'http://img.nothingshop.com/images/'+productSku+'/default/IMG_'+productSku+'_2.jpg',
        'http://img.nothingshop.com/images/'+productSku+'/default/IMG_'+productSku+'_3.jpg',
        'http://img.nothingshop.com/images/'+productSku+'/default/IMG_'+productSku+'_4.jpg',
        'http://img.nothingshop.com/images/'+productSku+'/default/IMG_'+productSku+'_5.jpg',
        'http://img.nothingshop.com/images/'+productSku+'/default/IMG_'+productSku+'_6.jpg',
        'http://img.nothingshop.com/images/'+productSku+'/default/IMG_'+productSku+'_7.jpg',
        'http://img.nothingshop.com/images/'+productSku+'/default/IMG_'+productSku+'_8.jpg'
    ];

    return (
        <div className='container-xxl' style={containerStyle}>
            <div className="card mb-3 mt-2" >
                <div className="row g-0">
                    <div className="col-md-5">
                        
                        <Carousel images={images}/>

                    </div>
                    <div className="col-md-7">
                        <div className="card-body">
                            <h5 className="card-title">{productSku}</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ProductCard;