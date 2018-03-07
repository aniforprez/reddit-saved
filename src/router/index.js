import Vue from 'vue';
import Router from 'vue-router';

import SavedPage from '../components/SavedPage';
import HiddenPage from '../components/HiddenPage';
import Token from '../components/Token';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'SavedPage',
			component: SavedPage
		},
		{
			path: '/hidden',
			name: 'HiddenPage',
			component: HiddenPage
		},
		{
			path: '/token',
			name: 'Token',
			component: Token
		},
		{
			path: '*',
			redirect: '/'
		}
	]
});
