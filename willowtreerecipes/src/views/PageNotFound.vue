<template>
	<div>
		<Navigation/>
		<div class='body'>
			<h1>404 NOT FOUND</h1>
			<button @click='back'>Back</button>
		</div>
		<Footer/>
	</div>
</template>


<script>
import router from '@/router/index'
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'

export default {
	components: {
		Navigation,
		Footer
	},
	methods: {
		back: () => router.push('/recipes')
	}
}
</script>

<style>
  @import "../style/layout.css";
	@import "../style/colors.css"; 
</style>

