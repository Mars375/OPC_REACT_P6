import { Loader } from '../components/Loader.js';
import { Dropdown } from '../components/Dropdown.js';
import { PhotographerSidebar } from '../components/PhotographerSidebar.js';
import { ModalForm } from '../components/ModalForm.js';
import { PhotographHeader } from '../templates/PhotographHeader.js';
import { PhotographerService } from '../services/PhotographerService.js';
import { MediaService } from '../services/MediaService.js';
import { MediaRenderer } from '../utils/MediaRenderer.js';
import { getURLParams } from '../utils/getURLParams.js';

class App {
  _photographer;
  _medias = [];

  constructor() {
    this.photographerService = new PhotographerService(); // Create an instance of PhotographerService
    this.mediaService = new MediaService(); // Create an instance of MediaService
    this.$mediaWrapper = document.querySelector('.media-wrapper');
    this.spinnerLoader = new Loader();
    this.mediaRenderer = new MediaRenderer(this.$mediaWrapper);
    this.params = getURLParams(); // Get URL parameters
  }

  // Fetch data and process medias related to the photographer
  async getData() {
    try {
      // Fetch the photographer and their media data using services
      this._photographer = await this.photographerService.getPhotographer(this.params.id);
      this._medias = await this.mediaService.getMediasByPhotographerId(this._photographer.id, this._photographer);
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  }

  // Render the page with photographer's header, sidebar, modal, and dropdown
  async renderPage() {
    document.title = `FishEye - ${this._photographer.name}`;

    const photographHeader = new PhotographHeader(this._photographer, '.photograph-header');
    photographHeader.createPhotographHeader();

    const sidebar = new PhotographerSidebar(this._photographer, '.sidebar-wrapper');
    sidebar.createPhotographerSidebar();

    const modal = new ModalForm('.modal');
    modal.init();

    document.addEventListener('mediaSorted', (event) => {
      const sortedMedias = event.detail;
      this.mediaRenderer.renderMedias(sortedMedias, this._photographer);
    });

    const dropdown = new Dropdown(this._medias, '.sort-wrapper');
    dropdown.sortAndRenderMedia('popularity');
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
