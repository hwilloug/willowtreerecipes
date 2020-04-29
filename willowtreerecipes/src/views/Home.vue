<template>
  <div class="home">
    <Navigation/>
		<RecipesTable/>
  </div>
</template>

<script>
	import Navigation from '@/components/Navigation.vue'
	import RecipesTable from '@/components/Recipes.vue'

	export default {
		name: 'Home',
		components: {
			Navigation,
			RecipesTable
		}
	}
</script>
