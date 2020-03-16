import Api from '@/services/Api'

/*
	API for the recipes database
*/

export default {
	// Loads all recipes from the database
	loadRecipes () {
		return Api().get('/recipes');
	},

	// Loads a specific recipe from the database
	loadRecipeEntry (recipeID) {
		return Api().get(`/recipes/${recipeID}`);
	},

	loadRecipeSteps (recipeID) {
		return Api().get(`/recipes/${recipeID}/steps`);
	},

	loadRecipeIngredients (recipeID) {
		return Api().get(`/recipes/${recipeID}/ingredients`);
	},
}

