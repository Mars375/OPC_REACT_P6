import { getPhotographer } from "../../helpers/query.js";

const init = async () => {
  const photographer = await getPhotographer();
  console.log(photographer)
}

init();