<template>
	<div>
		<button @click='addRecipe'>Add Recipe</button>
		<h2>Recipes :)</h2>
		<div class='recipes-table'>
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
		<br>
	</div>
</template>

<script>
	import Recipes from '@/services/Recipes'
	import RecipesTableEntries from './RecipesTableEntries.vue'
	import router from '@/router/index'

	export default {
	name: 'RecipesTable',
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
	padding: 15px;
}	

.recipes-table {
	width: 80%;
	margin: auto;
}

#all-recipes {
	border-collapse: collapse;
}

#all-recipes th {
	background-color: #869D7A;
	color: #EFE5FB;
}

#recipe-entry {
	border: 1px solid #E1D4B1;
	color: #8B5D33;
	background-color: white;
	word-wrap: normal;
}

#recipe-entry:hover {
	border: 1px solid #E1D4B1;
	background-color: #E1D4B1;
	cursor: pointer;
}

button {
  border-radius: 0.25rem;
  cursor: pointer;
	float: right;
}

</style>
