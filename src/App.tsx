/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Switch, useHistory, useLocation } from 'react-router-dom';
import './App.sass';
import Recipes from './components/Recipes/Recipes';
import Recipe from './components/Recipe/Recipe';
import PrivateRoute from './PrivateRoute';
import CreateRecipeModal from './components/Modal/CreateRecipeModal';

function App() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      history.push('/recipes/');
    }
  }, [location]);

  return (
    <div id="crescendo-app">
      <CreateRecipeModal />
      <Switch>
        <PrivateRoute path="/recipes/" component={() => <Recipes />} />
        <PrivateRoute path="/recipe/:id" component={() => <Recipe />} />
      </Switch>
    </div>
  );
}

export default App;
