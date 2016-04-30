// import Utils.js

function Feed(extension) {
	this.fetch = () => {
		window.fetch("https://interfacelift.com/wallpaper/rss/index.xml")
			.then(response => response.text())
			.then(responseText => {
				var responseDocument = Utils.createDiv(responseText);
				parse(responseDocument);
			});
	};

	var parse = response => {
		var feedItem = response.querySelector("item");
		var description = Utils.createDiv(
			Utils.getContentOfCDATA(feedItem.querySelector("description").innerHTML)
		);
		var title = Utils.getContentOfCDATA(feedItem.querySelector("title").innerHTML);
		var author = Utils.parseAuthor(feedItem.querySelector("author").innerHTML);
		var sdTitle = title + " by " + author;
		var sdUrl = description.querySelector('a').href;
		opr.speeddial.update({
			title: sdTitle,
			url:   sdUrl
		});
		extension.background.change(description.querySelector("img").src);
		extension.lastUpdate = Date.now();
	};
}
