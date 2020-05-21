<template>
<table id='random-recipes'>
<tr>
	<th>Name</th>
	<th>Description</th>
	<th>Difficulty</th>
	<th>Time to Complete</th>
	<th>Date Created</th>
</tr>
	<RecipesTableEntries
		id='recipe-entry'
		v-for='recipe in randomRecipes'
		:key='recipe.id'
		:recipeEntry='recipe'
		@click.native='routeToEntry(recipe.id)'>
	</RecipesTableEntries>
</table>
</template>

<script>
import Recipes from '@/services/Recipes'
import RecipesTableEntries from './RecipesTableEntries.vue'

export default {
	name: 'random-recipe',
	props: [
		'numberOfRandomRecipes',
		'currentRecipe'
	],
	components: {
		RecipesTableEntries
	},
	data () {
		return {
			randomRecipes: [ ],
			numberOfRecipes: 3
		}
	},
	created () {
		this.numberOfRecipes = this.numberOfRandomRecipes;
		Recipes.loadRecipes().then( response => {
			const totalNumRecipes = response.data.length;
			if (this.numberOfRecipes > (totalNumRecipes - 1))
				this.numberOfRecipes = (totalNumRecipes - 1);
			let randomIndecies = [];
			while (this.randomRecipes.length<this.numberOfRecipes) {
				let randomRecipeId = Math.floor(Math.random()*(totalNumRecipes));
				if (!(randomIndecies.includes(randomRecipeId)) && (response.data[randomRecipeId].id != this.currentRecipe)) {
					randomIndecies.push(randomRecipeId);
					this.randomRecipes.push(response.data[randomRecipeId]);
				}
			}
		})
	},
	methods: {
		routeToEntry (recipeID) {
			this.$router.push(`/recipes/${recipeID}`);
			this.$router.go();
		}
	},
}
</script>

<style>

</style>
