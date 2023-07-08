export const createElement = (tag, content, attributes) => {
  // Create the element with the specified tag
  const element = document.createElement(tag);

  // Set the content if provided
  if (content !== null && content !== undefined) {
    element.textContent = content;
  }

  // Set attributes if provided
  if (attributes) {
    // Iterate over the attributes object and set each attribute on the element
    for (const attribute in attributes) {
      element.setAttribute(attribute, attributes[attribute]);
    }
  }
  // Return the created element
  return element;
};
