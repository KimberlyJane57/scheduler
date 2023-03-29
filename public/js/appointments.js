const createAppt = async (event) => {
  event.preventDefault();

  const date = document.querySelector('#date').value.trim();
  const time = document.querySelector('#time').value.trim();
  const staff = document.querySelector('#staff').value.trim();
  const service = document.querySelector('#service').value.trim();
  const location = document.querySelector('#location').value.trim();

  if (date && time && staff && service && location) {
    const response = await fetch('/api/appointments/create', {
      method: 'POST',
      body: JSON.stringify({ date, time, staff, service, location}),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.reload();
      } else {
        console.log(response.statusText)
        alert('Could not create appointment.');
      }
  }
};
const deleteAppt = async (event) => {
  event.preventDefault();
  const response = await fetch('/api/appointments/remove/<%=data[i].id%', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
})};
$('#confirm-btn').click(createAppt);
$('#delete-btn').click(deleteAppt);
