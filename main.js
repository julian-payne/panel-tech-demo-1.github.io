"use strict";

function setup() {
  const contactForm = document.querySelector('.contact-form');

  const email = document.querySelector('.contact-form__email');
  const email_required_error = document.querySelector('.contact-form__email__required-error');
  const email_mismatch_error = document.querySelector('.contact-form__email__mismatch-error');

  const content = document.querySelector('.contact-form__content');
  const content_required_error = document.querySelector('.contact-form__content__required-error');

  const submit = document.querySelector('.contact-form__submit');

  let email_has_error = true;
  let content_has_error = true;

  function updateFormValidity() {
    if (email_has_error || content_has_error) {
      submit.classList.add('disabled');
    } else {
      submit.classList.remove('disabled');
    }
  }

  function validateContentField(callback) {
    const trimmed_content = content.value.trim();

    let has_error = false;

    if (!trimmed_content) {
      content_required_error.classList.remove('hidden');
      has_error = true;
    } else {
      content_required_error.classList.add('hidden');
    }

    content_has_error = has_error;

    if(callback) {
      callback();
    };
  }

  function validateEmailField(callback) {
    const trimmed_email = email.value.trim();

    let has_error = false;

    if (!trimmed_email) {
      email_required_error.classList.remove('hidden');
      has_error = true;
    } else {
      email_required_error.classList.add('hidden');
    }

    if (!/.+@.+\..+/.test(trimmed_email)) {
      email_mismatch_error.classList.remove('hidden');
      has_error = true;
    } else {
      email_mismatch_error.classList.add('hidden');
    }

    email_has_error = has_error;

    if(callback) {
      callback();
    };
  }

  function validateFormFields() {
    validateEmailField();
    validateContentField();
    updateFormValidity();
  }


  contactForm.addEventListener('submit', $event => {
    $event.preventDefault();

    const modal_container = document.createElement('div');
    const modal = document.createElement('div');

    modal_container.classList.add('modal-container');
    modal.classList.add('modal');

    modal.innerHTML = 'submitted value: ' + JSON.stringify({ email: email.value, content: content.value });

    modal_container.addEventListener('click', $event => {
      modal_container.remove();
    });

    modal.addEventListener('click', $event => {
      $event.stopPropagation();
      $event.stopImmediatePropagation();
    }, { capture: true });

    modal_container.appendChild(modal);
    document.body.appendChild(modal_container);
  });

  email.addEventListener('input', () => validateEmailField(updateFormValidity));
  content.addEventListener('input', () => validateContentField(updateFormValidity));

  updateFormValidity();
}

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    setup();
  }
});

