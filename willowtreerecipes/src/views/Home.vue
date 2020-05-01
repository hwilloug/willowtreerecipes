<template>
  <div class="home">
    <Navigation/>
		<p class='body'>This is the home page.</p>
		<Footer/>
  </div>
</template>

<script>
	import Navigation from '@/components/Navigation.vue'
	import Footer from '@/components/Footer.vue'

	export default {
		name: 'Home',
		components: {
			Navigation,
			Footer
		}	
	}
</script>

<style>
  @import "../style/layout.css";
  @import "../style/colors.css";
</style>
