<template>
	<span>
		<button @click="vote('upvote')">Up</button>
		<button @click="vote('downvote')">Down</button>
		<button @click="toggleSave">Save</button>
		<button @click="toggleHide">Hide</button>
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
	computed: {
		redditPermalink() {
			return 'https://www.reddit.com' + this.content.permalink;
		}
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
		toggleSave() {
			this.$store.dispatch('toggleSavePost', {
				index: this.index,
				postId: this.content.id
			});

			this.$emit('toggleSave');
		},
		toggleHide() {
			this.$store.dispatch('toggleHidePost', {
				index: this.index,
				postId: this.content.id
			});

			this.$emit('toggleHide');
		}
	},
	props: ['content', 'index']
};
</script>
