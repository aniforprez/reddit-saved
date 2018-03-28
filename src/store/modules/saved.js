import snoowrap from 'snoowrap';

import { convertListingToList, getUniqueSubreddits } from './common_methods';

const state = {
	errorLoadingSaved: false,
	loadingSaved: false,
	savedList: null
};

const getters = {
	savedList: state => state.savedList,
	savedSubreddits: state => {
		if(state.savedList) {
			const subreddits = getUniqueSubreddits(state.savedList);

			return subreddits;
		} else {
			return null;
		}
	}
};

const mutations = {
	loadingSaved(state) {
		state.loadingSaved = true;
	},
	successFetchingSavedList(state, { savedList }) {
		state.savedList = savedList;
		state.loadingSaved = false;
		state.errorLoadingSaved = false;
	},
	failureFetchingSavedList(state) {
		state.savedList = null;
		state.loadingSaved = false;
		state.errorLoadingSaved = true;
	}
};

const actions = {
	getSavedListFromReddit({ commit, rootState }) {
		return new Promise((resolve, reject) => {
			commit('loadingSaved');

			let r = new snoowrap({ accessToken: rootState.auth.authToken });
			r.getMe().getSavedContent().fetchAll().then(savedListing => {
				let savedList = convertListingToList(savedListing);

				commit('successFetchingSavedList', { savedList });
				resolve();
			}).catch(error => {
				if(error) {
					commit('failureFetchingSavedList');
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
