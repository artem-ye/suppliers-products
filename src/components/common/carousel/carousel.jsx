import React from 'react';
import PropTypes from 'prop-types';

import CarouselIndicatorButton from './carouselIndicatorButton';
import CarouselItem from './carouselItem';
import * as DEFAULTS from './defaults';

const Carousel = ({images, itemAspectRatioPercent}) => {	
	const ITEM_ASPECT_RATIO_PERCENT = itemAspectRatioPercent;

	const renderSideControlItems = () => {				
		const imagesToSideControls = (_, index) => (
			<CarouselIndicatorButton 
				key={index} 
				itemIndex={index}
				isActive={isActiveIndex(index)}
			/>
		);
		return images.map(imagesToSideControls);
	};

	const renderItems = () => {
		if (!images || images.length === 0) {
			return null;
		}

		const imagesToItems = (src, index) => (
			<CarouselItem 
				key={index} 
				imageSrc={src} 				
				imageAspectRatioPercent={ITEM_ASPECT_RATIO_PERCENT}
				isActive={isActiveIndex(index)}				
			/>
		);
		return images.map(imagesToItems);
	}

	const CONTROLS_PERSIST = images.length > 1;
	
	return (
		<div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
			{CONTROLS_PERSIST &&
				<div className="carousel-indicators">
					{renderSideControlItems()}
				</div>	
			}			

			<div className="carousel-inner">	
				{renderItems()}				
			</div>						
			
			{CONTROLS_PERSIST &&
				<>
					<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Next</span>
					</button>						
				</>
			}
		</div>
	);
};

const isActiveIndex = (i) => i === 0;

Carousel.propTypes = {
	images: PropTypes.arrayOf(PropTypes.string).isRequired,
	itemAspectRatioPercent: PropTypes.number	
}

Carousel.defaultProps = {
	itemAspectRatioPercent: DEFAULTS.IMG_ASPECT_RATIO_PERCENT	
}

export default Carousel;