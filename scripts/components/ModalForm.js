import { createElement } from "../utils/createElement.js";

export class ModalForm {
  constructor(photographer, container, innerContainer, showModalButton, closeModalButton, modalTitle) {

    this._photographer = photographer;
    this.$modal = document.querySelector(container);
    this.$innerModal = document.querySelector(innerContainer);
    this.$showModalButton = document.querySelector(showModalButton);
    this.$closeModalButton = document.querySelector(closeModalButton);
    this.$modalTitle = document.querySelector(modalTitle);
    this.$body = document.body;

    this.displayModal = this.displayModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // Create the modal form and its content
  createModal() {

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
      const inputElement = element.type === 'textarea'
        ? createElement('textarea', { class: 'modal__form__input', ...element })
        : createElement('input', { class: 'modal__form__input', ...element });

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
      innerText: 'Envoyer'
    });

    $contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.closeModal();
    });

    $contactForm.append($modalContent, $contactFormSubmitButton);
    this.$innerModal.appendChild($contactForm);
    this.$modalTitle.innerHTML += `<br> ${this._photographer.name}`;
  }

  // Close the modal when the user clicks outside of it or presses the ESC key
  closeModalOnOutsideClick(event) {
    if (event.target === document.body || event.key === 'Escape') {
      this.closeModal();
    }
  }

  // Display the modal and add event listeners
  displayModal() {
    this.$modal.style.display = "flex";
    document.body.classList.add('overlay-active');
    this.$showModalButton.removeEventListener('click', this.displayModal);
    this.$closeModalButton.addEventListener('click', this.closeModal);

    // Close the modal when the user clicks outside of it or presses the ESC key
    document.addEventListener('click', this.closeModalOnOutsideClick.bind(this));
    document.addEventListener('keydown', this.closeModalOnOutsideClick.bind(this));
  }

  // Close the modal and remove event listeners
  closeModal() {
    this.$modal.style.display = "none";
    document.body.classList.remove('overlay-active');
    this.$closeModalButton.removeEventListener('click', this.closeModal);
    this.$showModalButton.addEventListener('click', this.displayModal);

    // Remove event listeners
    document.removeEventListener('click', this.closeModalOnOutsideClick.bind(this));
    document.removeEventListener('keydown', this.closeModalOnOutsideClick.bind(this));
  }

  init() {
    this.createModal();
    this.$showModalButton.addEventListener('click', this.displayModal);
    document.body.classList.remove('overlay-active');
  }
}
