import { createElement } from "../utils/createElement.js";
import { MediaFactory } from "../factories/MediaFactory.js";

export class MediaCard {
  constructor(media) {
    this._media = media;
  }

  createInformationSection() {
    const { likes, title } = this._media;

    const $likes = createElement(
      "p",
      {
        class: "media-card__likes",
        'aria-label': `Nombre de likes : ${likes}`,
        tabIndex: "0",
        dataset: {
          likes: likes
        },
        innerText: likes
      });

    const $likesIcon = createElement(
      "i",
      {
        class: "fas fa-heart media-card__likes-icon",
        'aria-label': "likes",
        tabIndex: "-1",
        ariaHidden: "true"
      });

    const $likeBtn = createElement(
      "button",
      {
        class: "media-card__like-btn",
        'aria-label': "CLiquer pour aimer la photo",
        tabIndex: "0",
      });
    $likeBtn.append($likesIcon);

    const $likeWrapper = createElement(
      "div",
      {
        class: "media-card__like-wrapper",
        dataset: {
          isLiked: false,
          mediaId: this._media.id
        }
      });
    $likeWrapper.append($likeBtn, $likes);

    const $title = createElement(
      "h3",
      {
        class: "media-card__title",
        'aria-label': `Titre de la photo : ${title}`,
        innerText: title
      });

    const $informationSection = createElement(
      "div",
      {
        class: "media-card__information",
        'aria-label': "Plus d'informations",
        tabIndex: "0"
      });
    $informationSection.append($likeWrapper, $title);

    return $informationSection;
  }

  createMediaSection() {

    const $media = new MediaFactory(this._media).createComponent();

    const $mediaSection = createElement(
      "div",
      {
        class: "media-card__media",
        'aria-label': "Photo ou vidéo",
        tabIndex: "0"
      });
    $mediaSection.append($media);

    return $mediaSection;
  }

  createMediaCard() {
    const $mediaCard = createElement(
      "div",
      {
        class: "media-card",
        'aria-label': "Photo ou vidéo",
        tabIndex: "0"
      });
    $mediaCard.append(this.createMediaSection(), this.createInformationSection());

    return $mediaCard;
  }
}