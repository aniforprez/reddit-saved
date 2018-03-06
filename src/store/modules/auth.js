import snoowrap from 'snoowrap';

const state = {
	redirectUrl: null,
	authToken: null
};

const getters = {
	redirectUrl: state => state.redirectUrl,
	authToken: state => state.authToken,
	authorized: state => !!state.authToken
};

const mutations = {
	setRedirectUrl(state, { redirectUrl }) {
		state.redirectUrl = redirectUrl;
	},
	authSuccess(state, { authToken }) {
		state.authToken = authToken;
	},
	authFailure(state) {
		state.authToken = null;
	}
};

const actions = {
	setRedirectUrl({ state, commit }) {
		const redirectUrl = snoowrap.getAuthUrl({
			clientId: '8eNCCpBD9bNMzw',
			scope: ['history', 'save', 'identity', 'vote'],
			redirectUri: 'http://localhost:8080/token',
			permanent: false
		});

		commit('setRedirectUrl', { redirectUrl });
	},
	authorize({ commit, state }, code) {
		return new Promise((resolve, reject) => {
			snoowrap.fromAuthCode({
				code,
				clientId: '8eNCCpBD9bNMzw',
				clientSecret: 'kAYQNcjwjmzJDyfs2bFk8DBCwXY',
				redirectUri: 'http://localhost:8080/token'
			}).then(instance => {
				const authToken = instance.accessToken;
				commit('authSuccess', { authToken });
				resolve();
			}).catch(error => {
				if(error) {
					commit('authFailure');
					reject(error);
				}
			});
		});
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
