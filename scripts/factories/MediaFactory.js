import { createElement } from "../utils/createElement.js";

export class MediaFactory {
  $media;

  constructor(data, photographer) {
    const { mediaType, title, mediaLink } = data;

    // Create media element based on mediaType
    this.$media = createElement(mediaType === 'image' ? 'img' : 'video');

    if (mediaType === 'video') {
      this.configureVideoElement(); // Configure video properties
    }

    // Set common attributes for both image and video
    Object.assign(this.$media, {
      src: mediaLink,
      alt: `${title} by ${photographer.name}`,
      ariaLabel: `${title} by ${photographer.name}`,
      tabindex: '0',
    });
  }

  // Configure video element properties
  configureVideoElement() {
    Object.assign(this.$media, {
      controls: false,
      autoplay: false,
      disablePictureInPicture: false,
    });
  }

  // Return the created media element
  createComponent() {
    return this.$media;
  }
}
