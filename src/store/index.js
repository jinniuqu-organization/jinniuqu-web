import Vue from 'vue'
import Vuex from 'vuex'

import dataGovernance from './dataGovernance'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		dataGovernance
	}
})
export default store