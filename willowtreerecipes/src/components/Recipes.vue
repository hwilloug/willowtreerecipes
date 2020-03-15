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
		}
	}
}
</script>

<style>
	
#all-recipes th, td {
	border: 1px solid lightgrey;
}	

#all-recipes {
	border-collapse: collapse;
}

#all-recipes th, td {
	padding: 15px;
}

#all-recipes th {
	background-color: plum;
}

#all-recipes tr:hover {
	background-color: linen;
}
</style>
