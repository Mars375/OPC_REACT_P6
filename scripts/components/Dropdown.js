import { createElement } from '../utils/createElement.js';
import { sortMedia } from '../utils/sortMedia.js';

export class Dropdown {
  constructor(media, containerSelector) {
    this.options = ['Popularité', 'Date', 'Titre'];
    this.containerSelector = document.querySelector(containerSelector);
    this.selectedOption = this.options[0];
    this._media = media;

    this.createDropdown();
    this.sortAndRenderMedia(this.selectedOption);
  }

  // Create a dropdown item with event listener for click
  createDropdownItem(option) {
    const dropdownItem = createElement('li', {
      class: 'dropdown__item',
      innerText: option,
      tabIndex: '0',
    });

    dropdownItem.addEventListener('click', () => {
      this.handleDropdownItemClick(option);
    });

    return dropdownItem;
  }

  // Handle button click to expand/collapse dropdown list
  handleDropdownButtonClick(dropdownButton, dropdownList) {
    const isExpanded = dropdownButton.getAttribute('aria-expanded') === 'true';
    dropdownButton.setAttribute('aria-expanded', !isExpanded);
    dropdownList.style.display = isExpanded ? 'none' : 'block';
    dropdownList.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');

    const tabIndex = isExpanded ? '-1' : '0';
    dropdownList.querySelectorAll('.dropdown__item').forEach(item => {
      item.tabIndex = tabIndex;
    });
  }

  // Create the dropdown with label, button, and list items
  createDropdown() {
    const dropdownLabel = createElement('label', {
      class: 'dropdown__label',
      innerText: 'Sort by',
    });

    const dropdownButton = createElement('button', {
      class: 'dropdown__button',
      innerText: this.selectedOption,
      tabIndex: '0',
      'aria-expanded': 'false',
      'aria-label': 'Select a sorting criteria',
    });

    const dropdownList = createElement('ul', {
      class: 'dropdown__list',
      style: 'display: none;',
      'aria-hidden': 'true',
    });

    this.options.forEach(option => {
      const dropdownItem = this.createDropdownItem(option);
      dropdownList.append(dropdownItem);
    });

    dropdownButton.addEventListener('click', () => {
      this.handleDropdownButtonClick(dropdownButton, dropdownList);
    });

    const dropdown = createElement('div', {
      class: 'dropdown',
    });

    dropdown.append(dropdownButton, dropdownList);
    this.containerSelector.append(dropdownLabel, dropdown);
  }

  // Handle dropdown item click and update sorting and rendering
  handleDropdownItemClick(option) {
    this.selectedOption = option;
    this.sortAndRenderMedia(option);
    const dropdownButton = document.querySelector('.dropdown__button');
    const dropdownList = document.querySelector('.dropdown__list');
    this.handleDropdownButtonClick(dropdownButton, dropdownList);
  }

  // Sort and render media based on selected option
  sortAndRenderMedia(option) {
    this.selectedOption = option;
    this._media = sortMedia(this._media, this.selectedOption.toLowerCase());
    const event = new CustomEvent('mediaSorted', { detail: this._media });
    document.dispatchEvent(event);
  }
}
