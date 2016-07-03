// import Utils.js

function Feed(callback) {
	this.fetch = () => {
		window.fetch("https://interfacelift.com/wallpaper/rss/index.xml")
			.then(response => response.text())
			.then(responseText => {
				var responseDocument = Utils.parseHTML(responseText);
				parse(responseDocument);
			});
	};

	var parse = response => {
		var feedItem = response.querySelector("item");
		var description = Utils.parseHTML(
			Utils.getContentOfCDATA(feedItem.querySelector("description").innerHTML)
		);
		var backgroundSrc = description.querySelector("img").src;
		window.fetch(backgroundSrc).then(response => {
			if (!response.ok) {
				// Fall back to the bigger preview image available through the site
				backgroundSrc = backgroundSrc.replace("@2x", "_672x420");
			}
			var title = Utils.getContentOfCDATA(feedItem.querySelector("title").innerHTML);
			var author = Utils.parseAuthor(feedItem.querySelector("author").innerHTML);
			var sdTitle = title + " by " + author;
			var sdUrl = description.querySelector('a').href;
			callback(sdTitle, sdUrl, backgroundSrc);
		});
	};
}
