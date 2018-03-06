<template>
	<el-container>
		<el-header>Main</el-header>
		<el-main>
			<el-row type="flex" class="row-bg" justify="center">
				<div class="main-demo">
					<a :href="redirectUrl" v-if="!authorized">Authorize app</a>
				</div>
			</el-row>
		</el-main>
		<el-footer>Footer</el-footer>
	</el-container>
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
			'authorized'
		])
	},
	created() {
		if(this.authorized) {
			this.$store.dispatch('getSavedListFromReddit');
		}
	}
};
</script>

<style scoped>
.main-demo {
	max-width: 900px;
}
</style>
