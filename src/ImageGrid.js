import React from 'react';
import "./util/ImageGrid.css";
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import placeholderImage from './util/home.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ImageGrid = ({ curatedPhotos }) => {

  return (
    <div data-testid="imageGrid" className="container">
        {curatedPhotos.map((image, index) => (
          <div className = "image">
          <LazyLoadImage className = "image" src={image.src.original} PlaceholderSrc={placeholderImage} key ={index}  effect= "blur" alt={image.alt}/>
          <ImageListItemBar subtitle={image.photographer}
            actionIcon={
              <IconButton  href={image.photographer_url} sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
              <InfoIcon  />
              </IconButton>}/>
          </div>
        ))}
    </div> 
    
  )
}

export default ImageGrid;
