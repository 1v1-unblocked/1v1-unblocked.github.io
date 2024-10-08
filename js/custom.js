/*

Custom script

This file will not be overwritten by the updater

*/

// JavaScript code
function search_animal() {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let x = document.getElementsByClassName("animals");

  for (let i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "block";
    }
  }
}

// Google Analytics code
(function() {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-5R231DMLB7';
  document.head.appendChild(script);

  script.onload = function() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-5R231DMLB7');
  };
})();

 // Function to detect if it's a mobile device
    function isMobileDevice() {
        return window.matchMedia("(max-width: 767px)").matches || /Mobi|Android/i.test(navigator.userAgent);
    }

// PWA Installation Code
let deferredPrompt;

// Check if the PWA is already installed
const isPwaInstalled = localStorage.getItem('pwaInstalled');

if (!isPwaInstalled) {
  // Create and append the popup HTML
  const popupHTML = `
    <div id="pwa-popup" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.8); color: #333; text-align: center; z-index: 1000; display: flex; align-items: center; justify-content: center;">
      <div style="padding: 25px; background: #f5f5f5; border-radius: 20px; width: 90%; max-width: 450px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); text-align: center;">
        <h2 style="font-size: 22px; margin-bottom: 15px; color: #2c3e50; animation: fadeInDown 1s;">Hey there! 👋</h2>
        <p style="font-size: 16px; color: #444; margin-bottom: 25px; font-weight: bold; color: #ff7f50; animation: pulseText 2s infinite;">
          Don't Miss Out - <span style="color: #ff4500;">Install Our</span> Desktop App!
        </p>
        <button id="install-button" style="padding: 12px 28px; font-size: 18px; cursor: pointer; background: linear-gradient(135deg, #26616a, #184a52); color: white; border: none; border-radius: 30px; margin-right: 10px; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); align-items: center;">
          <i class="fas fa-download" style="margin-right: 10px; font-size: 20px;"></i>Add to Home Screen
        </button>
        <button id="close-popup" style="padding: 12px 28px; font-size: 18px; cursor: pointer; background-color: transparent; color: #888; border: none; border-radius: 30px; transition: color 0.3s ease;">
          Not Now
        </button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', popupHTML);

  const popup = document.getElementById('pwa-popup');
  const installButton = document.getElementById('install-button');
  const closePopupButton = document.getElementById('close-popup');

  // Listen for the 'beforeinstallprompt' event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // Prevent the default prompt
    deferredPrompt = e;
    popup.style.display = 'flex'; // Show the popup

    // Track that the install prompt was shown
    gtag('event', 'PWA Install Prompt', {
      'event_category': 'PWA',
      'event_label': 'Install Prompt Shown'
    });
  });

  // Handle the install button click
  installButton.addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
          // Track acceptance
          gtag('event', 'PWA Install Accepted', {
            'event_category': 'PWA',
            'event_label': 'Install Accepted'
          });
        } else {
          console.log('User dismissed the A2HS prompt');
          // Track dismissal
          gtag('event', 'PWA Install Dismissed', {
            'event_category': 'PWA',
            'event_label': 'Install Dismissed'
          });
        }
        deferredPrompt = null;
        popup.style.display = 'none'; // Hide the popup
      });
    }
  });

  // Handle the close popup button click
  closePopupButton.addEventListener('click', () => {
    popup.style.display = 'none'; // Hide the popup
  });

  // Listen for the 'appinstalled' event
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    localStorage.setItem('pwaInstalled', 'true'); // Save the flag in localStorage
    popup.style.display = 'none'; // Hide the popup
    // Track the PWA installation
    gtag('event', 'PWA Installed', {
      'event_category': 'PWA',
      'event_label': 'PWA Installed'
    });
  });
}
