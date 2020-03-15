import Api from '@/services/Api'

export default {
	// Loads all recipes from the database
	loadRecipes () {
		return Api().get('/recipes');
	},

	// Loads a specific recipe from the database
	loadRecipeEntry (recipeID) {
		return Api().get(`/recipes/${recipeID}`);
	}
}

