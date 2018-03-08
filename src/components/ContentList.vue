<template>
	<ul>
		<li v-for="(contentItem, index) in contentList" :key="contentItem.id">
			{{ index }}: {{ contentItem.id }}, {{ contentItem.title }}
		</li>
	</ul>
</template>

<script>
export default {
	name: 'ContentList',
	data() {
		return { };
	},
	props: ['contentList']
};
</script>
