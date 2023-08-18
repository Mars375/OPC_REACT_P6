import { createElement } from "../utils/createElement.js";

export class ModalForm {
  constructor(container) {
    this.$modal = document.querySelector(container);
    this.$innerModal = document.querySelector('.modal__inner');
    this.$showModalButton = document.querySelector('.photograph-header__button');
    this.$closeModalButton = document.querySelector('.modal__close');
    this.$modalPhotographName = document.querySelector('.modal__photograph-name');

    this.displayModal = this.displayModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // Create the modal form and its content
  createModal() {
    const $contactForm = createElement('form', {
      class: 'modal__form'
    });

    const formElements = [
      { label: 'First Name', id: 'first-name', name: 'first-name', type: 'text' },
      { label: 'Last Name', id: 'last-name', name: 'last-name', type: 'text' },
      { label: 'Email', id: 'email', name: 'email', type: 'email' },
      { label: 'Message', id: 'message', name: 'message', rows: '5', type: 'textarea' }
    ];

    formElements.forEach(element => {
      const inputElement = element.type === 'textarea'
        ? createElement('textarea', { class: 'modal__form__input', ...element })
        : createElement('input', { class: 'modal__form__input', ...element });

      const labelElement = createElement('label', {
        class: 'modal__form__label',
        for: element.id,
        innerText: element.label
      });

      $contactForm.append(labelElement, inputElement);
    });

    const $contactFormSubmitButton = createElement('button', {
      class: 'modal__form__submit',
      type: 'submit',
      innerText: 'Send'
    });

    $contactForm.append($contactFormSubmitButton);
    this.$innerModal.appendChild($contactForm);
  }

  // Display the modal and add event listeners
  displayModal() {
    this.$modal.style.display = "flex";
    this.$showModalButton.removeEventListener('click', this.displayModal);
    this.$closeModalButton.addEventListener('click', this.closeModal);
  }

  // Close the modal and remove event listeners
  closeModal() {
    this.$modal.style.display = "none";
    this.$closeModalButton.removeEventListener('click', this.closeModal);
    this.$showModalButton.addEventListener('click', this.displayModal);
  }

  init() {
    this.createModal();
    this.$showModalButton.addEventListener('click', this.displayModal);
  }
}
