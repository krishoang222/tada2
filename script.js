// script.js
function openSheet() {
	window.open(
		'https://docs.google.com/spreadsheets/d/1bPuZ2BE0TTzUSrD6GOXs4E3f5Q32YhAQEdBHXIm8ECc/edit?gid=952179595',
		'_blank'
	);
}

// Refresh mechanism for PWA
function addRefreshButton() {
	// Create refresh button element
	const refreshButton = document.createElement('button');
	refreshButton.innerHTML = '&#x21bb;'; // Circular arrow refresh icon
	refreshButton.classList.add('refresh-button');

	// Styling for iOS-friendly button
	refreshButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 100px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #007AFF;
    color: white;
    border: none;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
		cursor: pointer;
  `;

	// Refresh action
	refreshButton.addEventListener('click', () => {
		// Option 1: Simple page reload
		window.location.reload();

		// Option 2: Service Worker based refresh
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.ready.then((registration) => {
				registration.update();
			});
		}
	});

	// Add to document body
	document.body.appendChild(refreshButton);
}

// Call when app initializes
document.addEventListener('DOMContentLoaded', addRefreshButton);
