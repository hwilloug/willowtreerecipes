<template>
  <div class="home">
    <Navigation/>
		<RecipePage class="body" :recipeID='recipeID' />
		<Footer/>
  </div>
</template>

<script>
	import Navigation from '@/components/Navigation.vue'
	import RecipePage from '@/components/RecipeEntry.vue'
	import Footer from '@/components/Footer.vue'

	export default {
		name: 'Home',
		props: ['recipeID'],
		components: {
			Navigation,
			RecipePage,
			Footer
		}	
	}
</script>

<style>
  @import "../style/layout.css";
  @import "../style/colors.css";
</style>
