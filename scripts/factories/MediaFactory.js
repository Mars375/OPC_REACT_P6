import { ImageMedia } from '../media/ImageMedia.js';
import { VideoMedia } from '../media/VideoMedia.js';
export class MediaFactory {
  static createMedia(data, photographer) {
    const { mediaType } = data;
    switch (mediaType) {
      case 'image':
        return new ImageMedia(data, photographer);
      case 'video':
        return new VideoMedia(data, photographer);
      default:
        throw new Error('Unsupported media type');
    }
  }
}