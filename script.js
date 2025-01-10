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

// Initialize refresh button and section toggles
function initializeApp() {
	initializeRefreshButton();
	initializeSectionToggles();
}

// Since we're using defer, we don't need DOMContentLoaded
initializeApp();
