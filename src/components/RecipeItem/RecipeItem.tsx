import React from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { useHistory } from 'react-router-dom';
import events from '../../helpers/events';

interface StyleProps {
  root: BaseCSSProperties;
}

interface IRecipeItem {
  data: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '40%',
      margin: 10,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    media: {
      height: 150,
    },
  })
);

export const RecipeItem = ({ data }: IRecipeItem) => {
  const history = useHistory();
  const classes = useStyles({} as StyleProps);
  const { title, description, images } = data;
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => history.push(`/recipe/${data.uuid}`)}>
        <CardMedia
          component="img"
          className={classes.media}
          image={
            images
              ? `http://localhost:3001${images.full}`
              : `${process.env.PUBLIC_URL}/default-recipe-image.png`
          }
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => history.push(`/recipe/${data.uuid}`)}
        >
          Open Recipe
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => events.$emit('update-recipe', data)}
        >
          Update Recipe
        </Button>
      </CardActions>
    </Card>
  );
};

export default RecipeItem;
