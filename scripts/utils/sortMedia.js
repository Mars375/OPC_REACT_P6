export const sortMedia = (media, option) => {
  let sortedMedia = [];

  switch (option) {
    case "popularité":
      sortedMedia = media.sort((a, b) => b.likes - a.likes);
      break;
    case "date":
      sortedMedia = media.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "titre":
      sortedMedia = media.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      sortedMedia = media;
  }
  return sortedMedia;
};