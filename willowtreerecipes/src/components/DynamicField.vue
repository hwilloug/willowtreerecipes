<template>
<div>
	<input :model='fieldInput'/>
	<datalist>
		<option value='Olive Oil'>Olive Oil</option>
		<option value='Flour'>Flour</option>
		<option value='Kosher Salt'>Kosher Salt</option>
	</datalist>
</div>
</template>

<script>
export default {
	name: 'dynamic-field',
	props: ['field'],
  data () {
		return {
			fieldInput: {}
		}
	},
	mounted () {
		this.fieldInput = this.field
	}
}
</script>
