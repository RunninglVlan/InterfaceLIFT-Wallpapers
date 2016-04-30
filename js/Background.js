// import Utils.js

function Background() {
	var DEFAULT_CLASS  = "background";
	var FADEABLE_CLASS = "fadeable";
	var back  = document.querySelector("#backBackground");
	var front = document.querySelector("#frontBackground");

	this.change = imgSrc => {
		front.style.backgroundImage = back.style.backgroundImage || "url(img/white.gif)";
		removeFadeable();
		front.style.opacity = 1;
		window.setTimeout(() => {
			back.style.backgroundImage = "url(" + imgSrc + ')';
			window.setTimeout(() => {
				addFadeable();
				front.style.opacity = 0;
			}, Utils.TIME_1S);
		}, Utils.TIME_1S);
	};
	this.isEmpty = () => !(back.style.backgroundImage || front.style.backgroundImage);
	var removeFadeable = () => {
		front.className = DEFAULT_CLASS;
	};
	var addFadeable = () => {
		front.className = DEFAULT_CLASS + " " + FADEABLE_CLASS;
	};
}
