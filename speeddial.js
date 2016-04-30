// import Utils.js, Background.js, Feed.js

var ext = {
	lastUpdate: Date.now(),
	background: new Background(),
	updateIfNeeded: url => {
		if (typeof(url) !== "undefined" && ~url.indexOf(Utils.SPEED_DIAL)) {
			var msSinceLastUpdate = Date.now() - ext.lastUpdate;
			if (ext.background.isEmpty() || msSinceLastUpdate > Utils.TIME_1H * 3) {
				ext.feed.fetch();
			}
		}
	}
};
ext.feed = new Feed(ext);

chrome.tabs.onActivated.addListener(activeInfo => {
	chrome.tabs.get(activeInfo.tabId, tab => {
		ext.updateIfNeeded(tab.url);
	});
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	ext.updateIfNeeded(changeInfo.url);
});
