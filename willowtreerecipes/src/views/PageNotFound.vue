<template>
	<div>
		<Navigation/>
		<h1>404 NOT FOUND</h1>
		<button @click='back'>Back</button>
	</div>
</template>


<script>
import router from '@/router/index'
import Navigation from '@/components/Navigation.vue'

export default {
	components: {
		Navigation
	},
	methods: {
		back: () => router.push('/recipes')
	}
}
</script>

<style>
  @import "general-style.css"; 
</style>

