<template>
<div>
	<h1>New Recipe</h1>
	<form>
	<label for='recipeName'>Name </label><br>
	<input type='text' id='recipeName' name='recipeName' class='input' maxlength='100' required /><br><br>
	
	<label for='difficulty'>Difficulty </label><br>
	<select id='difficulty' name='difficulty' class='select'>
		<option value='Easy'>Easy</option>
		<option value='Medium'>Medium</option>
		<option value='Hard'>Hard</option>
		<option value='Very Hard'>Very Hard</option>
	</select><br><br>
	
	<label for='time'>Time to Make </label><br>
	<select id='time' name='time' class='select'>
		<option value='Negligible'>Negligible</option>
		<option value='Short'>Short</option>
		<option value='Medium'>Medium</option>
		<option value='Long'>Long</option>
		<option value='Very Long'>Very Long</option>
	</select><br><br>

	<label for='description'>Description </label><br>
	<textarea id='description' name='description' maxlength='500' class='area'></textarea><br><br>
	
	<label for='ingredients1'>Ingredients </label><br>
	<textarea id='ingredients1' name='ingredients1' maxlength='20' class='area' required ></textarea><br><br>

	<label for='ingredients'>Ingredients</label><br>
	<DynamicField list='ingredients' class='input'
		id ='ingredients'
		v-for='ingredient in ingredients'
		:key='ingredient'
		:model='ingredient'
		:field='ingredient'
	></DynamicField><br>

	<button type='button' @click='addField'>Add Ingredient</button><br>

	<label for='steps'>Steps </label><br>
	<textarea id='steps' name='steps' maxlength='200' class='area' required></textarea><br><br>
	
	<button type='submit' class='button'>Add Recipe</button>
	</form>
</div>
</template>

<script>
import DynamicField from '@/components/DynamicField'

export default {
	data () {
		return {
			ingredients: []
		}
	},
	components: {
		DynamicField
	},
	methods: {
		addField() {
			this.ingredients.push({'': ''});
			console.log(this.ingredients)
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
