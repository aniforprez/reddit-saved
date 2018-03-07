import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import saved from './modules/saved';
import hidden from './modules/hidden';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	modules: {
		auth,
		saved,
		hidden
	},
	strict: debug
});
