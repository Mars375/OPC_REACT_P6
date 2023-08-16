import { createElement } from "../utils/createElement.js"

export class MediaFactory {
  $media
  constructor(data) {
    const { mediaType, title, mediaLink, photographer } = data

    try {
      switch (mediaType) {
        case 'image':
          this.$media = createElement('img')
          break
        case 'video':
          this.$media = createElement('video')
          this.$media.controls = false
          this.$media.autoplay = false
          this.$media.disablePictureInPicture = false
          break
        default:
          throw new Error('Media type is not supported')
      }
    } catch (error) {
      console.error(error)
    }

    this.$media.src = mediaLink
    this.$media.alt = `${title} by ${photographer.name}`
    this.$media.ariaLabel = `${title} by ${photographer.name}`
  }

  createComponent() {
    return this.$media
  }
}