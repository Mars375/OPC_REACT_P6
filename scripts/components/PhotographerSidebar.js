import { createElement } from "../utils/createElement.js";

export class PhotographerSidebar {
  constructor(photographer, container) {
    // Store the photographer data and container reference
    this._photographer = photographer;
    this.$container = document.querySelector(container);
  }

  createPhotographerSidebar() {
    // Create the sidebar container element
    const $sidebarContainer = createElement('div', {
      class: 'photographer-sidebar photographer-sidebar--bottom'
    });

    // Create an element to display the total likes
    const $likesElement = createElement('p', {
      class: 'photographer-sidebar__likes',
      innerText: `${this._photographer.totalLikes}`,
    });

    // Create a heart icon
    const $heartIcon = createElement('i', {
      class: 'fas fa-heart',
      'aria-label': 'likes',
    });

    // Create an element to display the price
    const $priceElement = createElement('p', {
      class: 'photographer-sidebar__price',
      innerText: `${this._photographer.price}`,
    });

    // Append the likes and price elements to the sidebar container
    $likesElement.append($heartIcon);
    $sidebarContainer.append($priceElement, $likesElement);

    // Append the sidebar container to the provided container
    this.$container.append($sidebarContainer);

    return $sidebarContainer;
  }
}
