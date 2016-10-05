const Background = (() => {
	const CHANGE_TIME_MS = 1000;
	const DEFAULT_CLASS  = "background", FADEABLE_CLASS = "fadeable";

	let instance;
	let back, front;

	class Background {
		constructor() {
			if (!instance) {
				instance = this;
				back  = document.querySelector("#backBackground");
				front = document.querySelector("#frontBackground");
			}
			return instance;
		}

		change(imgSrc) {
			front.style.backgroundImage = back.style.backgroundImage || "url(img/white.gif)";
			removeFadeable();
			front.style.opacity = 1;
			window.setTimeout(() => {
				back.style.backgroundImage = `url(${imgSrc})`;
				window.setTimeout(() => {
					addFadeable();
					front.style.opacity = 0;
				}, CHANGE_TIME_MS);
			}, CHANGE_TIME_MS);
		}
		isEmpty() { return !(back.style.backgroundImage || front.style.backgroundImage); }
	}

	const removeFadeable = () => {
		front.className = DEFAULT_CLASS;
	};
	const addFadeable = () => {
		front.className = DEFAULT_CLASS + ' ' + FADEABLE_CLASS;
	};

	return Background;
})();
