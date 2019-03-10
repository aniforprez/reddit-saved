import snoowrap from 'snoowrap';

import { convertListingToList, getUniqueSubreddits } from './common_methods';

const state = {
	errorLoadingHidden: false,
	loadingHidden: false,
	loadedHidden: false,
	hiddenList: []
};

const getters = {
	loadedHidden: state => state.loadedHidden,
	hiddenList: state => state.hiddenList,
	hiddenCount: state => state.hiddenList.length,
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
		state.loadedHidden = true;
		state.errorLoadingHidden = false;
	},
	failureFetchingHiddenList(state) {
		state.hiddenList = [];
		state.loadingHidden = false;
		state.errorLoadingHidden = true;
	}
};

const actions = {
	loadHiddenList({ commit, rootState }) {
		console.info('Loading Hidden');
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
