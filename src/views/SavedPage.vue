<template>
	<div id="saved-page">
		<a :href="redirectUrl" v-if="!authorized">Authorize app</a>
		<!-- <router-link to="/hidden" v-if="authorized">Hidden</router-link> -->
		<FilterContent />
		<ContentList v-if="authorized" :content-list="filteredSavedList" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import ContentList from '@/components/ContentList';
import FilterContent from '@/components/FilterContent';

export default {
	name: 'SavedPage',
	data() {
		return { };
	},
	components: {
		ContentList,
		FilterContent
	},
	computed: {
		...mapGetters([
			'redirectUrl',
			'authorized',
			'loadedSaved',
			'filteredSavedList',
			'savedCount'
		])
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
