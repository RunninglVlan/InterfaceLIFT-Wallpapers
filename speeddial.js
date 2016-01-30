var Constants = {
	STATE_DONE: 4,
	STATUS_OK:  200,
	TIME_1S:    1000,
	TIME_5S:    1000 * 5,
	TIME_3H:    1000 * 60 * 60 * 3
};

var ext = {
	lastUpdate: Date.now(),
	background: new Background(),
	utils: new Utils(),
	updateIfNeeded: function (url) {
		if (typeof(url) !== "undefined" && ~url.indexOf("browser://startpage/")) {
			var msSinceLastUpdate = Date.now() - this.lastUpdate;
			if (msSinceLastUpdate > Constants.TIME_3H) {
				fetchFeed();
			}
		}
	}
};

chrome.tabs.onActivated.addListener(function (activeInfo) {
	chrome.tabs.get(activeInfo.tabId, function (tab) {
		ext.updateIfNeeded(tab.url);
	});
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	ext.updateIfNeeded(changeInfo.url);
});

function fetchFeed() {
	var xhr = new XMLHttpRequest();
	xhr.timeout = Constants.TIME_5S;
	xhr.responseType = "document";
	xhr.onload = function () {
		if (this.readyState === Constants.STATE_DONE && this.status === Constants.STATUS_OK) {
			parseFeed(xhr.response);
		}
	};
	xhr.open("GET", "https://interfacelift.com/wallpaper/rss/index.xml");
	xhr.send(null);
}

function parseFeed(response) {
	var feedItem = response.querySelector("item");
	var description = ext.utils.createElement(
		ext.utils.getContentOfCDATA(feedItem.querySelector("description").innerHTML)
	);
	var sdUrl = description.querySelector('a').href;
	var sdTitle = ext.utils.getContentOfCDATA(feedItem.querySelector("title").innerHTML);
	opr.speeddial.update({
		title: sdTitle,
		url:   sdUrl
	});
	ext.background.change(description.querySelector("img").src);
	ext.lastUpdate = Date.now();
}

function Background() {
	var DEFAULT_CLASS  = "background";
	var FADEABLE_CLASS = "fadeable";
	var back  = document.querySelector("#backBackground");
	var front = document.querySelector("#frontBackground");

	this.change = function (imgSrc) {
		front.style.backgroundImage = back.style.backgroundImage || "url(img/white.gif)";
		removeFadeable();
		front.style.opacity = 1;
		window.setTimeout(function () {
			back.style.backgroundImage = "url(" + imgSrc + ')';
			window.setTimeout(function () {
				addFadeable();
				front.style.opacity = 0;
			}, Constants.TIME_1S);
		}, Constants.TIME_1S);
	};
	var removeFadeable = function () {
		front.className = DEFAULT_CLASS;
	};
	var addFadeable = function () {
		front.className = DEFAULT_CLASS + " " + FADEABLE_CLASS;
	};
}

function Utils() {
	var CDATA_START = "[CDATA[";
	var CDATA_END   = "]]";

	this.getContentOfCDATA = function (cdata) {
		return cdata.slice(
			cdata.indexOf(CDATA_START) + CDATA_START.length,
			cdata.indexOf(CDATA_END)
		);
	};
	this.createElement = function (content) {
		var element = document.createElement("div");
		element.innerHTML = content;
		return element;
	};
}

window.addEventListener("load", fetchFeed, false);
