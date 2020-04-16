/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Switch, useHistory } from 'react-router-dom';
import './App.sass';
import Recipes from './components/Recipes/Recipes';
import Ingredients from './components/Ingredients/Ingredients';
import PrivateRoute from './PrivateRoute';

function App() {
  const history = useHistory();

  useEffect(() => {
    history.push('/recipes/');
  }, []);

  return (
    <div id="crescendo-app">
      <Switch>
        <PrivateRoute path="/recipes/:id?" component={() => <Recipes />} />
        <PrivateRoute
          path="/ingredients/:id?"
          component={() => <Ingredients />}
        />
      </Switch>
    </div>
  );
}

export default App;
