<template>
  <div class="home">
    <Navigation/>
		<NewRecipe class="body"/>
		<Footer/> 
 </div>
</template>

<script>
	import Navigation from '@/components/Navigation.vue'
	import NewRecipe from '@/components/NewRecipe.vue'
	import Footer from '@/components/Footer.vue'

	export default {
		name: 'Home',
		components: {
			Navigation,
			NewRecipe,
			Footer
		}	
	}
</script>

<style>
  @import "../style/layout.css";
  @import "../style/colors.css";
</style>
