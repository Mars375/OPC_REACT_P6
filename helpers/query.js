// get JSON Data from file
const getData = async () => {
  try {
    const response = await fetch("./data/photographers.json");
    return await response.json()
  } catch (error) {
    console.error(error)
    // Display error message if there is no data and return empty array
    const photographerSection = document.querySelector(".photographer_section");
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Sorry, there is no data to display";
    photographerSection.appendChild(errorMessage);
    return { photographers: [] };
  }
}

// get photographerId from URL
export const getPhotographersId = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// get photographer data from JSON file
export const getPhotographer = async () => {
  console.log('test')
  const { photographers } = await getData();
  const photographerId = getPhotographersId();
  return photographers.find((photographer) => photographer.id == photographerId);
}

// get photographers data from JSON file
export const getPhotographers = async () => {
  const { photographers } = await getData();
  return { photographers };
}