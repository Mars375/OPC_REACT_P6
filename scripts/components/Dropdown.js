import { createElement } from '../utils/createElement.js';
import { sortMedia } from '../utils/sortMedia.js';

export class Dropdown {
  constructor(photographer, containerSelector) {
    this.options = ['Popularité', 'Date', 'Titre'];
    this.$containerSelector = document.querySelector(containerSelector);
    this.selectedOption = this.options[0];
    this._media = photographer;
    this.$dropdownButton = null;
    this.$dropdownList = null;
    this.$dropdownText = null;

    this.createDropdown();
  }

  // Create a dropdown item with event listener for click
  createDropdownItem(option) {
    const dropdownItem = createElement('li', {
      class: 'dropdown__item',
      innerText: option,
      tabIndex: '0',
      role: 'option',
    });

    dropdownItem.addEventListener('click', () => {
      this.handleDropdownItemClick(option);
    });

    return dropdownItem;
  }

  // Handle button click to expand/collapse dropdown list
  handleDropdownButtonClick() {
    const isExpanded = this.$dropdownButton.getAttribute('aria-expanded') === 'true';
    this.$dropdownButton.setAttribute('aria-expanded', !isExpanded);
    this.$dropdownButton.setAttribute('aria-label', `Order by ${this.selectedOption}`);
    this.$dropdownList.style.display = isExpanded ? 'none' : 'block';
    this.$dropdownList.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');

    const tabIndex = isExpanded ? '-1' : '0';
    this.$dropdownList.querySelectorAll('.dropdown__item').forEach(item => {
      item.tabIndex = tabIndex;
    });
  }

  // Create the dropdown with label, button, and list items
  createDropdown() {
    const dropdownLabel = createElement('label', {
      class: 'dropdown__label',
      innerText: 'Trier par',
      id: 'dropdown-label',
    });

    this.$dropdownButton = createElement('button', {
      class: 'dropdown__button',
      tabIndex: '0',
      'aria-haspopup': 'listbox',
      'aria-expanded': 'false',
      'aria-label': `Order by ${this.selectedOption}`,
      'aria-labelledby': 'dropdown-label',
    });

    this.$dropdownText = createElement('span', {
      class: 'dropdown__text',
      innerText: this.selectedOption,
    });

    const dropdownIcon = createElement('i', {
      class: 'fas fa-chevron-down dropdown__icon',
      'aria-hidden': 'true',
    });

    this.$dropdownList = createElement('ul', {
      class: 'dropdown__list',
      'aria-hidden': 'true',
      role: 'listbox',
    });

    this.options.forEach(option => {
      const dropdownItem = this.createDropdownItem(option);
      this.$dropdownList.append(dropdownItem);
    });

    const dropdownItemsIcon = createElement('i', {
      class: 'fas fa-chevron-up dropdown__icon',
      'aria-hidden': 'true',
    });

    this.$dropdownButton.addEventListener('click', () => {
      this.handleDropdownButtonClick(this.$dropdownButton, this.$dropdownList);
    });

    const dropdown = createElement('div', {
      class: 'dropdown',
    });

    this.$dropdownList.firstElementChild.append(dropdownItemsIcon);
    this.$dropdownButton.append(this.$dropdownText, dropdownIcon);
    dropdown.append(this.$dropdownButton, this.$dropdownList);
    this.$containerSelector.append(dropdownLabel, dropdown);
  }

  // Reorder options based on selected option
  reorderOptions() {
    const selectedOptionIndex = this.options.indexOf(this.selectedOption);
    const reorderedOptions = [...this.options];
    reorderedOptions.splice(selectedOptionIndex, 1);
    reorderedOptions.unshift(this.selectedOption);
    this.options = reorderedOptions;
  }

  // Update dropdown list with new options
  updateDropdownList() {
    this.$dropdownList.innerHTML = '';
    this.options.forEach(option => {
      const dropdownItem = this.createDropdownItem(option);
      this.$dropdownList.append(dropdownItem);
    });
  }

  // Handle dropdown item click and update sorting and rendering
  handleDropdownItemClick(option) {
    if (this.selectedOption === option) return this.handleDropdownButtonClick();
    this.selectedOption = option;
    this.sortAndRenderMedia(option);
    this.handleDropdownButtonClick();

    this.$dropdownText.innerText = option;
    this.reorderOptions();
    this.updateDropdownList();
  }

  // Sort and render media based on selected option
  sortAndRenderMedia(option) {
    this.selectedOption = option;
    this._media = sortMedia(this._media, this.selectedOption.toLowerCase());
    const event = new CustomEvent('mediaSorted', { detail: this._media });
    document.dispatchEvent(event);
  }
}
