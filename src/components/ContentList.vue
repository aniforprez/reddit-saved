<template>
	<ul>
		<li v-for="(content, index) in contentList" :key="content.id">
			<ContentItem :content="content" :index="index" />
		</li>
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
