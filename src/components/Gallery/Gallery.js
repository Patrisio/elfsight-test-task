import React, { useState, useRef } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import BodyPortal from '../BodyPortal';
import Container from '../Container';
import Button from '../Button';
import { useFetch } from '../../utils/hooks';

import './Gallery.scss';

const THUMBNAIL_URL_HEIGHT_INDEX = 3;

const Gallery = () => {
  let { id } = useParams();
  const userId = useLocation().search.split('=')[1] || JSON.parse(localStorage.getItem('userId'));
  const [isShownLightBox, setLightBoxState] = useState(false);
  const [selectedImgIndex, setSelectedImgIndex] = useState(null);
  const galleryEl = useRef(null);
  const route = `/users/${userId}/albums`;

  localStorage.setItem('userId', userId);
  
  const { photos } = useFetch(`/albums/${id}/photos`, 'photos', parseInt(id));

  const toggleControls = () => {
    isShownLightBox ? setLightBoxState(false) : setLightBoxState(true);
  };

  const toggleLightBox = (idx) => {
    isShownLightBox ? setLightBoxState(false) : setLightBoxState(true);
    setSelectedImgIndex(idx);
  };

  const images = photos.length !== 0 ? 
    (
      <ol ref={galleryEl} className="photos">
        {photos.map((photo, index) => {
          const photoHeight = { height: `${photo.thumbnailUrl.split('/')[THUMBNAIL_URL_HEIGHT_INDEX]}px` };

          return (
            <li key={`album_${id}_${Math.random()}`} className="photos__item" style={photoHeight}>
              <img src={photo.thumbnailUrl} className="photos__content" onClick={toggleLightBox.bind(this, index)}/>
            </li>
          );
        })}
      </ol>
    ) :
    (<p ref={galleryEl}>Загрузка...</p>);

  const lightbox = isShownLightBox ?
    (
      <BodyPortal>
        <Container
          selectedImgIndex={selectedImgIndex}
          images={photos}
          toggleControls={toggleControls}
        />
      </BodyPortal>
    ) :
    null;

  return (
    <>
      {userId ? 
      <Link to={route}>
        <Button
          icon="back-arrow"
          size={ 34 }
          theme="dark"
        />
      </Link> : null}
      {images}
      {lightbox}
    </>
  );
}

export default Gallery;