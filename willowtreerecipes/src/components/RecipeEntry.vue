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
	}
}
</script>


<style scoped>

</style>
