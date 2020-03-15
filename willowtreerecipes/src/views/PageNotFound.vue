<template>
	<div>
		<h1>404 NOT FOUND</h1>
		<button @click='back'>Back</button>
	</div>
</template>


<script>
import router from '@/router/index'

export default {
	methods: {
		back: () => router.push('/recipes')
	}
}
</script>


<style scoped>

</style>
