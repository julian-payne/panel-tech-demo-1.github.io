"use strict"

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', $event => {
  alert($event.returnValue);
})
