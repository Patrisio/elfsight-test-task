import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './List.scss';

const List = ({ data, route, search, getPhotosCount, classes, cover }) => {
  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';

    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  return (
    <ul className={classes}>
    {data.map((item, idx) => {
      let formattedRoute = route.replace(/:id/g, item.id);
      let link = {
        pathname: formattedRoute,
        search: search || '',
      };
      let itemName = item.name || item.title;

      return (
        <li className="list__item" key={`user_${item.id}_${Math.random()}`}>
          <Link to={link} className="list__item-link">
            <span className="list__item-order">{ idx + 1 }</span>
            {cover ? (<figure className="list__item-cover" style={{ background: getRandomColor() }}></figure>) : null}
            <div className="list__item-content">
              <p className="list__item-title">{ itemName }</p>
              <p className="list__item-count">{getPhotosCount ? `${getPhotosCount(item.id)} photos` : null}</p>
            </div>
          </Link>
        </li>
      );
    })}
  </ul>
  )
};

export default List;

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number.isRequired,
  })).isRequired,
  route: PropTypes.string.isRequired,
  search: PropTypes.string,
  getPhotosCount:PropTypes.func,
  classes: PropTypes.string,
  cover: PropTypes.bool,
};