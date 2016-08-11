// import Background.js, Feed.js

var ext = {
	SPEED_DIAL: "://startpage/",
	UPDATE_TIME_MS: 1000 * 60 * 60 * 3,
	lastUpdate: Date.now(),
	background: new Background(),
	updateIfNeeded: url => {
		if (typeof(url) !== "undefined" && ~url.indexOf(ext.SPEED_DIAL)) {
			var msSinceLastUpdate = Date.now() - ext.lastUpdate;
			if (ext.background.isEmpty() || msSinceLastUpdate > ext.UPDATE_TIME_MS) {
				ext.feed.fetch();
			}
		}
	}
};
ext.feed = new Feed((sdTitle, sdUrl, backgroundSrc) => {
	opr.speeddial.update({
		title: sdTitle,
		url:   sdUrl
	});
	ext.background.change(backgroundSrc);
	ext.lastUpdate = Date.now();
});

chrome.tabs.onActivated.addListener(activeInfo => {
	chrome.tabs.get(activeInfo.tabId, tab => {
		ext.updateIfNeeded(tab.url);
	});
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	ext.updateIfNeeded(changeInfo.url);
});
window.addEventListener("load", () => {
	ext.feed.fetch();
});
