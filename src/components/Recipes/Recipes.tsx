import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import RecipeItem from '../RecipeItem/RecipeItem';
import api from '../../configs/api';
import events from '../../helpers/events';

interface StyleProps {
  container: BaseCSSProperties;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 68,
    },
    itemsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    pageTitle: {
      fontSize: 20,
      margin: 10,
    },
  })
);

export const Recipes = () => {
  const classes = useStyles({} as StyleProps);
  const [recipes, setRecipes] = useState<any>([]);

  const getRecipes = async () => {
    try {
      const result = await api.get('recipes');
      setRecipes(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipes();

    events.$on('refresh-recipes', () => {
      getRecipes();
    });

    return () => {
      events.$off('refresh-recipes');
    };
  }, []);

  return (
    <Container className={classes.container}>
      <Typography className={classes.pageTitle}>Recipes Page</Typography>
      <div className={classes.itemsContainer}>
        {recipes &&
          recipes.map((recipe: any, index: any) => (
            <RecipeItem data={recipe} key={index} />
          ))}
      </div>
    </Container>
  );
};

export default Recipes;
