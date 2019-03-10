<template>
	<span>
		<button @click="vote('upvote')">Up</button>
		<button @click="vote('downvote')">Down</button>
		<a :href="content.url">{{ index + 1 }}: {{ content.id }}, {{ content.title }}</a>
		<a :href="redditPermalink">Comments</a>
	</span>
</template>

<script>
export default {
	name: 'ContentItem',
	data() {
		return { };
	},
	methods: {
		vote(action) {
			this.$store.dispatch('votePost', {
				action,
				index: this.index,
				postId: this.content.id
			});

			this.$emit('upvoted', action);
		},
	},
	props: ['content', 'index']
};
</script>
