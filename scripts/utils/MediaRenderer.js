import { CardFactory } from '../factories/cardFactory.js';
import { Lightbox } from '../components/Lightbox.js';

export class MediaRenderer {
  constructor($mediaWrapper) {
    this.$mediaWrapper = $mediaWrapper;
  }

  // Render media cards and lightbox for medias
  async renderMedias(data) {
    this.$mediaWrapper.innerHTML = '';
    const sortedMedias = data.medias; // Get the sorted medias from the data

    sortedMedias.forEach((media, index) => {
      const cardTemplate = new CardFactory(media, 'media', data);
      const card = cardTemplate.createMediaCard();
      this.$mediaWrapper.appendChild(card);

      const mediaSection = card.querySelector('.media-card__media');
      mediaSection.addEventListener('click', () => {
        const lightbox = new Lightbox(data, index, '.lightbox_modal');
        lightbox.init();
      });
    });
  }
}
