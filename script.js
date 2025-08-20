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
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');
  const preview = document.getElementById('preview');
  const fileInput = document.getElementById('fileInput');

  // Show the selected section and hide others
  function showSection(targetId) {
    sections.forEach(section => {
      if (section.id === targetId) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
  }

  // Update active class on sidebar items
  function updateActiveNav(el) {
    navItems.forEach(item => item.classList.remove('active'));
    if (el) el.classList.add('active');
  }

  // Event listeners for navigation items
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-target');
      showSection(target);
      updateActiveNav(item);
    });
  });

  // File input change handler for profile picture preview
  if (fileInput) {
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (!file) {
        preview.style.backgroundImage = '';
        preview.textContent = 'Aucun fichier sélectionné';
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        preview.style.backgroundImage = `url(${reader.result})`;
        preview.textContent = '';
      };
      reader.readAsDataURL(file);
    });
  }
});