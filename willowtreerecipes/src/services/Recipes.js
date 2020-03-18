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

	postNewRecipe (name, difficulty, time, description, ingredients, steps) {
		
		// Parse ingredients
		ingredients = ingredients.split(/\r?\n/);
		let ingredientsArray = [];
		for (let i=0; i<ingredients.length; i++) {
			let info = ingredients[i].split(', ');
			ingredientsArray.push({
				ingredient_name: info[0],
				amount: info[1],
				step: info[2]
			})
		}

		// Parse steps
		steps = steps.split(/\r?\n/);

		return Api().post('/recipes', {
			name: name,
			difficulty: difficulty,
			time: time,
			description: description,
			ingredients: ingredientsArray,
			steps: steps
		}).then((resp) => {
			console.log(resp)
		})
	},
}

