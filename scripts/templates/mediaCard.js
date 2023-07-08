import { createElement } from "../utils/createDOM.js";

export const mediaCardTemplate = (media) => {
  const mediaContainer = document.querySelector(".media_container");
  const mediaModel = media.map((mediaItem) => {
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
      mediaItem.image ? "img" : "video",
      null,
      {
        src: `./assets/media/${mediaItem.photographerId}/${mediaItem.image || mediaItem.video}`,
        alt: mediaItem.title,
      }
    );
    const mediaTitleAndLikesWrapper = createElement("div", null, {
      class: "media_element_info",
    });
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

    // Append all my Elements to their respective container
    mediaElementLike.append(mediaElementLikeCount, mediaElementLikeIcon);
    mediaTitleAndLikesWrapper.append(mediaElementTitle, mediaElementLike);
    mediaElementPicture.append(mediaElementPictureContent);
    mediaElement.append(mediaElementPicture, mediaTitleAndLikesWrapper);
    mediaContainer.append(mediaElement);

    return mediaElement;
  });

  return {
    getMediaDOM: () => mediaModel,
  };
};
