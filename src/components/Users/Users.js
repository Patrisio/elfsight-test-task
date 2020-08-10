import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';

const Users = ({ users }) => {
  return <List
            data={users}
            route="/users/:id/albums"
            classes="list list-users"
          />
};

export default Users;

Users.propTypes = {
  users: PropTypes.array.isRequired,
}