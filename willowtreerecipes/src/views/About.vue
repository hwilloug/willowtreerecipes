<template>
  <div class="about">
		<Navigation/>
    <h2>This is an about page</h2>
  </div>
</template>

<script>
	import Navigation from '@/components/Navigation.vue'

	export default {
		name: 'About',
		components: {
			Navigation,
		}
	}
</script>
