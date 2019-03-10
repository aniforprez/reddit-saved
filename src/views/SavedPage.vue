<template>
	<div id="saved-page">
		<a :href="redirectUrl" v-if="!authorized">Authorize app</a>
		<router-link to="/hidden" v-if="authorized">Hidden</router-link>
		<div>
			<input type="checkbox" v-model="filterNSFWCheck"> NSFW
			<select v-model="filterSubreddits" multiple>
				<option v-for="subreddit in savedSubreddits" :key="subreddit" :value="subreddit">{{ subreddit }}</option>
			</select>
		</div>
		<ContentList v-if="authorized" :content-list="filteredSavedList" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import ContentList from '../components/ContentList';

export default {
	name: 'SavedPage',
	data() {
		return { };
	},
	components: {
		ContentList
	},
	computed: {
		...mapGetters([
			'filter',
			'redirectUrl',
			'authorized',
			'loadedSaved',
			'filteredSavedList',
			'savedCount',
			'savedSubreddits'
		]),
		filterSubreddits: {
			get() {
				return this.filter.subreddits;
			},
			set(value) {
				this.$store.commit('setFilterSubreddits', value);
			}
		},
		filterNSFWCheck: {
			get() {
				return this.filter.nsfw;
			},
			set(value) {
				this.$store.commit('setFilterNSFW', value);
			}
		}
	},
	created() {
		if(this.authorized && !this.loadedSaved) {
			this.$store.dispatch('loadSavedList');
		}
	}
};
</script>

<style scoped>
</style>
