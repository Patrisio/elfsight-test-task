import React from 'react';
import Users from './components/Users';
import Albums from './components/Albums';
import Gallery from './components/Gallery';
import { Switch, Route } from "react-router-dom";
import { useFetch } from './utils/hooks';
import { isNotEmptyArray } from './utils/validationRules';
import './App.scss';

const App = () => {
  let { users } = useFetch('/users', 'users', 1);

  if (isNotEmptyArray(users)) {
    return (
      <Switch>
        <Route path="/" component={() => <Users users={users} />} exact />
        <Route path="/users/:id/albums" component={Albums} />
        <Route path="/albums/:id/photos" component={Gallery} />
      </Switch>
    )
  } else {
    return <p>Loading</p>
  }
}

export default App;