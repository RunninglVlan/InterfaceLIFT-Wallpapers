// import Background.js, Feed.js

const ext = {
	SPEED_DIAL: "://startpage/",
	UPDATE_TIME_MS: 1000 * 60 * 60 * 3,
	lastUpdate: Date.now(),
	background: new Background(),
	updateIfNeeded: function (url) {
		if (url && url.includes(this.SPEED_DIAL)) {
			const msSinceLastUpdate = Date.now() - this.lastUpdate;
			if (this.background.isEmpty() || msSinceLastUpdate > this.UPDATE_TIME_MS) {
				this.feed.fetch();
			}
		}
	},
	feed: new Feed((sdTitle, sdUrl, backgroundSrc) => {
		opr.speeddial.update({
			title: sdTitle,
			url:   sdUrl
		});
		ext.background.change(backgroundSrc);
		ext.lastUpdate = Date.now();
	})
};

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
