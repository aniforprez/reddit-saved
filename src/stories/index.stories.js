import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import ContentItem from '../components/ContentItem.vue';
import ContentList from '../components/ContentList.vue';

storiesOf('ContentItem', module)
	.add('ContentItem for a single item', () => ({
		components: { ContentItem },
		template: '<ContentItem :index="index" :content="content" @upvoted="upvoted" @downvoted="downvoted" @toggleSave="toggleSave" @toggleHide="toggleHide" />',
		data() {
			return {
				index: 1,
				content: {
					id: 18765,
					title: 'Something'
				}
			};
		},
		methods: {
			upvoted: action('upvoted'),
			downvoted: action('downvoted'),
			toggleSave: action('toggleSave'),
			toggleHide: action('toggleHide')
		}
	}));

storiesOf('ContentList', module)
	.add('List of items', () => ({
		components: { ContentList },
		data() {
			return {
				savedList: [{
					id: 18765,
					title: 'Something'
				}, {
					id: 18766,
					title: 'Something else'
				}]
			};
		},
		template: '<ContentList :content-list="savedList">'
	}));
