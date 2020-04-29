<template>
<div>
	<h1>New Recipe</h1>
	<div class='new-recipe-form'>
		<form @submit.prevent='submitRecipe'>
		<div class='recipe-info'>
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
		</div>
		<div class='recipe-steps'>
			<label for='steps'>Steps<br><i>Please put each step on a new row.</i></label><br>
			<textarea id='steps' name='steps' v-model='steps' class='area' required></textarea><br><br>
		</div>
		<div class='button-div'>
			<button type='submit' class='button'>Add Recipe</button>
		</div>
		</form>
	</div>
</div>
</template>

<script>
import Recipes from '@/services/Recipes'

export default {
	name: 'NewRecipe',
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
			this.$router.push('/recipes')
		}
	}
}
</script>

<style scoped>
h1 {
	text-align: center;
}

.new-recipe-form {
	display: flex;
	justify-content: center;
}

.recipe-info {
	float: left;
	margin: 5px;
}

.recipe-steps {
	float: right;
	margin: 5px;
}

.button-div {
	float: none;
}

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

#ingredients.area {
	height: 164px;
}

#steps.area {
	height: 500px;
}

.button {
	border-radius: 0.25rem;
	cursor: pointer;
}
</style>
