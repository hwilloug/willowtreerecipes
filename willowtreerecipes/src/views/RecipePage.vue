<template>
  <div class="home">
    <Navigation/>
		<RecipePage class="body" :recipeID='recipeID' />
  </div>
</template>

<script>
	import Navigation from '@/components/Navigation.vue'
	import RecipePage from '@/components/RecipeEntry.vue'

	export default {
		name: 'Home',
		props: ['recipeID'],
		components: {
			Navigation,
			RecipePage
		}	
	}
</script>
