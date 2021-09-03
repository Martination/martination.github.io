/*!
* Written by Martin Green
* Modified from Start Bootstrap - Grayscale
* Licensed under MIT
*/

import './style.scss';
import { ScrollSpy } from 'bootstrap';
import resume from './assets/MartinGreenResume.pdf';


window.addEventListener('DOMContentLoaded', event => {

  // Navbar shrink function
  function navbarShrink() {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove('navbar-shrink');
    } else {
      navbarCollapsible.classList.add('navbar-shrink');
    }

  }

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener('scroll', navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
    new ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 72 + 150,
    });
  };

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });


  const resumeDownload = document.getElementById('resumeDownload');
  resumeDownload.href = resume;

});
