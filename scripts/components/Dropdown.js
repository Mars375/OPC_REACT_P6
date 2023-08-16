import { createElement } from '../utils/createElement.js';
import { sortMedia } from '../utils/sortMedia.js';

export class Dropdown {
  constructor(media, containerSelector) {
    this.options = ['Popularité', 'Date', 'Titre'];
    this.containerSelector = document.querySelector(containerSelector);
    this.selectedOption = null;
    this._media = media;

    this.createDropdown();
    this.sortAndRenderMedia(this.options[0]);
  }

  createDropdown() {
    const dropdownLabel = createElement('label', {
      class: 'dropdown__label',
      innerText: 'Trier par',
    });

    const dropdownButton = createElement('button', {
      class: 'dropdown__button',
      innerText: 'Popularité',
      tabIndex: '0',
      'aria-expanded': 'false',
      'aria-label': 'Sélectionnez un critère de tri',
    });

    const dropdownList = createElement('ul', {
      class: 'dropdown__list',
      style: 'display: none;',
      'aria-hidden': 'true',
    });

    this.options.forEach((option) => {
      const dropdownItem = createElement('li', {
        class: 'dropdown__item',
        innerText: option,
        tabIndex: '0',
      });

      dropdownItem.addEventListener('click', () => {
        dropdownButton.innerText = option;
        this.sortAndRenderMedia(option);
        dropdownButton.setAttribute('aria-expanded', 'false');
        dropdownList.style.display = 'none';
        dropdownList.setAttribute('aria-hidden', 'true');
      });

      dropdownList.append(dropdownItem);
    });

    dropdownButton.addEventListener('click', () => {
      const isExpanded = dropdownButton.getAttribute('aria-expanded') === 'true';
      dropdownButton.setAttribute('aria-expanded', !isExpanded);
      dropdownList.style.display = isExpanded ? 'none' : 'block';
      dropdownList.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');

      if (!isExpanded) {
        dropdownList.querySelectorAll('.dropdown__item').forEach(item => {
          item.tabIndex = '0';
        });
      } else {
        dropdownList.querySelectorAll('.dropdown__item').forEach(item => {
          item.tabIndex = '-1';
        });
      }
    });

    const dropdown = createElement('div', {
      class: 'dropdown',
    });
    dropdown.append(dropdownButton, dropdownList);
    this.containerSelector.append(dropdownLabel, dropdown);
  }

  sortAndRenderMedia(option) {
    this.selectedOption = option.toLowerCase();
    this._media = sortMedia(this._media, this.selectedOption);
    const event = new CustomEvent('mediaSorted', { detail: this._media });
    document.dispatchEvent(event);
  }
}
