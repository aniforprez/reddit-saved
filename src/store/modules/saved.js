import snoowrap from 'snoowrap';

const state = {
	errorLoadingSaved: false,
	loadedSaved: false,
	savedList: []
};

const getters = {
	savedList: state => state.savedList
};

const mutations = {
	successSavedList(state, { savedList }) {
		state.savedList = savedList;
		state.loadedSaved = true;
		state.errorLoadingSaved = false;
	},
	failureSavedList(state) {
		state.savedList = [];
		state.loadedSaved = false;
		state.errorLoadingSaved = true;
	}
};

const actions = {
	getSavedListFromReddit({ state, commit, rootState }) {
		return new Promise((resolve, reject) => {
			let r = new snoowrap({ accessToken: rootState.auth.authToken });
			r.getMe().getSavedContent().fetchAll().then(savedList => {
				commit('successSavedList', { savedList });
				resolve();
			}).catch(error => {
				if(error) {
					commit('failureSavedList');
					reject(error);
				}
			});
		});
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};
