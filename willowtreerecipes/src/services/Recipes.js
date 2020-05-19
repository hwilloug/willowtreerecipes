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
		}).then((resp) => {
			return new Promise ( (resolve, reject) => {
				let steps_added = 0;
				for (let s=0; s<steps.length; s++) {
					Api().post(`/recipes/${resp.data.insertId}/steps`, {
						step_number: s+1,
						instructions: steps[s]
					}).then(() => {
						steps_added++
						if (!resp.data.insertId) reject('recipeID is not defined');
						if (steps_added == steps.length) {
							resolve(resp.data.insertId);
						}
					})
				}
			})
		}).then((resp) => {
			for (let i=0; i<ingredientsArray.length; i++) {
				Api().post(`/recipes/${resp}/steps/${ingredientsArray[i].step}/ingredients`, {
					ingredient_name: ingredientsArray[i].ingredient_name,
					amount: ingredientsArray[i].amount
				}).then((resp) => console.log(resp));
			}
		})
	},
}

