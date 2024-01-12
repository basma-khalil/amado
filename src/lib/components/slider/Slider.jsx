import { useRef } from 'react';
import ImageGallery from 'react-image-gallery';
import PropTypes from 'prop-types';
import './Slider.scss';

const Slider = ({ sliderImages }) => {
  const imageGallery = useRef();

  return (
    <ImageGallery
      ref={imageGallery}
      items={sliderImages}
      lazyLoad={true}
      autoPlay={true}
      slideInterval={5000}
      showPlayButton={false}
      showFullscreenButton={false}
      onMouseOver={() => imageGallery.current.pause()}
      onMouseLeave={() => imageGallery.current.play()}
      onClick={() => imageGallery.current.toggleFullScreen()}
    />
  );
};

Slider.propTypes = {
  sliderImages: PropTypes.array.isRequired,
};

export default Slider;
