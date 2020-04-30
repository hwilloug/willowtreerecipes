<template>
<div class='header'>
	<h1 class='title'>Willowtree Recipes</h1>
	<nav class='nav'>
		<ul>
			<li @click='home' :class='{active: activeHome}'>Home</li>
			<li @click='recipes' :class='{active: activeRecipes}'>Recipes</li>
			<li @click='about' :class='{active: activeAbout}'>About</li>
		</ul>	
	</nav>
</div>
</template>

<script>
export default {
	name: 'Navigation',
	data() {
		return {
			activeHome: false,
			activeRecipes: false,
			activeAbout: false,
		}
	},
	methods: {
		home() {
			this.$route.name == 'Home' ? console.log('Already home') : this.$router.push('/');
		},
		recipes() {
			this.$route.name=='Recipes' ? console.log('Already on recipes') : this.$router.push('recipes');
		},
		about() {
			this.$route.name=='About' ? console.log('Already at about') : this.$router.push('about');
		}
	},
	mounted() {
		this.$route.name=='Home' ? this.activeHome=true : '';
		this.$route.name=='Recipes' ? this.activeRecipes=true : '';
		this.$route.name=='About' ? this.activeAbout==true : '';
	}
}
</script>

<style scoped>

.header {
	display: flex;
	flex-direction: row;
	justify-content: baseline;
}

.title {
	flex-grow: 4;
}

.nav {
	flex-grow: 1;
}

.nav ul {
	list-style-type: none;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}

.nav li {
	padding: 10px;
}

.active {
	color: white;
	font-weight: bold;
}

</style>
