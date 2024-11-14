// script.js
function openIframe() {
	document.getElementById('iframePopup').style.display = 'block';
}

window.onclick = function (event) {
	var iframePopup = document.getElementById('iframePopup');
	if (event.target === iframePopup) {
		iframePopup.style.display = 'none';
	}
};
