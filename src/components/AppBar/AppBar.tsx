import React from 'react';
import {
  AppBar as Bar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
} from '@material-ui/core';
import {
  makeStyles,
  fade,
  createStyles,
  Theme,
} from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { Add as AddIcon, ArrowBack } from '@material-ui/icons';
import { useParams, useHistory } from 'react-router-dom';
import events from '../../helpers/events';

interface StyleProps {
  root: BaseCSSProperties;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    actionsContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    addIcon: {
      display: 'flex',
      alignItem: 'center',
      marginRight: 10,
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
    },
  })
);

export const AppBar = () => {
  const classes = useStyles({} as StyleProps);
  const { id } = useParams();
  const history = useHistory();
  return (
    <Bar position="fixed">
      <Toolbar>
        {id && (
          <Tooltip title="Back to Recipes Page">
            <IconButton
              onClick={() => history.push('/recipes')}
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <ArrowBack />
            </IconButton>
          </Tooltip>
        )}
        <Typography variant="h5" className={classes.title}>
          Crescendo App Exam
        </Typography>
        <Tooltip title="Create Recipe">
          <IconButton
            onClick={() => events.$emit('add-recipe', true)}
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </Bar>
  );
};

export default AppBar;
