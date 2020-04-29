<template>
	<div>
		<button @click='addRecipe'>Add Recipe</button>
		<h1>Recipes :)</h1>
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
	border: 1px solid #869D7A;
	padding: 15px;
}	

.recipes-table {
	display: flex;
	justify-content: center;
}

#all-recipes {
	border-collapse: collapse;
}

#all-recipes th {
	background-color: #869D7A;
	color: #EFE5FB;
}

#all-recipes td {
	border: 1px solid #E1D4B1;
	color: #8B5D33;
}

#recipe-entry:hover {
	background-color: #E1D4B1;
	cursor: pointer;
}

button {
  border-radius: 0.25rem;
  cursor: pointer;
	float: right;
}

</style>
