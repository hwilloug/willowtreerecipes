<template>
<div class='header'>
	<h1 class='title' @click='home'>Willowtree Recipes</h1>
	<nav class='nav'>
		<ul>
			<li @click='home' id='nav-item' :class='{active: activeHome}'>Home</li>
			<li @click='recipes' id='nav-item' :class='{active: activeRecipes}'>Recipes</li>
			<li @click='about' id='nav-item' :class='{active: activeAbout}'>About</li>
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
			this.$route.name == 'Home' ? '' : this.$router.push('/');
		},
		recipes() {
			this.$route.name=='Recipes' ? '' : this.$router.push('/recipes');
		},
		about() {
			this.$route.name=='About' ? '' : this.$router.push('/about');
		}
	},
	mounted() {
		this.$route.name=='Home' ? this.activeHome=true : '';
		this.$route.name=='Recipes' ? this.activeRecipes=true : '';
		this.$route.name=='About' ? this.activeAbout=true : '';
	}
}
</script>

<style scoped>

.header {
	display: flex;
	flex-direction: row;
	align-items: stretch;
}

.title {
	flex-grow: 4;
	cursor: pointer;
	padding-left: 50px;
}

.nav {
	flex-grow: 1;
	padding-right: 50px;
}

.nav ul {
	list-style-type: none;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}

.nav li {
	font-weight: bold;
	padding: 10px 15px;
	margin-left: 20px; 
	cursor: pointer;
}

#nav-item:hover {
	border: 2px solid #E1D4B1;
	border-radius: 5px;
	margin-left: 16px;
}

#nav-item:active {
	border: 2px inset #E1D4B1;
}

#nav-item.active {
	background-color: #BBE1C3;
	color: #8B5D33;
	border: 2px inset #AA8D6D;
	border-radius: 5px;
}

#nav-item.active:hover {
	margin-left: 20px;
}

</style>
