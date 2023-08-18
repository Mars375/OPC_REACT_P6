import { Query } from '../helpers/query.js';
import { Loader } from '../components/Loader.js';
import { Dropdown } from '../components/Dropdown.js';
import { PhotographerSidebar } from '../components/PhotographerSidebar.js';
import { ModalForm } from '../components/ModalForm.js';
import { Lightbox } from '../components/Lightbox.js';

import { Media } from '../models/Media.js';
import { CardFactory } from '../factories/cardFactory.js';
import { PhotographHeader } from '../templates/PhotographHeader.js';

class App {
  _photographer;
  _medias = [];

  constructor() {
    this.query = new Query('/P6/data/photographers.json');
    this.$mediaWrapper = document.querySelector('.media-wrapper');
    this.spinnerLoader = new Loader();
  }

  // Get photographer ID from URL parameters
  getParamsFromURL() {
    const url = window.location.href;
    const params = new URL(url).searchParams;
    const id = params.get('id');
    return parseInt(id);
  }

  // Fetch data and process medias related to the photographer
  async getData() {
    const { media: allMedias, photographers } = await this.query.fetch();
    const id = this.getParamsFromURL();
    this._photographer = photographers.find(photographer => photographer.id === id);

    allMedias
      .filter(media => media.photographerId === this._photographer.id)
      .forEach(mediaData => {
        const media = new Media(mediaData);
        media.photographer = this._photographer;
        this._medias.push(media);
      });

    const totalLikes = this._medias.reduce((acc, media) => acc + media.likes, 0);
    this._photographer.totalLikes = totalLikes;
  }

  // Set the document title to include photographer's name
  setDocumentTitle() {
    document.title = `FishEye - ${this._photographer.name}`;
  }

  // Render the page with photographer's header, sidebar, modal, and dropdown
  async renderPage() {
    this.setDocumentTitle();

    const photographHeader = new PhotographHeader(this._photographer, '.photograph-header');
    photographHeader.createPhotographHeader();

    const sidebar = new PhotographerSidebar(this._photographer, '.sidebar-wrapper');
    sidebar.createPhotographerSidebar();

    const modal = new ModalForm('.modal');
    modal.init();

    document.addEventListener('mediaSorted', (event) => {
      const sortedMedias = event.detail;
      this.renderMedias(sortedMedias);
    });

    const dropdown = new Dropdown(this._medias, '.sort-wrapper');
    dropdown.sortAndRenderMedia('popularity');

    setTimeout(() => {
      this.spinnerLoader.hide();
    }, 1000);
  }

  // Render media cards and lightbox for medias
  async renderMedias(data) {
    this.$mediaWrapper.innerHTML = '';

    data.forEach((media, index) => {
      const cardTemplate = new CardFactory(media, 'media');
      const card = cardTemplate.createMediaCard();
      this.$mediaWrapper.appendChild(card);

      const mediaSection = card.querySelector('.media-card__media');
      mediaSection.addEventListener('click', () => {
        const lightbox = new Lightbox(data, index, '.lightbox_modal');
        lightbox.init();
      });
    });
  }

  // Initialize the app by fetching data and rendering the page
  async init() {
    this.spinnerLoader.show();
    await this.getData();
    await this.renderPage();
  }
}

// Instantiate the App and initiate its functionality
const app = new App();
app.init();
