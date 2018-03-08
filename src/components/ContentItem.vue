<template>
	<li>{{ index + 1 }}: {{ content.id }}, {{ content.title }}</li>
</template>

<script>
export default {
	name: 'ContentItem',
	data() {
		return { };
	},
	props: ['content', 'index']
};
</script>
