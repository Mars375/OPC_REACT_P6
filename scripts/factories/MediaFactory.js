export class MediaFactory {
  constructor(data) {
    const { type, title, url, photographer } = data

    try {
      switch (type) {
        case 'image':
          this.media = document.createElement('img')
          break
        case 'video':
          this.media = document.createElement('video')
          this.media.controls = false
          this.media.autoplay = false
          this.media.disablePictureInPicture = false
          break
        default:
          throw new Error('Media type is not supported')
      }
    } catch (error) {
      console.error(error)
    }

    this.media.src = url
    this.media.alt = `${title} by ${photographer.name}`
    this.media.ariaLabel = `${title} by ${photographer.name}`
  }

  get media() {
    return this._media
  }
}