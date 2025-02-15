// Configuration constants
const TABLEAU_LOAD_COUNTDOWN = 10; // Single source of truth for countdown value
const MESSAGES = {
	loading: (seconds) => `Note: Anh em đợi load bảng xíu nha (${seconds}s)`,
	fallout: `Note: Nếu ae k click đc mã QR trong bảng thì ae click nút <a href="https://sharedi.vn/qr/tada" class="responsive-button" target="_blank">QR (mobile)</a> này để nhập số tiền + nội dung nha`,
};

// Refresh mechanism for PWA
function initializeRefreshButton() {
	const refreshButton = document.getElementById('btn-refresh');

	if (refreshButton) {
		refreshButton.addEventListener('click', async () => {
			console.log('click');
			if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
				// If we have a service worker, update it first
				const registration = await navigator.serviceWorker.ready;
				console.log(registration);
				await registration.update();
			}
			// Then reload the page
			window.location.reload();
		});
	}
}

function initializeSectionToggles() {
	const sectionTitles = document.querySelectorAll('.section-title');

	sectionTitles.forEach((button) => {
		button.addEventListener('click', () => {
			const isExpanded = button.getAttribute('aria-expanded') === 'true';
			const sectionContent = button.nextElementSibling;

			// Toggle the aria-expanded state
			button.setAttribute('aria-expanded', (!isExpanded).toString());

			// Toggle visibility class instead of hidden attribute
			if (sectionContent) {
				sectionContent.classList.toggle('visible', !isExpanded);
			}
		});
	});
}

// ... rest of your existing code ...

function initializeCountdown() {
	let countdown = TABLEAU_LOAD_COUNTDOWN;
	const statusMessage = document
		.getElementById('statusMessage')
		.querySelector('p');

	console.log('init countdown');

	// Set initial message
	if (statusMessage) {
		statusMessage.innerHTML = MESSAGES.loading(countdown);
	}

	const countdownInterval = setInterval(() => {
		countdown--;
		if (statusMessage) {
			if (countdown > 0) {
				statusMessage.innerHTML = MESSAGES.loading(countdown);
			} else {
				statusMessage.innerHTML = MESSAGES.fallout;
				clearInterval(countdownInterval);
			}
		}
	}, 1000);
}

function initializeTableau() {
	console.log('init tableau');
	const divElement = document.getElementById('viz1736027199757');
	if (!divElement) return; // Exit if element doesn't exist

	const vizElement = divElement.getElementsByTagName('object')[0];

	// Insert loading indicator before the tableau div
	const loadingDiv = document.createElement('div');
	loadingDiv.id = 'tableauLoading';
	loadingDiv.className = 'loading-tableau';
	loadingDiv.innerHTML = `
			<div class="spinner"></div>
			<p>Đang tải bảng thống kê...</p>
	`;
	divElement.parentNode.insertBefore(loadingDiv, divElement);

	// Set initial dimensions
	if (divElement.offsetWidth > 800) {
		vizElement.style.minWidth = '800px';
		vizElement.style.maxWidth = '100%';
		vizElement.style.minHeight = '1000px';
		vizElement.style.maxHeight = divElement.offsetWidth * 0.75 + 'px';
	} else if (divElement.offsetWidth > 500) {
		vizElement.style.minWidth = '800px';
		vizElement.style.maxWidth = '100%';
		vizElement.style.minHeight = '1000px';
		vizElement.style.maxHeight = divElement.offsetWidth * 0.75 + 'px';
	} else {
		vizElement.style.width = '100%';
		vizElement.style.minHeight = '750px';
		vizElement.style.maxHeight = divElement.offsetWidth * 1.77 + 'px';
	}

	const scriptElement = document.createElement('script');
	scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';

	// Hide loading indicator when Tableau is loaded
	scriptElement.onload = function () {
		setTimeout(function () {
			loadingDiv.style.display = 'none';
		}, 2000); // Give Tableau a couple seconds to render
	};

	vizElement.parentNode.insertBefore(scriptElement, vizElement);
}

// Initialize refresh button and section toggles
function initializeApp() {
	initializeRefreshButton();
	initializeSectionToggles();
	initializeTableau();
	initializeCountdown();
}

// Since we're using defer, we don't need DOMContentLoaded
initializeApp();
