<template>
	<div id="saved-page">
		<a :href="redirectUrl" v-if="!authorized">Authorize app</a>
		<router-link to="/hidden" v-if="authorized">Hidden</router-link>
		<ContentList v-if="authorized" :content-list="savedList"></ContentList>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import ContentList from './ContentList';

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
			'redirectUrl',
			'authorized',
			'savedList'
		])
	},
	created() {
		if(this.authorized) {
			if(!this.savedList) {
				this.$store.dispatch('getSavedListFromReddit');
			}
		}
	}
};
</script>

<style scoped>
</style>
