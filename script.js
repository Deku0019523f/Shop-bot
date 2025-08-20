/*
 * JavaScript for the Levanter Clone.
 *
 * Handles navigation between sections by attaching click events to
 * each menu item. When a user selects an item in the sidebar, the
 * corresponding content section is shown and all others are hidden.
 * A simple file preview feature is also implemented for the profile
 * picture upload. This allows users to see a preview of their chosen
 * image before saving. No files are uploaded or stored on the server
 * in this demo.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation handling (kept for extensibility, though only one item exists)
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');

  function showSection(targetId) {
    sections.forEach(section => {
      section.classList.toggle('active', section.id === targetId);
    });
  }

  function updateActiveNav(el) {
    navItems.forEach(item => item.classList.remove('active'));
    if (el) el.classList.add('active');
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-target');
      showSection(target);
      updateActiveNav(item);
    });
  });

  // Elements for the session flow
  const phoneStep = document.getElementById('phone-step');
  const codeStep = document.getElementById('code-step');
  const sessionIdStep = document.getElementById('session-id-step');
  const phoneInput = document.getElementById('phoneInput');
  const connectBtn = document.getElementById('connectBtn');
  const confirmCodeBtn = document.getElementById('confirmCodeBtn');
  const pairingCodeElement = document.getElementById('pairingCode');
  const sessionIdElement = document.getElementById('sessionId');

  // Helper to generate a random pairing code (e.g., 4 letters and 4 digits)
  function generatePairingCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    let codeLetters = '';
    for (let i = 0; i < 4; i++) {
      codeLetters += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    let codeDigits = '';
    for (let i = 0; i < 4; i++) {
      codeDigits += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return `${codeLetters}-${codeDigits}`;
  }

  // Connect button handler
  if (connectBtn) {
    connectBtn.addEventListener('click', () => {
      const phone = phoneInput.value.trim();
      if (!phone) {
        alert('Veuillez saisir votre numéro WhatsApp.');
        return;
      }
      // Generate and display pairing code
      const code = generatePairingCode();
      pairingCodeElement.textContent = code;
      // Transition to code step
      phoneStep.classList.remove('active');
      codeStep.classList.add('active');
    });
  }

  // Confirm code button handler
  if (confirmCodeBtn) {
    confirmCodeBtn.addEventListener('click', () => {
      // In a real application, here you would verify the code via backend
      // For this demo we simply show the session ID
      const sessionId = 'Deku225_sessionid';
      sessionIdElement.textContent = sessionId;
      codeStep.classList.remove('active');
      sessionIdStep.classList.add('active');
    });
  }
});