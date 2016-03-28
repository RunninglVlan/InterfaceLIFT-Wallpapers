// import Utils.js, Background.js, Feed.js

var ext = {
	lastUpdate: Date.now(),
	background: new Background(),
	updateIfNeeded: function (url) {
		if (typeof(url) !== "undefined" && ~url.indexOf(Utils.SPEED_DIAL)) {
			var msSinceLastUpdate = Date.now() - this.lastUpdate;
			if (ext.background.isEmpty() || msSinceLastUpdate > Utils.TIME_1H * 3) {
				this.feed.fetch();
			}
		}
	}
};
ext.feed = new Feed(ext);

chrome.tabs.onActivated.addListener(function (activeInfo) {
	chrome.tabs.get(activeInfo.tabId, function (tab) {
		ext.updateIfNeeded(tab.url);
	});
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	ext.updateIfNeeded(changeInfo.url);
});
