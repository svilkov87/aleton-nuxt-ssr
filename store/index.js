// import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from 'vuex'

const createStore = () => {
	return new Vuex.Store({
		state: {
			contentCounter: 0,
			counter: 0,
			isShowContent: false
		},
		mutations: {
			classActive: function ( state, index ) {
				state.menuLists[ index ].isActive = true;
			}
		}
	})
}

export default createStore