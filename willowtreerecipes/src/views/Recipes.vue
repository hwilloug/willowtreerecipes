<template>
  <div class="home">
    <Navigation/>
		<RecipesTable class="body"/>
		<Footer/>
  </div>
</template>

<script>
	import Navigation from '@/components/Navigation.vue'
	import RecipesTable from '@/components/Recipes.vue'
	import Footer from '@/components/Footer.vue'

	export default {
		name: 'Home',
		components: {
			Navigation,
			RecipesTable,
			Footer
		}	
	}
</script>

<style>
	@import "../style/layout.css";
	@import "../style/colors.css";
</style>
