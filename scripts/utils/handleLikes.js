export function handleLikes(media, $likesElement, $likeBtn, $likesIcon) {
  const likesDelta = media.isLiked ? -1 : 1;
  media._data.likes += likesDelta;
  media.photographer.totalLikes += likesDelta;
  console.log(media.photographer.totalLikes);

  $likesElement.innerText = media._data.likes;
  media.isLiked = !media.isLiked;

  const likeAction = media.isLiked ? "Annuler J'aime" : "Cliquer pour aimer la photo";
  const likePressed = media.isLiked ? "true" : "false";

  $likeBtn.setAttribute("aria-label", likeAction);
  $likeBtn.setAttribute("aria-pressed", likePressed);
  $likesElement.setAttribute("aria-label", `Nombre de likes : ${media._data.likes}`);
  $likesIcon.classList.toggle("liked", media.isLiked);
}