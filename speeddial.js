var Constants = {
	CDATA_START: "[CDATA[",
	CDATA_END:   "]]",
	STATE_DONE:   4,
	STATUS_OK:    200,
	TIME_1S:      1000,
	TIME_3H:      1000 * 60 * 60 * 3
};

function fetchFeed() {
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		if (this.readyState === Constants.STATE_DONE && this.status === Constants.STATUS_OK) {
			parseFeed(xhr.responseText);
		}
	};
	xhr.open("GET", "https://interfacelift.com/wallpaper/rss/index.xml");
	xhr.send(null);
}

function parseFeed(response) {
	if (response.length == 0) {
		return;
	}

	var temp = document.createElement("div");
	temp.innerHTML = response;
	var feedItem = temp.getElementsByTagName("item")[0];
	temp.innerHTML = getContentOfCDATA(feedItem.getElementsByTagName("description")[0].innerHTML);
	var sdUrl = temp.getElementsByTagName('a')[0].href;
	var sdTitle = getContentOfCDATA(feedItem.getElementsByTagName("title")[0].innerHTML);
	opr.speeddial.update({
		title: sdTitle,
		url:   sdUrl
	});
	background.change(temp.getElementsByTagName("img")[0].src);
}

var background = {
	back:  document.getElementById("backBackground"),
	front: document.getElementById("frontBackground"),
	defaultClass:  "background",
	fadeableClass: "fadeable",
	change: function (imgSrc) {
		this.front.style.backgroundImage = this.back.style.backgroundImage || "url(img/white.gif)";
		this.removeFadeable();
		this.front.style.opacity = 1;
		window.setTimeout(function () {
			this.back.style.backgroundImage = "url(" + imgSrc + ')';
			this.addFadeable();
			this.front.style.opacity = 0;
		}.bind(this), Constants.TIME_1S);
	},
	removeFadeable: function () {
		this.front.className = this.defaultClass;
	},
	addFadeable: function () {
		this.front.className = this.defaultClass + " " + this.fadeableClass;
	}
};

function getContentOfCDATA(cdata) {
	return cdata.slice(
		cdata.indexOf(Constants.CDATA_START) + Constants.CDATA_START.length,
		cdata.indexOf(Constants.CDATA_END)
	);
}

window.addEventListener("load", function () {
	fetchFeed();
	window.setInterval(function () {
	  fetchFeed();
	}, Constants.TIME_3H);
}, false);
