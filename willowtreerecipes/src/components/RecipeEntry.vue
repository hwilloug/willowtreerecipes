<template>
<div>
	<h1>{{ recipe.name }}</h1>
	<p>{{ recipe.description }}</p>
</div>
</template>


<script>
import Recipes from '@/services/Recipes'

export default {
	props: ['recipeID'],
	data () {
		return {
			recipe: {}
		}
	},
	created () {
		Recipes.loadRecipeEntry(this.recipeID)
			.then( response => {
				this.recipe = response.data[0];
			})
	}
}
</script>


<style scoped>

</style>
