const createAppt = async (event) => {
  event.preventDefault();

  const date = document.querySelector('#date').value.trim();
  const time = document.querySelector('#time').value.trim();
  const staff_id = document.querySelector('#staff').value.trim();
  const service_id = document.querySelector('#service').value.trim();
  const location_id = document.querySelector('#location').value.trim();

  if (date && time && staff_id && service_id && location_id) {
    const response = await fetch('/api/appointments/create', {
      method: 'POST',
      body: JSON.stringify({ date, time, staff_id, service_id, location_id}),
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
  const response = await fetch(`/api/appointments/remove/${$(event.target).attr("data-id")}`, {
  method: 'DELETE'
});
    if (response.ok) {
        document.location.reload();
      } else {
        console.log(response.statusText)
        alert('Could not delete appointment.');
      }
  }

$('#confirm-btn').click(createAppt);
$('.delete-btn').click(deleteAppt);
