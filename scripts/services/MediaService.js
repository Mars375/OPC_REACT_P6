import { Query } from '../helpers/query.js';
import { Media } from '../models/Media.js';

export class MediaService {
  constructor() {
    this.query = new Query('/P6/data/photographers.json');
  }

  async getMediasByPhotographerId(photographerId, photographer) {
    try {
      const { media: allMedias } = await this.query.fetch();
      const medias = allMedias
        .filter((media) => media.photographerId === photographerId)
        .map((mediaData) => new Media(mediaData)); // Créez une nouvelle instance de Media pour chaque média

      // Calculate totalLikes for the photographer
      const totalLikes = medias.reduce((acc, media) => acc + media.likes, 0);
      photographer.totalLikes = parseInt(totalLikes);

      // Attach medias to the photographer
      photographer.medias = medias;

      return photographer; // Return the photographer with attached medias and totalLikes
    } catch (error) {
      throw new Error(`Error in getMediasByPhotographerId: ${error.message}`);
    }
  }
}
