// Fichier MediaCard.js

import { createElement } from "../utils/createElement.js";
import { sortMedia } from "../utils/sortMedia.js";
import { handleLikes } from "../utils/handleLikes.js";

export class MediaCard {
  constructor(media) {
    this.media = media;
    this.mediaContainer = document.querySelector(".media_container");
    this.likedMedia = new Set();
    this.mediaModel = [];
    this.filterSelect = document.getElementById('filter');
    this.applySortEventListener();
    this.displayMedia();
  }

  createMediaElement(mediaItem) {
    // Create all elements using createElement function
    const mediaElement = createElement("div", null, {
      class: "media_element",
      tabindex: "0",
      "aria-label": mediaItem.title,
    });
    const mediaElementPicture = createElement("div", null, {
      class: "media_element_picture",
    });
    const mediaElementPictureContent = createElement(
      mediaItem.image ? "img" : "video", null, {
      src: `./assets/media/${mediaItem.photographerId}/${mediaItem.image || mediaItem.video}`,
      alt: mediaItem.title,
      controls: "true"
    }
    );
    const mediaInfo = createElement("div", null, {
      class: "media_element_info",
    })
    const mediaElementTitle = createElement("p", mediaItem.title, {
      class: "media_element_title",
    });
    const mediaElementLike = createElement("div", null, {
      class: "media_element_like",
    });
    const mediaElementLikeCount = createElement("p", mediaItem.likes, {
      class: "media_element_like_count",
    });
    const mediaElementLikeIcon = createElement("span", '♥', {
      class: "media_element_like_icon",
    });

    // Add event listener to mediaElementLike
    mediaElementLike.addEventListener("click", () => {
      this.updateLikes(mediaItem, mediaElementLikeCount, mediaElementLikeIcon);
    });

    // Append all elements to their respective container
    mediaElementLike.append(mediaElementLikeCount, mediaElementLikeIcon);
    mediaElementPicture.append(mediaElementPictureContent);
    mediaInfo.append(mediaElementTitle, mediaElementLike);
    mediaElement.append(mediaElementPicture, mediaInfo);
    this.mediaContainer.append(mediaElement);

    return mediaElement;
  }

  createMedia() {
    this.mediaModel = this.media.map((mediaItem) => this.createMediaElement(mediaItem));
  }

  displayMedia() {
    this.mediaContainer.innerHTML = "";
    this.createMedia();
  }

  applySortEventListener() {
    this.filterSelect.addEventListener('change', (event) => {
      const selectedOption = event.target.value;
      const sortedMedia = sortMedia(this.media, selectedOption);
      this.displayMedia(sortedMedia);
    });
  }

  updateLikes(mediaItem, likeElement, icon) {
    handleLikes(mediaItem, likeElement, icon, this.likedMedia);
    this.updateTotalLikes();
  }

  updateTotalLikes() {
    const badgeLike = document.querySelector(".badge_likes");
    const totalLikes = this.media.reduce((sum, mediaItem) => sum + mediaItem.likes, 0);
    badgeLike.textContent = totalLikes;
    const badgeIcon = createElement("span", '♥');
    badgeLike.appendChild(badgeIcon);
  }

  getMediaDOM() {
    return this.mediaModel;
  }
}
