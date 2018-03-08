<template>
	<ul>
		<ContentItem v-for="(contentItem, index) in contentList" :key="contentItem.id" :content="contentItem" :index="index" />
	</ul>
</template>

<script>
import ContentItem from './ContentItem';

export default {
	name: 'ContentList',
	data() {
		return { };
	},
	components: {
		ContentItem
	},
	props: ['contentList']
};
</script>
