<template>
	<div>
		<h1>Recipes :)</h1>
		<table id='all-recipes'>
			<tr>
				<th>Name</th>
				<th>Description</th>
				<th>Difficulty</th>
				<th>Time to Complete</th>
				<th>Date Created</th>
			</tr>
			<RecipesTableEntries
				id='recipe-entry'
				v-for='recipe in allRecipes'
				:key='recipe.id'
				:recipeEntry='recipe'
				@click.native='routeToEntry(recipe.id)'
			></RecipesTableEntries>
		</table>
		<br>
		<button @click='addRecipe'>Add Recipe</button>
	</div>
</template>

<script>
	import Recipes from '@/services/Recipes'
	import RecipesTableEntries from './RecipesTableEntries.vue'
	import router from '@/router/index'

	export default {
	data() {
		return {
			allRecipes: [	]
		}
	},
	components: {
		RecipesTableEntries
	},
  created () {
    Recipes.loadRecipes().then( response => {
			this.allRecipes = response.data;
    })
  },
	methods: {
		routeToEntry: (recipeID) => {
			router.push(`/recipes/${recipeID}`);
		},
		addRecipe: () => {
			router.push('new-recipe')
		}
	}
}
</script>

<style>
	
#all-recipes th, td {
	border: 1px solid lightgrey;
	padding: 15px;
}	

#all-recipes {
	border-collapse: collapse;
}

#all-recipes th {
	background-color: plum;
}

#recipe-entry:hover {
	background-color: linen;
	cursor: pointer;
}

button {
  border-radius: 0.25rem;
  cursor: pointer;
}

</style>
