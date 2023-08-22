import { createElement } from "../utils/createElement.js";
import { MediaFactory } from "../factories/MediaFactory.js";
import { handleLikes } from "../utils/handleLikes.js";

export class MediaCard {
  constructor(media, photographer) {
    this._photographer = photographer;
    this._media = media;
    this._media.isLiked = false;
  }

  // Create the section displaying media information, likes, and title
  createInformationSection() {
    const { likes, title } = this._media;

    const $likes = createElement("p", {
      class: "media-card__likes",
      'aria-label': `Number of likes: ${likes}`,
      tabIndex: "0",
      dataset: {
        likes: likes
      },
      innerText: likes
    });

    const $likesIcon = createElement("i", {
      class: "fas fa-heart media-card__likes-icon",
      'aria-label': "likes",
      tabIndex: "-1",
      ariaHidden: "true"
    });

    const $likeBtn = createElement("button", {
      class: "media-card__like-btn",
      'aria-label': "Click to like the photo",
      tabIndex: "0",
    });
    $likeBtn.append($likesIcon);

    $likeBtn.addEventListener("click", () => {
      handleLikes(this._media, $likes, $likeBtn, $likesIcon);
      const totalLikes = document.querySelector('.photographer-sidebar__likes');
      totalLikes.textContent = `${this._media.photographer.totalLikes} likes`;
    });

    const $likeWrapper = createElement("div", {
      class: "media-card__like-wrapper",
      dataset: {
        isLiked: false,
        mediaId: this._media.id
      }
    });
    $likeWrapper.append($likeBtn, $likes);

    const $title = createElement("h3", {
      class: "media-card__title",
      'aria-label': `Photo Title: ${title}`,
      innerText: title
    });

    const $informationSection = createElement("div", {
      class: "media-card__information",
      'aria-label': "More Information",
      tabIndex: "0"
    });
    $informationSection.append($likeWrapper, $title);

    return $informationSection;
  }

  // Create the section displaying media (photo or video)
  createMediaSection() {
    const $media = new MediaFactory(this._media, this._photographer).createComponent();

    const $mediaSection = createElement("div", {
      class: "media-card__media",
      'aria-label': "Photo or Video",
      tabIndex: "0"
    });
    $mediaSection.append($media);

    return $mediaSection;
  }

  // Create the entire media card
  createMediaCard() {
    const $mediaCard = createElement("div", {
      class: "media-card",
      'aria-label': "Photo or Video",
      tabIndex: "0"
    });
    $mediaCard.append(this.createMediaSection(), this.createInformationSection());

    return $mediaCard;
  }
}
