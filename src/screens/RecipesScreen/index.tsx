import React, { useEffect, useState } from "react";
import { Recipe } from "../../typings/recipe";
import Screen from "../../components/Screen";
import RecipeItem from "./RecipeItem";
import { MD2Colors, Snackbar } from "react-native-paper";
import { View } from "react-native";
import RecipeForm from "./RecipeForm";
import RecipeDetails from "./RecipeDetails";
import useLocalStorage from "../../hooks/useLocalStorage";

const RecipesScreen = () => {
  const [recipes, setRecipes] = useLocalStorage("recipes", [] as Recipe[]);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [showRecipeForm, setShowRecipeForm] = useState<boolean>(false);
  const [showRecipeDetails, setShowRecipeDetails] = useState<boolean>(false);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | undefined>();

  const getInitialRecipe = (): Recipe => {
    return { id: recipes.length + 1, title: `Recipe ${recipes.length + 1}`, result: "" };
  };

  const saveRecipe = (newRecipe: Recipe) => {
    setRecipes([...recipes, newRecipe]);
    setShowSnackbar(true);
    resetStates();
  };

  const resetStates = () => {
    setShowRecipeForm(false);
    setShowRecipeDetails(false);
    setCurrentRecipe(undefined);
  };

  const openRecipeForm = () => {
    setCurrentRecipe(getInitialRecipe());
    setShowRecipeForm(true);
  };

  const openRecipeDetails = (recipe: Recipe) => {
    setCurrentRecipe(recipe);
    setShowRecipeDetails(true);
  };

  const deleteRecipe = (recipe: Recipe) => {
    setRecipes(recipes.filter((r) => r.id !== recipe.id));
  };

  return (
    <View>
      <Screen
        titleBarOptions={{
          title: "Recipes",
          buttons: [{ icon: "plus", onPress: () => openRecipeForm() }],
        }}
      >
        {recipes.map((recipe: Recipe) => (
          <RecipeItem key={recipe.id} recipe={recipe} onPress={() => openRecipeDetails(recipe)} onDelete={() => deleteRecipe(recipe)} />
        ))}
      </Screen>
      {currentRecipe && showRecipeForm ? <RecipeForm onCancel={() => resetStates()} onSave={saveRecipe} initialRecipe={currentRecipe} /> : void 0}
      {currentRecipe && showRecipeDetails ? <RecipeDetails recipe={currentRecipe} onClose={() => resetStates()} /> : void 0}
      <Snackbar
        children={"Recipe added"}
        visible={showSnackbar}
        duration={3000}
        onDismiss={() => setShowSnackbar(false)}
        icon="close"
        onIconPress={() => setShowSnackbar(false)}
        style={{
          backgroundColor: MD2Colors.green500,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
    </View>
  );
};

export default RecipesScreen;
