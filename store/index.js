// import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from 'vuex'

const createStore = () => {
	return new Vuex.Store({
		state: {
			downMenu: false,
			hamburgerToggle: false,
			counter: 0,
			fadeContacts: true,
			isCompactMenu: false,
			fadeSettings: [
				{
					title: 'ПОМОЩЬ В ОФОРМЛЕНИИ ДОКУМЕНТОВ ДЛЯ ИНОСТРАННЫХ ГРАЖДАН',
					defaultClass: 'b-nav__text',
					fadeClass: 'b-nav__text_fade',
					isVisible: true,
					time: 200
				},
				{
					title: 'Работаем с физическими лицами, по безналичному расчету',
					defaultClass: 'b-nav__cash-term',
					fadeClass: 'b-nav__cash-term_fade',
					isVisible: true,
					time: 300
				}
			],
			menuLists: [
				{
					text: 'Главная',
					dataFade: 1500,
					url: '/',
					isActive: true,
					isVisible: false
				},
				{
					text: 'Патенты',
					dataFade: 1600,
					url: '/patent',
					isActive: false,
					isVisible: false
				},
				{
					text: 'Разрешение на временное проживание',
					dataFade: 1700,
					url: '/rvp',
					isActive: false,
					isVisible: false
				},
				{
					text: 'Вид на жительство',
					dataFade: 1800,
					url: '/vnz',
					isActive: false,
					isVisible: false
				},
				{
					text: 'Гражданство',
					dataFade: 1900,
					url: '/citizenship',
					isActive: false,
					isVisible: false
				},
			]
		},
		mutations: {
			classActive: function ( state, index ) {
				state.menuLists[ index ].isActive = true;
			}
		}
	})
}

export default createStore