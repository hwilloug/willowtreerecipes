<template>
	<div>
		<h1>Recipes :)</h1>
		<p>{{ message }}</p>
	</div>
</template>

<script>
import Recipes from '@/services/Recipes'
//import Api from '@/services/Api'
export default {
	data () {
		return {
			message: ''
		}
	},
	mounted () {
		Recipes.loadRecipes().then( response => {
			this.message = response.data.message;
		})
	}
}
</script>

<style scoped>

</style>
