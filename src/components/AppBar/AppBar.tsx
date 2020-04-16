import React from 'react';
import {
  AppBar as Bar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import {
  makeStyles,
  fade,
  createStyles,
  Theme,
} from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { Menu as MenuIcon } from '@material-ui/icons';

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
      display: 'none',
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
  const classes = useStyles();
  return (
    <Bar position="relative">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Crescendo App Exam
        </Typography>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </Bar>
  );
};

export default AppBar;
