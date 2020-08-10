import { useEffect, useState } from 'react';
import { isNotEmptyArray } from '../utils/validationRules';

export let cachedData = {
  users: [],
  albums: [],
  photos: [],
};

export const useFetch = (pathname, currentData, id) => {
  let initialState = currentData === 'albums'
    ? {
      albums: [],
      photos: [],
    } : [];
  const [data, setData] = useState(initialState);
  const hasCachedData = (currentData, currentId) => {
    return isNotEmptyArray(cachedData[currentData].filter(item => item[currentId] === id));
  };
  const setFilteredData = (currentData, currentId) => {
    currentData === 'albums'
    ? setData({
      albums: cachedData[currentData].filter(item => item[currentId] === id),
      photos: cachedData.photos,
    })
    : setData(cachedData[currentData].filter(item => item[currentId] === id));
  };
  const getGetParams = (albums) => {
    let getParams = '?';

    for (let i = 0; i < albums.length; i++) {
      let id = albums[i].id;
      getParams = getParams.concat('albumId=', id, '&');
    }
    
    return getParams;
  };
  const setCachedData = (currentData, data) => {
    isNotEmptyArray(cachedData[currentData])
      ? cachedData[currentData] = cachedData[currentData].concat(data)
      : cachedData[currentData] = data;
  };

  const fetchData = (currentData, pathname) => {
    switch (true) {
      case currentData === 'users' && hasCachedData(currentData, 'id'):
        setFilteredData(currentData, 'id');
        break;
      case currentData === 'albums' && hasCachedData(currentData, 'userId'):
        setFilteredData(currentData, 'userId');
        break;
      case currentData === 'photos' && hasCachedData(currentData, 'albumId'):
        setFilteredData(currentData, 'albumId');
        break;
      default:
        loadData(pathname);
    }
  };

  const loadData = (pathname) => {
    const endpoint = `https://jsonplaceholder.typicode.com${pathname}`;
    
    fetch(endpoint)
      .then((response) => response.json())
      .then((json) => {
        setCachedData(currentData, json);
        setData(json);
        if (currentData === 'albums') {
          fetch(`https://jsonplaceholder.typicode.com/photos${getGetParams(json)}`)
            .then(response => response.json())
            .then(photos => {
              setCachedData('photos', photos);
              setData({
                albums: json,
                photos: photos,
              });
            })
        }
      })
  }

  useEffect(() => {
    if (!pathname) return;

    fetchData(currentData, pathname);
  }, [pathname]);
  
  return currentData === 'albums' ? data : { [currentData] : data };
}
