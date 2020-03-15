<template>
	<tr>
		<td>{{ recipe.name }}</td>
		<td>{{ recipe.description }}</td>
		<td>{{ recipe.difficulty }}</td>
		<td>{{ recipe.time }}</td>
		<td>{{ recipe.creation_date }}</td>
	</tr>
</template>


<script>
export default {
	name: 'recipe-entry',
	props: ['recipeEntry'],
	data () {
		return {
			recipe: {}
		}
	},
	mounted () {
		this.recipe = this.recipeEntry
	}
}
</script>

<style scoped>
	
</style>
