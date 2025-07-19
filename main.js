"use strict"

const contactForm = document.querySelector('.contact-form');
const email = document.querySelector('.contact-form__email');
const content = document.querySelector('.contact-form__content');

contactForm.addEventListener('submit', $event => {
  alert('submitted value: ' + JSON.stringify({ email: email.value, content: content.value }, null, 2));
})
