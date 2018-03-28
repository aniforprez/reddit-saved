import snoowrap from 'snoowrap';

import { convertListingToList, getUniqueSubreddits } from './common_methods';

const state = {
	errorLoadingHidden: false,
	loadingHidden: false,
	hiddenList: null
};

const getters = {
	hiddenList: state => state.hiddenList,
	hiddenSubreddits: state => {
		if(state.savedList) {
			const subreddits = getUniqueSubreddits(state.savedList);

			return subreddits;
		} else {
			return null;
		}
	}
};

const mutations = {
	loadingHidden(state) {
		state.loadingHidden = true;
	},
	successFetchingHiddenList(state, { hiddenList }) {
		state.hiddenList = hiddenList;
		state.loadingHidden = false;
		state.errorLoadingHidden = false;
	},
	failureFetchingHiddenList(state) {
		state.hiddenList = null;
		state.loadingHidden = false;
		state.errorLoadingHidden = true;
	}
};

const actions = {
	getHiddenListFromReddit({ commit, rootState }) {
		return new Promise((resolve, reject) => {
			commit('loadingHidden');

			let r = new snoowrap({ accessToken: rootState.auth.authToken });
			r.getMe().getHiddenContent().fetchAll().then(hiddenListing => {
				let hiddenList = convertListingToList(hiddenListing);

				commit('successFetchingHiddenList', { hiddenList });
				resolve();
			}).catch(error => {
				if(error) {
					commit('failureFetchingHiddenList');
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
