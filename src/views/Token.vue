<script>
export default {
	name: 'Token',
	data() {
		return {};
	},
	created() {
		this.$store.dispatch('authorize', this.$route.query.code).then(() => { this.$router.push('/'); });
	},
	render() {
		return ``;
	}
};
</script>
