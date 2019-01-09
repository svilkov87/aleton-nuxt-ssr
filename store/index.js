// import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from 'vuex'

const createStore = () => {
	return new Vuex.Store({
		state: {
			// menuLists: [
			// 	{
			// 		text: 'Главная',
			// 		dataFade: '300',
			// 		url: '/',
			// 		isActive: true,
			// 		isVisible: false
			// 	},
			// 	{
			// 		text: 'Патенты',
			// 		dataFade: '500',
			// 		url: '/patent',
			// 		isActive: false,
			// 		isVisible: false
			// 	},
			// 	{
			// 		text: 'Разрешение на временное проживание',
			// 		dataFade: '700',
			// 		url: '/rvp',
			// 		isActive: false,
			// 		isVisible: false
			// 	},
			// 	{
			// 		text: 'Вид на жительство',
			// 		dataFade: '900',
			// 		url: '/vnz',
			// 		isActive: false,
			// 		isVisible: false
			// 	},
			// 	{
			// 		text: 'Гражданство',
			// 		dataFade: '1100',
			// 		url: '/citizenship',
			// 		isActive: false,
			// 		isVisible: false
			// 	},
			// ]
		},
		mutations: {
			classActive: function ( state, index ) {
				state.menuLists[ index ].isActive = true;
			}
		}
	})
}

export default createStore