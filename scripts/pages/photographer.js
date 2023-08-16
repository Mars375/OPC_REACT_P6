import { Query } from '../helpers/query.js'
import { Loader } from '../components/Loader.js'
import { Dropdown } from '../components/Dropdown.js'

import { GetPhotographer } from '../models/getPhotographer.js'
import { GetMedia } from '../models/GetMedia.js'
import { CardFactory } from '../factories/cardFactory.js'
import { PhotographHeader } from '../templates/PhotographHeader.js'

class App {
  _photographer
  _medias = []

  constructor() {
    const link = '/P6/data/photographers.json';
    this.query = new Query(link);
    this.mediaWrapper = document.querySelector('.media-wrapper');
    this.spinnerLoader = new Loader();
  }

  getParamsFromURL() {
    const url = window.location.href;
    const params = new URL(url).searchParams;
    const id = params.get('id');
    return parseInt(id);
  }

  async getData() {
    const { media: allMedias, photographers } = await this.query.fetch();

    const id = this.getParamsFromURL();

    const photographerFound = photographers.find(photographer => photographer.id === id);

    this._photographer = new GetPhotographer(photographerFound);

    allMedias
      .filter(media => media.photographerId === this._photographer.id)
      .map(media => {
        const mediaFactory = new GetMedia(media);
        mediaFactory.photographer = this._photographer;
        this._medias.push(mediaFactory);
      })
  }

  setDocumentTitle() {
    return document.title = `FishEye - ${this._photographer.name}`;
  }

  async renderPage() {
    this.setDocumentTitle();

    const containerHeader = document.querySelector('.photograph-header');
    const photographHeader = new PhotographHeader(this._photographer, containerHeader);
    photographHeader.createPhotographHeader();
    // TODO : Render badges

    document.addEventListener('mediaSorted', (event) => {
      const sortedMedias = event.detail;
      this.renderMedias(sortedMedias);
    });
    const dropdown = new Dropdown(this._medias, '.sort-wrapper');
    dropdown.sortAndRenderMedia('popularité');
    this.spinnerLoader.hide();
  }

  async renderMedias(data) {
    this.mediaWrapper.innerHTML = '';

    return data.map(media => {
      const cardTemplate = new CardFactory(media, 'media');
      const card = cardTemplate.createMediaCard();
      this.mediaWrapper.appendChild(card);
    })
  }

  // TODO: Setup likes counter

  async init() {
    this.spinnerLoader.show()
    await this.getData();
    await this.renderPage();
  }
}

const app = new App();
app.init();