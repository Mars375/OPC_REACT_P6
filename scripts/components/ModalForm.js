import { createElement } from '../utils/createElement.js';

export class ModalForm {
  constructor(photographer, container, innerContainer, showModalButton, closeModalButton, modalTitle) {
    // Initialize class properties
    this._photographer = photographer;
    this.$modal = document.querySelector(container);
    this.$innerModal = document.querySelector(innerContainer);
    this.$showModalButton = document.querySelector(showModalButton);
    this.$closeModalButton = document.querySelector(closeModalButton);
    this.$modalTitle = document.querySelector(modalTitle);
    this.$body = document.body;

    // Bind methods to the class instance
    this.displayModal = this.displayModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleFocusTrap = this.handleFocusTrap.bind(this);

    // Create the modal form and its content
    this.createModal();
  }

  // Create the modal form and its content
  createModal() {
    // Set ARIA attributes for accessibility
    this.$modal.setAttribute('aria-hidden', 'true');
    this.$modal.setAttribute('aria-label', `Contact me ${this._photographer.name}`);
    this.$modal.setAttribute('aria-labelledby', 'modal__title');

    this.$closeModalButton.setAttribute('aria-label', 'Close the modal');

    const $modalContent = createElement('div', {
      class: 'modal__content'
    });

    const $contactForm = createElement('form', {
      class: 'modal__form'
    });

    const formElements = [
      { label: 'Prénom', id: 'first-name', name: 'first-name', type: 'text' },
      { label: 'Nom', id: 'last-name', name: 'last-name', type: 'text' },
      { label: 'Email', id: 'email', name: 'email', type: 'email' },
      { label: 'Votre Message', id: 'message', name: 'message', rows: '5', type: 'textarea' }
    ];

    formElements.forEach(element => {
      // Create input or textarea elements based on the type
      const inputElement = element.type === 'textarea'
        ? createElement('textarea', { class: 'modal__form__input', ...element, 'aria-label': element.label })
        : createElement('input', { class: 'modal__form__input', ...element, 'aria-label': element.label });

      // Create label elements for form elements
      const labelElement = createElement('label', {
        class: 'modal__form__label',
        for: element.id,
        innerText: element.label
      });

      $modalContent.append(labelElement, inputElement);
    });

    const $contactFormSubmitButton = createElement('button', {
      class: 'modal__form__submit',
      type: 'submit',
      innerText: 'Envoyer',
      'aria-label': 'Submit the form',
    });

    // Handle form submission and modal closure
    $contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Get the form data
      const formData = new FormData($contactForm);

      // Create an object from the form data
      const formObject = Object.fromEntries(formData.entries());

      // Log the form data
      console.log(formObject);
      this.closeModal();
    });

    $contactForm.append($modalContent, $contactFormSubmitButton);
    this.$innerModal.appendChild($contactForm);
    this.$modalTitle.innerHTML += `<br> ${this._photographer.name}`;

    // Add event listener to handle focus trapping
    this.$modal.addEventListener('keydown', this.handleFocusTrap);
  }

  // Function to handle focus trapping inside the modal
  handleFocusTrap(event) {
    if (event.key === 'Tab') {
      const focusableElements = this.$modal.querySelectorAll('.modal__form__input');
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusable) {
        // Shift + Tab from the first element
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        // Tab from the last element
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  // Initialize the modal form
  init() {
    this.$showModalButton.addEventListener('click', () => {
      this.displayModal();
      this.$modal.focus();
    });
    this.$innerModal.focus();
    document.body.classList.remove('overlay-active');

  }

  // Display the modal and add event listeners
  displayModal() {
    this.$modal.style.display = 'flex';
    document.body.classList.add('overlay-active');
    this.$showModalButton.removeEventListener('click', this.displayModal);
    this.$closeModalButton.addEventListener('click', this.closeModal);

    // Add event listeners to close the modal on outside click or ESC key press
    document.addEventListener('click', this.closeModalOnOutsideClick.bind(this));
    document.addEventListener('keydown', this.closeModalOnOutsideClick.bind(this));
  }

  // Close the modal when the user clicks outside of it or presses the ESC key
  closeModalOnOutsideClick(event) {
    if (event.target === document.body || event.key === 'Escape') {
      this.closeModal();
    }
  }

  // Close the modal and remove event listeners
  closeModal() {

    // clear the form
    const $form = document.querySelector('.modal__form');
    $form.reset();
    this.$modal.style.display = 'none';
    document.body.classList.remove('overlay-active');
    this.$closeModalButton.removeEventListener('click', this.closeModal);
    this.$showModalButton.addEventListener('click', this.displayModal);

    // Remove event listeners to prevent memory leaks
    document.removeEventListener('click', this.closeModalOnOutsideClick.bind(this));
    document.removeEventListener('keydown', this.closeModalOnOutsideClick.bind(this));
  }
}
