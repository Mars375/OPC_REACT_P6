// mediaCardUtils.js
import { createElement } from "../utils/createElement.js";

export const handleLikes = (mediaItem, likeElement, icon, likedMedia) => {
  if (likedMedia.has(mediaItem.id)) {
    likedMedia.delete(mediaItem.id);
    mediaItem.likes--;
    icon.style.color = "#901c1c";
  } else {
    likedMedia.add(mediaItem.id);
    mediaItem.likes++;
    icon.style.color = "black";
  }
  likeElement.textContent = mediaItem.likes;
};

export const updateTotalLikes = (media) => {
  const badgeLike = document.querySelector(".badge_likes");
  const totalLikes = media.reduce((sum, mediaItem) => sum + mediaItem.likes, 0);
  badgeLike.textContent = totalLikes;
  const badgeIcon = createElement("span", '♥');
  badgeLike.appendChild(badgeIcon);
};
