<template>
	<div id="saved-page">
		<a :href="redirectUrl" v-if="!authorized">Authorize app</a>
		<router-link to="/hidden">Hidden</router-link>
		<ul v-if="authorized">
			<li v-for="(savedItem, index) in savedList" :key="savedItem.id">
				{{ index }}: {{ savedItem.id }}, {{ savedItem.title }}
			</li>
		</ul>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'SavedPage',
	data() {
		return { };
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
