<template>
	<div>
		<input type="checkbox" v-model="filterNSFWCheck"> NSFW
		<select v-model="filterSubreddits" multiple>
			<option v-for="subreddit in savedSubreddits" :key="subreddit" :value="subreddit">{{ subreddit }}</option>
		</select>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'FilterContent',
	data() {
		return { };
	},
	computed: {
		...mapGetters([
			'filter',
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
	}
};
</script>
