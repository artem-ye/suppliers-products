import React from 'react';
import PropTypes from 'prop-types';
import ImageLoader from '../imageLoader';

const CarouselItem = ({imageSrc, isActive, imageAspectRatioPercent}) => {
	const spinner = (		
		<div>
			<div className="carousel-caption d-none d-md-block" style={{marginTop: `${imageAspectRatioPercent}%`}}>
				<h5>
					<span className="spinner-border spinner-border-sm" role="status"/>						
					&nbsp;loading...
				</h5>
				<p>please wait</p>
			</div>		
		</div>
	);		

	return (		
		<div 
        	className={'carousel-item ratio ' + (isActive ? ' active' : '')}
        	style={{'--bs-aspect-ratio': `${imageAspectRatioPercent}%`}}
        	data-bs-interval="5000"
        >			
			<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				<ImageLoader src={imageSrc} className="img-fluid card-img-top" alt="" spinner={spinner} style={{height: 'auto'}}/>
			</div>
		</div>
	);
};

CarouselItem.propTypes = {
    imageSrc: PropTypes.string.isRequired,    
    imageAspectRatioPercent: PropTypes.number.isRequired,
    isActive: PropTypes.bool
};

CarouselItem.defaultProps = {
    isActive: false    
};

export default CarouselItem;