import snoowrap from 'snoowrap';

import { convertListingToList, getUniqueSubreddits } from './common_methods';

const state = {
	filter: {
		nsfw: null,
		subreddits: []
	},
	errorLoadingSaved: false,
	loadingSaved: false,
	loadedSaved: false,
	savedList: []
};

const getters = {
	filter: state => state.filter,
	loadedSaved: state => state.loadedSaved,
	savedCount: state => state.savedList.length,
	filteredSavedList: state => {
		return state.savedList.filter(savedItem => {
			if(state.filter.nsfw) {
				return savedItem.nsfw;
			}
			if(state.filter.subreddits.length > 0) {
				return state.filter.subreddits.indexOf(savedItem.subreddit) > -1;
			}
			return true;
		});
	},
	savedSubreddits: state => {
		if(state.loadedSaved) {
			return getUniqueSubreddits(state.savedList);
		} else {
			return [];
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
		state.loadedSaved = true;
		state.errorLoadingSaved = false;
	},
	failureFetchingSavedList(state) {
		state.savedList = [];
		state.loadingSaved = false;
		state.errorLoadingSaved = true;
	},
	votePost(state, { index, action }) {
		if(action === 'upvote') {
			state.savedList[index].likes = true;
			if(state.savedList[index].likes === false) {
				state.savedList[index].score += 2;
			} else {
				state.savedList[index].score += 1;
			}
		}
		if(action === 'downvote') {
			state.savedList[index].likes = false;
			if(state.savedList[index].likes === true) {
				state.savedList[index].score -= 2;
			} else {
				state.savedList[index].score -= 1;
			}
		}
		if(action === 'unvote') {
			if(state.savedList[index].likes === true) {
				state.savedList[index].score -= 1;
			}
			if(state.savedList[index].likes === false) {
				state.savedList[index].score += 1;
			}
			state.savedList[index].likes = null;
			state.savedList[index].score += 1;
		}
	},
	setSavedPost(state, { index, saved }) {
		state.savedList[index].saved = saved;
	},
	setHiddenPost(state, { index, hidden }) {
		state.savedList[index].saved = hidden;
	},
	setFilterNSFW(state, nsfw) {
		state.filter.nsfw = nsfw;
	},
	setFilterSubreddits(state, subreddits) {
		state.filter.subreddits = subreddits;
	}
};

const actions = {
	loadSavedList({ commit, rootState }) {
		let r = new snoowrap({ accessToken: rootState.auth.authToken });

		return new Promise((resolve, reject) => {
			commit('loadingSaved');

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
	},
	votePost({ commit, state, rootState }, { index, postId, action }) {
		let r = new snoowrap({ accessToken: rootState.auth.authToken });

		return new Promise((resolve, reject) => {
			let votePromise = null;
			if((action === 'upvote' && state.savedList[index].likes) || (action === 'downvote' && state.savedList[index].likes === false)) {
				action = 'unvote';
			}
			if(action === 'upvote') {
				votePromise = r.getSubmission(postId).upvote();
			}
			if(action === 'downvote') {
				votePromise = r.getSubmission(postId).downvote();
			}
			if(action === 'unvote') {
				votePromise = r.getSubmission(postId).unvote();
			}

			votePromise.then(() => {
				commit('votePost', { index, action });
				resolve();
			}).catch(error => {
				reject(error);
			});
		});
	},
	toggleSavePost({ commit, state, rootState }, { index, postId }) {
		let r = new snoowrap({ accessToken: rootState.auth.authToken });

		return new Promise((resolve, reject) => {
			let savePromise = null;
			if(state.savedList[index].saved) {
				savePromise = r.getSubmission(postId).unsave();
			} else {
				savePromise = r.getSubmission(postId).save();
			}

			savePromise.then(() => {
				commit('setSavedPost', { index, saved: !state.savedList[index].saved });
				resolve();
			}).catch(error => {
				reject(error);
			});
		});
	},
	toggleHidePost({ commit, state, rootState }, { index, postId }) {
		let r = new snoowrap({ accessToken: rootState.auth.authToken });

		return new Promise((resolve, reject) => {
			let hidePromise = null;
			if(state.savedList[index].hidden) {
				hidePromise = r.getSubmission(postId).unhide();
			} else {
				hidePromise = r.getSubmission(postId).hide();
			}

			hidePromise.then(() => {
				commit('setHiddenPost', { index, hidden: !state.savedList[index].hidden });
				resolve();
			}).catch(error => {
				reject(error);
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
