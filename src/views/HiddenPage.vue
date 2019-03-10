<template>
	<div id="hidden-page">
		<a :href="redirectUrl" v-if="!authorized">Authorize app</a>
		<router-link to="/" v-if="authorized">Saved</router-link>
		<ContentList v-if="authorized" :content-list="hiddenList" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import ContentList from '@/components/ContentList';

export default {
	name: 'Main',
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
			'loadedHidden',
			'hiddenList',
			'hiddenCount'
		])
	},
	created() {
		if(this.authorized && !this.loadedHidden) {
			this.$store.dispatch('loadHiddenList');
		}
	}
};
</script>

<style scoped>
</style>
