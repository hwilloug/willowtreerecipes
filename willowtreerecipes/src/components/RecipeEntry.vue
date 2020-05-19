<template>
<div>
	<button @click='back'>Back to All Recipes</button>
	<h1>{{ recipe.name }}</h1>
	<div class='description'>
		<p><b>Time to complete: </b>{{ recipe.time }}</p>
		<p><b>Difficulty: </b>{{ recipe.difficulty }}</p>
		<p><b>Description: </b>{{ recipe.description }}</p>
	</div>
	<hr class='solid'>
	<div class='recipe-info'>
	<aside class='left'>
	<h4>Ingredients</h4>
	<ul>
		<li
			id='ingredients'
			v-for='ingredient in ingredients'
			:key='ingredient.ingredient'
		>{{ ingredient.amount }} {{ ingredient.ingredient_name }}</li>
	</ul>
	</aside>
	<section>
	<h4>Directions</h4>
	<ol>
		<li
			id='instructions'
			v-for='step in steps'
			:key='step.id'
		>{{ step.instructions }}</li>
	</ol>
	</section>
	</div>

	<aside class='other-recipes'>
		<h5>Other recipes you may like:</h5>
		<!-- TODO maybe include a couple random recipes here (new component?) -->
	</aside>
</div>
</template>


<script>
import Recipes from '@/services/Recipes'
import router from '@/router/index'

export default {
	name: 'RecipePage',
	props: ['recipeID'],
	data () {
		return {
			recipe: {},
			steps: [],
			ingredients: []
		}
	},
	created () {
		// Load recipe entry
		Recipes.loadRecipeEntry(this.recipeID)
			.then( response => {
				this.recipe = response.data[0];
			})
			.catch((error) => {
				if (error.response) {
					// The request was made and the server responded
					// with a status code that isn't 2XX
					if (error.response.status) this.$router.push('/404');
				} else if (error.request) {
					// The request was made but no response was received
					console.log(error.request);
				} else {
					// Something else went wrong..
					console.log('Error: ', error.message);
				}
			});
		
		// Load recipe steps
		Recipes.loadRecipeSteps(this.recipeID)
			.then (response => {
				this.steps = response.data;
			})
			.catch((e) => {
				if (e.response) {
					if (e.response.status) console.log('No steps found for this recipe')
				} else if (e.request) console.log(e.request);
				else console.log(e.message);
			});

		Recipes.loadRecipeIngredients(this.recipeID)
			.then (response => {
				this.ingredients = response.data;
			})
			.catch((e) => {
			if (e.response) {
				if (e.response.status) console.log('No ingredients found for this recipe')
			} else if (e.request) console.log(e.request);
			else console.log(e.message);
			});
	},
	methods: {
		back: () => {
			router.push('/recipes');
		}
	}
}
</script>


<style>
button {
	cursor: pointer;
	float: right;
	margin: 10px;
}

hr.solid {
	border-top: 1px solid darkgrey;
}

li {
	padding: 10px;
}

.description {
	background-color: lavender;
	padding: 10px;
}

.left {
	flex-grow: 1;
	padding: 10px;
	background-color: lightblue;
}

.other-recipes {
	background-color: lightpink;
	padding: 10px;
}

section {
	flex-grow: 5;
	background-color: lightgreen;
	padding: 10px;
}

.recipe-info {
	display: flex;
	flex-direction: row;
}
</style>
