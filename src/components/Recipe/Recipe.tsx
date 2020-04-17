/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Avatar,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { useParams } from 'react-router-dom';
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
    gridContainer: {
      marginTop: 10,
    },
    cardContainer: {
      width: '100%',
    },
    pageTitle: {
      fontSize: 20,
      margin: 10,
    },
    detailsTitle: {
      color: '#3f51b5',
      marginBottom: 5,
    },
    itemsListContainer: {
      alignItems: 'center',
    },
    itemNumber: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  })
);

export const Recipe = () => {
  const { id: recipeId } = useParams();
  const classes = useStyles({} as StyleProps);
  const [recipeDetails, setRecipeDetails] = useState<any>({
    title: '',
  });

  const getRecipeDetails = async () => {
    try {
      const response = await api.get(`recipes/${recipeId}`);
      setRecipeDetails(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipeDetails();
  }, [recipeId]);

  return (
    <Container className={classes.container}>
      <Container maxWidth="lg">
        <Card className={classes.cardContainer}>
          <CardMedia
            component="img"
            height={500}
            image={
              recipeDetails.images
                ? `http://localhost:3001${recipeDetails.images.full}`
                : `${process.env.PUBLIC_URL}/default-recipe-image.png`
            }
            title={recipeDetails.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {recipeDetails.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {recipeDetails.description}
            </Typography>
            <Grid container spacing={3} className={classes.gridContainer}>
              <Grid item xs={4}>
                <Typography variant="body1" className={classes.detailsTitle}>
                  Ingredients
                </Typography>
                {recipeDetails &&
                  recipeDetails.ingredients &&
                  recipeDetails.ingredients.map((item: any, index: any) => (
                    <Grid
                      container
                      wrap="nowrap"
                      spacing={2}
                      className={classes.itemsListContainer}
                    >
                      <Grid item>
                        <Avatar className={classes.itemNumber}>
                          <span style={{ fontSize: 16 }}>{index + 1}</span>
                        </Avatar>
                      </Grid>
                      <Grid item xs>
                        <Typography variant="body2">{`${item.name}, ${item.amount} ${item.measurement}`}</Typography>
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
              <Grid item xs={5}>
                <Typography variant="body1" className={classes.detailsTitle}>
                  Directions
                </Typography>
                {recipeDetails &&
                  recipeDetails.directions &&
                  recipeDetails.directions.map((item: any, index: any) => (
                    <Grid
                      container
                      wrap="nowrap"
                      spacing={2}
                      className={classes.itemsListContainer}
                    >
                      <Grid item>
                        <Avatar className={classes.itemNumber}>
                          <span style={{ fontSize: 16 }}>{index + 1}</span>
                        </Avatar>
                      </Grid>
                      <Grid item xs>
                        <Typography variant="body2">
                          {item.instructions}{' '}
                          <span style={{ color: 'red' }}>
                            {item.optional ? 'Optional' : ''}
                          </span>
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className={classes.detailsTitle}>
                  Other info
                </Typography>
                <Typography variant="body2">
                  Servings: {recipeDetails.servings || 'N/A'}
                </Typography>
                <Typography variant="body2">
                  Preparation Time: {recipeDetails.prepTime || 'N/A'}
                </Typography>
                <Typography variant="body2">
                  Cooking Time: {recipeDetails.cookTime || 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Container>
  );
};

export default Recipe;
