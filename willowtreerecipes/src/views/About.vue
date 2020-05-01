<template>
  <div class="home">
		<Navigation/>
    <h2 class='body'>This is an about page</h2>
		<Footer/>
  </div>
</template>

<script>
	import Navigation from '@/components/Navigation.vue'
	import Footer from '@/components/Footer.vue'

	export default {
		name: 'About',
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
