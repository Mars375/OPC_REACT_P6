// Class representing media data for photographers
export class Media {
  constructor(data) {
    this._data = data; // Store the media data internally
  }


  // Get the unique identifier for the media
  get id() {
    return this._data.id;
  }

  // Get the photographer's identifier associated with the media
  get photographerId() {
    return this._data.photographerId;
  }

  // Get the title of the media
  get title() {
    return this._data.title;
  }

  // Get the relative path to the media file
  get mediaLink() {
    const { photographerId, image, video } = this._data;
    return `assets/media/${photographerId}/${image || video}`;
  }

  // Get the type of media (either 'image' or 'video')
  get mediaType() {
    return this._data.image ? 'image' : 'video';
  }

  // Get the number of likes for the media
  get likes() {
    return this._data.likes;
  }

  // Get the date associated with the media
  get date() {
    return this._data.date;
  }

  // Get the price of the media
  get price() {
    return this._data.price;
  }
}
