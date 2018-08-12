<template>
	<div id="hidden-page">
		<a :href="redirectUrl" v-if="!authorized">Authorize app</a>
		<router-link to="/" v-if="authorized">Saved</router-link>
		<ContentList v-if="authorized" :content-list="hiddenList" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import ContentList from '../components/ContentList';

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
			'hiddenList'
		])
	},
	created() {
		if(this.authorized) {
			if(!this.hiddenList) {
				this.$store.dispatch('getHiddenListFromReddit');
			}
		}
	}
};
</script>

<style scoped>
</style>
