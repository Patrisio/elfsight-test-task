import React from 'react';
import { useParams, Link } from "react-router-dom";
import Button from '../Button';
import List from '../List';
import { useFetch } from '../../utils/hooks';
import { isNotEmptyArray } from '../../utils/validationRules';

const Albums = () => {
  let { id } = useParams();
  let data = useFetch(`/users/${id}/albums`, 'albums', parseInt(id));
  
  const getPhotosCount = (id) => {
    return data.photos.filter(item => item.albumId === id).length;
  };

  if (isNotEmptyArray(data.albums)) {
    return (
      <>
        <Link to="/">
          <Button
            icon="back-arrow"
            size={34}
            theme="dark"
          />
        </Link>
        <List
          data={data.albums}
          route={'/albums/:id/photos'}
          search={`?userId=${id}`}
          getPhotosCount={getPhotosCount}
          classes="list list-albums"
          cover
        />
      </>
    )
  } else {
    return <p>Загрузка...</p>
  }
}

export default Albums;
