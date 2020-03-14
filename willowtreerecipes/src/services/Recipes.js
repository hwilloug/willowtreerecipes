import Api from '@/services/Api'

export default {
	loadRecipes () {
		return Api().get('/recipes');
	}
}

