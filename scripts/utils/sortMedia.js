export const sortMedia = (media, option) => {
  switch (option) {
    case "popularité":
      return [...media].sort((a, b) => b.likes - a.likes);
    case "date":
      return [...media].sort((a, b) => new Date(a.date) - new Date(b.date));
    case "titre":
      return [...media].sort((a, b) => a.title.localeCompare(b.title));
    default:
      return media;
  }
};