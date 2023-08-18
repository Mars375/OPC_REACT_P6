import { createElement } from "../utils/createElement.js";

export class MediaFactory {
  $media;

  constructor(data) {
    const { mediaType, title, mediaLink, photographer } = data;

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
