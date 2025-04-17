import Rails from '@rails/ujs';
Rails.start();

import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-mono/400.css';

require('datatables.net-dt');
require('datatables.net-buttons/js/buttons.html5');
require('datatables.net-fixedheader-dt');
require('datatables.net-fixedheader-dt/css/fixedHeader.dataTables.css');
import $ from 'jquery';
window.$ = jQuery;

require('javascripts/autocomplete.js');
require('javascripts/datatables.js');

require('stylesheets/application.scss');
require('stylesheets/datatables.scss');

const images = require.context('../images', true);
document.addEventListener('DOMContentLoaded', function() {
  const themeToggleBtn = document.getElementById('theme-toggle')
  const darkIcon = document.getElementById('theme-toggle-dark-icon')
  const lightIcon = document.getElementById('theme-toggle-light-icon')

  // Check for user's preference in local storage
  const currentTheme = localStorage.getItem('theme')
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode')
    darkIcon.classList.remove('hidden')
    lightIcon.classList.add('hidden')
  }

  themeToggleBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode')
    darkIcon.classList.toggle('hidden')
    lightIcon.classList.toggle('hidden')
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light')
  }
  )
})

$(document).ready(function() {
  let isDragging = false;
  let startY = 0;
  let originalHeight = $('#header').height();
  let menuItems = $('#menu-items');
  let selectedIndex = 0; // Keep track of the selected menu item

  $('#header').on('mousedown', function(e) {
    isDragging = true;
    startY = e.clientY;
  });

  $(document).on('mousemove', function(e) {
    if (isDragging) {
      let diff = e.clientY - startY;
      $('#header').height(originalHeight + diff);

      // Reposition the menu items horizontally
      menuItems.css('transform', `translateX(-${selectedIndex * 100}%)`);
    }
  });

  $(document).on('mouseup', function(e) {
    if (isDragging) {
      isDragging = false;
      
      // Animate the header back to its original height
      $('#header').animate({ height: originalHeight }, 300);

      // Determine the selected menu item based on the drag
      let headerHeight = $('#header').height();
      let totalItems = menuItems.children().length;
      let itemHeight = headerHeight / totalItems;

      let offsetTop = headerHeight - originalHeight;
      selectedIndex = Math.max(0, Math.floor(offsetTop / itemHeight));
      selectedIndex = Math.min(selectedIndex,totalItems-1) //make sure the index is within the limits

      // Update the placeholder with the selected item's text
      let selectedText = menuItems.children().eq(selectedIndex).text();
      $('#autocomplete').attr('placeholder', selectedText);

      menuItems.children().removeClass('selected');
      menuItems.children().eq(selectedIndex).addClass('selected');

    }
  });
})
