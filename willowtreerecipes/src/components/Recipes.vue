<template>
	<div>
		<button @click='addRecipe'>Add Recipe</button>
		<h2>Recipes :)</h2>
		<div class='recipes-table'>
			<table id='all-recipes'>
				<tr>
					<th @click="sortRecipes('name')">
						Name
						<img :src="imgSrc" id="sort-arrow" v-if="sortCategory=='name'" :class="{rotate180:sortDirection=='DESC'}"/>
					</th>
					<th @click="sortRecipes('description')">
						Description
						<img :src="imgSrc" id="sort-arrow" v-if="sortCategory=='description'" :class="{rotate180:sortDirection=='DESC'}"/>
					</th>
					<th @click="sortRecipes('difficulty')">
						Difficulty
						<img :src="imgSrc" id="sort-arrow" v-if="sortCategory=='difficulty'" :class="{rotate180:sortDirection=='DESC'}"/>
					</th>
					<th @click="sortRecipes('time')">
						Time to Complete
						<img :src="imgSrc" id="sort-arrow" v-if="sortCategory=='time'" :class="{rotate180:sortDirection=='DESC'}"/>
					</th>
					<th @click="sortRecipes('creation_date')">
						Date Created
						<img :src="imgSrc" id="sort-arrow" v-if="sortCategory=='creation_date'" :class="{rotate180:sortDirection=='DESC'}"/>
					</th>
				</tr>
				<RecipesTableEntries
					id='recipe-entry'
					v-for='recipe in allRecipes'
					:key='recipe.id'
					:recipeEntry='recipe'
					@click.native='routeToEntry(recipe.id)'
				></RecipesTableEntries>
			</table>
		</div>
		<br>
	</div>
</template>

<script>
	import Recipes from '@/services/Recipes'
	import RecipesTableEntries from './RecipesTableEntries.vue'
	import router from '@/router/index'

	export default {
	name: 'RecipesTable',
	data() {
		return {
			allRecipes: [	],
			sortCategory: "",
			sortDirection: "",
			imgSrc: require("../assets/sort_direction.png"),
		}
	},
	components: {
		RecipesTableEntries
	},
  created () {
    Recipes.loadRecipes().then( response => {
			this.allRecipes = response.data;
    })
  },
	methods: {
		routeToEntry: (recipeID) => {
			router.push(`/recipes/${recipeID}`);
		},
		addRecipe: () => {
			router.push('new-recipe')
		},
		sortRecipes (category) {
			this.sortCategory = category;
			this.sortDirection = this.sortDirection == 'ASC' ? 'DESC' : 'ASC';
			Recipes.loadRecipes(this.sortCategory, this.sortDirection).then ( response => {
				this.allRecipes = response.data;
			})
		}
	}
}
</script>

<style>
	
#all-recipes th, td {
	padding: 15px;
}	

.recipes-table {
	width: 80%;
	margin: auto;
}

#all-recipes {
	border-collapse: collapse;
}

#all-recipes th {
	background-color: #869D7A;
	color: #EFE5FB;
	cursor: pointer;
}

#recipe-entry {
	border: 1px solid #E1D4B1;
	color: #8B5D33;
	background-color: white;
	word-wrap: normal;
}

#recipe-entry:hover {
	border: 1px solid #E1D4B1;
	background-color: #E1D4B1;
	cursor: pointer;
}

button {
  border-radius: 0.25rem;
  cursor: pointer;
	float: right;
}

#sort-arrow {
	width: 10px;
}

.invisible {
	visibility: hidden;
}

.rotate180 {
	transform: rotate(180deg);
}


</style>
