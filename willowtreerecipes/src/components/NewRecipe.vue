<template>
<div>
	<h1>New Recipe</h1>
	<form @submit.prevent='submitRecipe'>
	<label for='recipeName'>Name </label><br>
	<input type='text' id='recipeName' name='recipeName' v-model='name' class='input' maxlength='100' required /><br><br>
	
	<label for='difficulty'>Difficulty </label><br>
	<select id='difficulty' name='difficulty' v-model='difficulty' class='select'>
		<option value='Easy'>Easy</option>
		<option value='Medium'>Medium</option>
		<option value='Hard'>Hard</option>
		<option value='Very Hard'>Very Hard</option>
	</select><br><br>
	
	<label for='time'>Time to Make </label><br>
	<select id='time' name='time' v-model='time' class='select'>
		<option value='Negligible'>Negligible</option>
		<option value='Short'>Short</option>
		<option value='Medium'>Medium</option>
		<option value='Long'>Long</option>
		<option value='Very Long'>Very Long</option>
	</select><br><br>

	<label for='description'>Description </label><br>
	<textarea id='description' name='description' v-model='description' maxlength='500' class='area'></textarea><br><br>

	<!-- I don't like this but it will have to do -->	
	<label for='ingredients'>Ingredients<br><i>Please put each ingredient on a new row.<br>ingredient_name, amount, step_number</i></label><br>
	<textarea id='ingredients' name='ingredients' v-model='ingredients' class='area' required ></textarea><br><br>

	<label for='steps'>Steps<br><i>Please put each step on a new row.</i></label><br>
	<textarea id='steps' name='steps' v-model='steps' maxlength='200' class='area' required></textarea><br><br>
	
	<button type='submit' class='button'>Add Recipe</button>
	</form>
</div>
</template>

<script>
import Recipes from '@/services/Recipes'

export default {
	data () {
		return {
			name: '',
			difficulty: '',
			time: '',
			description: '',
			ingredients: '',
			steps: ''
		}
	},
	methods: {
		submitRecipe() {
			Recipes.postNewRecipe(
				this.name,
				this.difficulty,
				this.time,
				this.description,
				this.ingredients,
				this.steps
			)
			console.log('Submitted')
			this.$router.push('/recipes')
		}
	}
}
</script>

<style scoped>
.select {
	width: 385px;
	border: 1px solid lightgrey;
	padding: 5px;
	background-color: white;
}
.select:focus {
	border: 1px solid grey;
}

.input {
	width: 373px;
	border: 1px solid lightgrey;
	padding: 5px;
}
.input:focus {
	border: 1px solid grey
}

.area {
	width: 380px;
	height: 70px;
	resize: none;
}

.button {
	border-radius: 0.25rem;
	cursor: pointer;
}
</style>
