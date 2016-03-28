// import Utils.js

function Feed(extension) {
	this.fetch = function () {
		var xhr = new XMLHttpRequest();
		xhr.timeout = Utils.TIME_1S * 5;
		xhr.responseType = "document";
		xhr.onload = function () {
			if (this.readyState === Utils.STATE_DONE && this.status === Utils.STATUS_OK) {
				parse(xhr.response);
			}
		};
		xhr.open("GET", "https://interfacelift.com/wallpaper/rss/index.xml");
		xhr.send(null);
	};

	var parse = function (response) {
		var feedItem = response.querySelector("item");
		var description = Utils.createDiv(
			Utils.getContentOfCDATA(feedItem.querySelector("description").innerHTML)
		);
		var sdUrl = description.querySelector('a').href;
		var sdTitle = Utils.getContentOfCDATA(feedItem.querySelector("title").innerHTML);
		opr.speeddial.update({
			title: sdTitle,
			url:   sdUrl
		});
		extension.background.change(description.querySelector("img").src);
		extension.lastUpdate = Date.now();
	};
}
