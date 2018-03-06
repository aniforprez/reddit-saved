import snoowrap from 'snoowrap';

import config from '../../config';

const state = {
	redirectUrl: null,
	authToken: null,
	authError: false
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
		state.authError = false;
	},
	authFailure(state) {
		state.authToken = null;
		state.authError = true;
	}
};

const actions = {
	setRedirectUrl({ commit }) {
		const redirectUrl = snoowrap.getAuthUrl({
			clientId: config.clientId,
			scope: config.scope,
			redirectUri: config.redirectUri,
			permanent: false
		});

		commit('setRedirectUrl', { redirectUrl });
	},
	authorize({ commit }, code) {
		return new Promise((resolve, reject) => {
			snoowrap.fromAuthCode({
				code,
				clientId: config.clientId,
				clientSecret: config.clientSecret,
				redirectUri: config.redirectUri
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
