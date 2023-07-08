
// function to handle filter change event
export const handleFilterChange = (e) => {
  const filter = e.target.value;
  console.log(filter);
  // TODO: implement filtering logic here...
  document.getElementById('filter').removeEventListener('change')
}