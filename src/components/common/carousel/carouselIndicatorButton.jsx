import React from 'react';
import PropTypes from 'prop-types';

const CarouselIndicatorButton = ({itemIndex, isActive}) => {	
	return (
		<button 
			type="button" 
			data-bs-target="#carouselExampleDark" 
			data-bs-slide-to={itemIndex} 
			className={isActive ? 'active' : ''} 
			aria-current={isActive ? 'true' : 'false'}
			aria-label={`Slide ${itemIndex+1}`}
		/>		
	);
};

CarouselIndicatorButton.propTypes = {
    imageIndex: PropTypes.number,
    isActive: PropTypes.bool    
}

export default CarouselIndicatorButton;