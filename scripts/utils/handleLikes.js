
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