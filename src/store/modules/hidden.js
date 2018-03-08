import snoowrap from 'snoowrap';

const state = {
	errorLoadingHidden: false,
	loadingHidden: false,
	hiddenList: null
};

const getters = {
	hiddenList: state => state.hiddenList
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
				let hiddenListingJSON = hiddenListing.toJSON();
				let hiddenList = hiddenListingJSON.map(listItem => {
					return {
						id: listItem.id,
						name: listItem.name,
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
