import Api from '@/services/Api'

/*
	API for the recipes database
*/

export default {
	// Loads all recipes from the database
	loadRecipes (sortCategory, sortDirection) {
		let url = `/recipes`;
		if (sortCategory && sortDirection) url = url.concat(`?sortCategory=${sortCategory}&sortDirection=${sortDirection}`)
		return Api().get(url);
	},

	// Loads a specific recipe from the database
	loadRecipeEntry (recipeID) {
		return Api().get(`/recipes/${recipeID}`);
	},

	// Loads the steps for a specific recipe from the database
	loadRecipeSteps (recipeID) {
		return Api().get(`/recipes/${recipeID}/steps`);
	},

	// Loads the ingredients for a specific recipe from the database
	loadRecipeIngredients (recipeID) {
		return Api().get(`/recipes/${recipeID}/ingredients`);
	},

	// Posts a new recipe
	postNewRecipe (name, difficulty, time, description, ingredients, steps) {
		
		// Parse ingredients
		ingredients = ingredients.split(/\r?\n/);
		let ingredientsArray = [];
		for (let i=0; i<ingredients.length; i++) {
			let info = ingredients[i].split(', ');
			ingredientsArray.push({
				ingredient_name: info[0],
				amount: info[1],
				ingredient_step: info[2]
			})
		}

		// Parse steps
		steps = steps.split(/\r?\n/);
		let stepsArray = []
		for (let step in steps) {
			stepsArray.push({
				step_number: step+1,
				instructions: steps[step]
			})
		}

		return Api().post('/recipes', {
			name: name,
			difficulty: difficulty,
			time: time,
			description: description,
			steps: stepsArray,
			ingredients: ingredientsArray
		})
	},
}

