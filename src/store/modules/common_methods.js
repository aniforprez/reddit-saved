function convertListingToList(contentListing) {
	let listingJSON = contentListing.toJSON();
	let list = listingJSON.map(listItem => {
		return {
			id: listItem.id,
			name: listItem.name,
			title: listItem.title || listItem.link_title,
			url: listItem.url,
			domain: listItem.domain,
			subreddit: listItem.subreddit,
			subreddit_id: listItem.subreddit_id,
			subreddit_name: listItem.subreddit_name_prefixed,
			permalink: listItem.permalink,
			likes: listItem.likes,
			thumbnail: listItem.thumbnail || null,
			thumbnail_dimensions: {
				thumbnail_height: listItem.thumbnail_height || null,
				thumbnail_width: listItem.thumbnail_width || null
			},
			body: listItem.body || null,
			body_html: listItem.body_html || null,
			selftext: listItem.selftext || null,
			selftext_html: listItem.selftext_html || null,
			author: listItem.author,
			score: listItem.score,
			hide_score: listItem.hide_score || false,
			num_comments: listItem.num_comments,
			created: listItem.created,
			saved: listItem.saved,
			gilded: listItem.gilded,
			hidden: listItem.hidden || false,
			nsfw: listItem.over_18,
			comment: !!listItem.link_title
		};
	});

	return list;
}

export { convertListingToList };
