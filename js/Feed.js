// import Utils.js

const Feed = (() => {
	let instance, callback;

	class Feed {
		constructor(c) {
			if (!instance) {
				instance = this;
				callback = c;
			}
			return instance;
		}

		fetch() {
			window.fetch("https://interfacelift.com/wallpaper/rss/index.xml")
				.then(response => response.text())
				.then(responseText => {
					const responseDocument = Utils.parseHTML(responseText);
					parse(responseDocument);
				});
		}
	}

	const parse = response => {
		const feedItem = response.querySelector("item");
		const description = Utils.parseHTML(
			Utils.getContentOfCDATA(feedItem.querySelector("description").innerHTML)
		);
		let backgroundSrc = description.querySelector("img").src;
		window.fetch(backgroundSrc).then(response => {
			if (!response.ok) {
				// Fall back to the bigger preview image available through the site
				backgroundSrc = backgroundSrc.replace("@2x", "_672x420");
			}
			const title   = Utils.getContentOfCDATA(feedItem.querySelector("title").innerHTML);
			const author  = Utils.parseAuthor(feedItem.querySelector("author").innerHTML);
			const sdTitle = `${title} by ${author}`;
			const sdUrl   = description.querySelector('a').href;
			callback(sdTitle, sdUrl, backgroundSrc);
		});
	};

	return Feed;
})();
