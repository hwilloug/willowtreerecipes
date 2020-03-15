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
			<tr 
				id='recipe-entry'
				v-for='recipe in allRecipes'
				:key='recipe.id'
				:recipe='recipe'
			>
				<td>{{ recipe.name }}</td>
				<td>{{ recipe.description }}</td>
				<td>{{ recipe.difficulty }}</td>
				<td>{{ recipe.time }}</td>
				<td>{{ recipe.creation_date }}</td>
			</tr>
		</table>
	</div>
</template>


<script>
	import Recipes from '@/services/Recipes'
	//import RecipesTableEntries from './Recipes-Table-Entries'

	export default {
	data() {
		return {
			allRecipes: [	]
		}
	},
	//components: { 
	//	RecipesTableEntries
	//},
  mounted () {
    Recipes.loadRecipes().then( response => {
      this.allRecipes = response.data;
    })
  }
}
</script>

<style scoped>
	
#all-recipes {
	border: 1px solid lightgrey;
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
