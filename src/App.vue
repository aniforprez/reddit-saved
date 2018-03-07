<template>
	<div id="app">
		<el-container>
			<el-header>Main</el-header>
			<el-main>
				<el-row type="flex" class="row-bg" justify="center">
					<div class="main-content">
						<router-view/>
					</div>
				</el-row>
			</el-main>
			<el-footer>Footer</el-footer>
		</el-container>
	</div>
</template>

<script>
export default {
	name: 'app',
	beforeCreate() {
		this.$store.dispatch('setRedirectUrl');
		this.$store.dispatch('checkAlreadyAuthorized');
	}
};
</script>

<style>
#app {
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

.main-content {
	max-width: 900px;
}
</style>
