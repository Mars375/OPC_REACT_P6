export const displayModal = () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";
  document.querySelector('.contact_button').removeEventListener('click', displayModal);
  document.getElementById('close_modal').addEventListener('click', closeModal);
}

export const closeModal = () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  document.getElementById('close_modal').removeEventListener('click', closeModal);
  document.querySelector('.contact_button').addEventListener('click', displayModal);

}
