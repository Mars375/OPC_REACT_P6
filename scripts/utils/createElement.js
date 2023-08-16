export const createElement = (tag, options) => {

  const element = document.createElement(tag);

  if (options) {
    for (const key in options) {
      if (key === 'innerText') {
        element.innerText = options[key];
      }
      else if (key === 'dataset') {
        for (const dataKey in options[key]) {
          element.dataset[dataKey] = options[key][dataKey];
        }
      } else {
        element.setAttribute(key, options[key]);
      }
    }
  }

  return element;
};
