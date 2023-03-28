const createAppt = async (event) => {
  event.preventDefault();

  const date = document.querySelector('#date').value.trim();
  const time = document.querySelector('#time').value.trim();

  if (date && time) {
    const response = await fetch('/api/appointments/create', {
      method: 'POST',
      body: JSON.stringify({ date, time }),
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
};
$('#confirm-btn').click(createAppt);
$('#delete-btn').click(deleteAppt);
