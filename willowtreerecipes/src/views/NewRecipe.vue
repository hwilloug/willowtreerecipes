<template>
  <div class="home">
    <Navigation/>
		<NewRecipe/>
  </div>
</template>

<script>
	import Navigation from '@/components/Navigation.vue'
	import NewRecipe from '@/components/NewRecipe.vue'

	export default {
		name: 'Home',
		components: {
			Navigation,
			NewRecipe
		}	
	}
</script>
