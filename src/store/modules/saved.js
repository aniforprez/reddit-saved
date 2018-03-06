import snoowrap from 'snoowrap';

const state = {
	errorLoadingSaved: false,
	loadingSaved: false,
	savedList: null
};

const getters = {
	savedList: state => state.savedList || []
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
				let savedListingJSON = savedListing.toJSON();
				let savedList = savedListingJSON.map(listItem => {
					return {
						id: listItem.name,
						title: listItem.title || listItem.link_title,
						url: listItem.url,
						subreddit: listItem.subreddit_name_prefixed,
						permalink: listItem.permalink,
						likes: listItem.likes,
						thumbnail: listItem.thumbnail || null,
						thumbnail_dimensions: {
							thumbnail_height: listItem.thumbnail_height || null,
							thumbnail_width: listItem.thumbnail_width || null
						},
						body: listItem.body || null,
						body_html: listItem.body_html || null,
						selftext: listItem.selftext || null,
						selftext_html: listItem.selftext_html || null,
						author: listItem.author,
						score: listItem.score,
						hide_score: listItem.hide_score || false,
						num_comments: listItem.num_comments,
						created: listItem.created,
						saved: listItem.saved,
						gilded: listItem.gilded,
						hidden: listItem.hidden || false,
						nsfw: listItem.over_18,
						comment: !!listItem.link_title
					};
				});

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
