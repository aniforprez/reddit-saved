<template>
	<div id="hidden-page">
		<a :href="redirectUrl" v-if="!authorized">Authorize app</a>
		<router-link to="/">Saved</router-link>
		<ul v-if="authorized">
			<li v-for="(hiddenItem, index) in hiddenList" :key="hiddenItem.id">
				{{ index }}: {{ hiddenItem.id }}, {{ hiddenItem.title }}
			</li>
		</ul>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Main',
	data() {
		return { };
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
