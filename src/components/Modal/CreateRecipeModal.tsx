import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  FormControl,
  FormGroup,
  FormLabel,
  Tooltip,
  Button,
  FormControlLabel,
  Switch,
  CircularProgress,
} from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';
import events from '../../helpers/events';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import api from '../../configs/api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      padding: '0 20px !important',
    },
    ingredients: {
      marginTop: 10,
    },
    ingredientsInputGroup: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
    },
    formGroupLabel: {
      fontSize: 12,
      color: '#3f51b5',
    },
    ingredient: {
      margin: 5,
    },
    directions: {
      marginTop: 10,
    },
    directionsInputGroup: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
    },
    direction: {
      margin: 5,
      flex: 1,
    },
    otherInfo: {
      margin: 5,
    },
    btnContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin: '10px 0',
    },
    btn: {
      width: 130,
    },
  })
);

export const CreateRecipeModal = () => {
  const classes = useStyles();
  const [action, setAction] = useState('create');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipeName, setRecipeName] = useState<string>('');
  const [recipeDescription, setRecipeDescription] = useState<string>('');
  const [servings, setServings] = useState<number>(0);
  const [prepTime, setPrepTime] = useState<number>(0);
  const [cookTime, setCookTime] = useState<number>(0);
  const [ingredients, setIngredients] = useState<any[]>([
    {
      name: '',
      amount: 0,
      measurement: '',
    },
  ]);
  const [directions, setDirections] = useState<any[]>([
    {
      instructions: '',
      optional: false,
    },
  ]);
  const [recipeId, setRecipeId] = useState<string>('');

  const form = {
    title: recipeName,
    description: recipeDescription,
    directions,
    ingredients,
    servings,
    prepTime,
    cookTime,
  };

  const handleIngredientChange = (event: any, index: any, type: any) => {
    const updatedIngredient = [...ingredients];
    updatedIngredient[index][type] = event.target.value;
    setIngredients(updatedIngredient);
  };

  const handleDirectionChange = (value: any, index: any, type: any) => {
    const updatedDirection = [...directions];
    updatedDirection[index][type] = value;
    setDirections(updatedDirection);
  };

  const clearFields = () => {
    setRecipeName('');
    setRecipeDescription('');
    setDirections([]);
    setIngredients([]);
    setServings(0);
    setPrepTime(0);
    setCookTime(0);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (action === 'update') {
        await api.patch(`recipes/${recipeId}`, form);
      } else {
        await api.post('recipes', form);
      }
      events.$emit('refresh-recipes');
      setIsOpen(false);
      clearFields();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    events.$on('add-recipe', (state: boolean) => {
      setIsOpen(state);
      setAction('create');
    });
    events.$on('update-recipe', (data: any) => {
      setAction('update');
      setRecipeName(data.title || '');
      setRecipeDescription(data.description || '');
      setDirections(data.directions || []);
      setIngredients(data.ingredients || []);
      setServings(data.servings || 0);
      setPrepTime(data.prepTime || 0);
      setCookTime(data.cookTime || 0);
      setRecipeId(data.uuid || '');
      setIsOpen(true);
    });

    return () => {
      events.$off('add-recipe');
      events.$off('update-recipe');
    };
  }, []);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>
        {action === 'update' ? `${recipeName}` : 'Create New Recipe'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`To ${
            action === 'update' ? 'update this' : 'create new'
          } recipe please provide all informations needed below:`}
        </DialogContentText>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl fullWidth variant="standard">
            <TextField
              label="Recipe Name"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth variant="standard">
            <TextField
              label="Recipe Description"
              value={recipeDescription}
              onChange={(e) => setRecipeDescription(e.target.value)}
            />
          </FormControl>
          <FormControl
            fullWidth
            variant="standard"
            className={classes.ingredients}
          >
            <FormLabel className={classes.formGroupLabel}>
              Ingredients
            </FormLabel>
            {ingredients.map(({ name, amount, measurement }, index) => (
              <FormGroup key={index} className={classes.ingredientsInputGroup}>
                <TextField
                  className={classes.ingredient}
                  label="Name"
                  value={name}
                  onChange={(e) => handleIngredientChange(e, index, 'name')}
                />
                <TextField
                  className={classes.ingredient}
                  label="Amount"
                  value={amount}
                  type="number"
                  onChange={(e) => handleIngredientChange(e, index, 'amount')}
                />
                <TextField
                  className={classes.ingredient}
                  label="Measurement"
                  value={measurement}
                  onChange={(e) =>
                    handleIngredientChange(e, index, 'measurement')
                  }
                />
                {index === ingredients.length - 1 ? (
                  <Tooltip title="Add Ingredient">
                    <AddIcon
                      onClick={() =>
                        setIngredients([
                          ...ingredients,
                          {
                            name: '',
                            amount: 0,
                            measurement: '',
                          },
                        ])
                      }
                    />
                  </Tooltip>
                ) : (
                  <RemoveIcon
                    onClick={() => {
                      setIngredients(
                        ingredients.filter(
                          (item, ingredientIdx) => ingredientIdx !== index
                        )
                      );
                    }}
                  />
                )}
              </FormGroup>
            ))}
          </FormControl>
          <FormControl
            fullWidth
            // variant="standard"
            className={classes.directions}
          >
            <FormLabel className={classes.formGroupLabel}>Directions</FormLabel>
            {directions.map(({ instructions: inst, optional }, idx) => (
              <FormGroup key={idx} className={classes.directionsInputGroup}>
                <TextField
                  className={classes.direction}
                  label={`Instruction ${idx + 1}`}
                  value={inst}
                  onChange={(e) =>
                    handleDirectionChange(e.target.value, idx, 'instructions')
                  }
                />
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      color="primary"
                      checked={optional}
                      onChange={(e) =>
                        handleDirectionChange(e.target.checked, idx, 'optional')
                      }
                    />
                  }
                  label="Optional"
                  labelPlacement="top"
                />
                {idx === directions.length - 1 ? (
                  <Tooltip title="Add Instruction">
                    <AddIcon
                      onClick={() =>
                        setDirections([
                          ...directions,
                          {
                            instructions: '',
                            optional: false,
                          },
                        ])
                      }
                    />
                  </Tooltip>
                ) : (
                  <RemoveIcon
                    onClick={() => {
                      setDirections(
                        directions.filter(
                          (item, directionIdx) => directionIdx !== idx
                        )
                      );
                    }}
                  />
                )}
              </FormGroup>
            ))}
          </FormControl>
          <FormControl
            fullWidth
            variant="standard"
            className={classes.ingredients}
          >
            <FormLabel className={classes.formGroupLabel}>Other info</FormLabel>
            <FormGroup className={classes.ingredientsInputGroup}>
              <TextField
                label="Servings"
                className={classes.otherInfo}
                type="number"
                value={servings}
                onChange={(e) => setServings(parseInt(e.target.value))}
              />
              <TextField
                label="Prepartion Time"
                className={classes.otherInfo}
                type="number"
                value={prepTime}
                onChange={(e) => setPrepTime(parseInt(e.target.value))}
              />
              <TextField
                label="Cook Time"
                className={classes.otherInfo}
                type="number"
                value={cookTime}
                onChange={(e) => setCookTime(parseInt(e.target.value))}
              />
            </FormGroup>
          </FormControl>
          <div className={classes.btnContainer}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.btn}
            >
              Save
              {isLoading && (
                <CircularProgress
                  size={16}
                  color="inherit"
                  style={{ marginLeft: 8 }}
                />
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipeModal;
