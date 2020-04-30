<template>
  <div class="home">
    <Navigation/>
		<p>This is the home page.</p>
  </div>
</template>

<script>
	import Navigation from '@/components/Navigation.vue'

	export default {
		name: 'Home',
		components: {
			Navigation,
		}	
	}
</script>
