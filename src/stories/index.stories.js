import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import ContentItem from '../components/ContentItem.vue';
import ContentList from '../components/ContentList.vue';

storiesOf('ContentItem', module)
	.add('ContentItem for a single item', () => ({
		components: { ContentItem },
		template: '<ContentItem :index="index" :content="content" />',
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
			action: action('clicked')
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
