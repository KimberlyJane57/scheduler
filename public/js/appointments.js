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

  $('#confirm-btn').click(async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/appointments/create', {
        method: 'POST',
        body: JSON.stringify({
          date: $('#date').val().trim(),
          time: $('#time').val().trim(),
          staff_id: $('#staff').val().trim(),
          service_id: $('#service').val().trim(),
          location_id: $('#location').val().trim(),
          user_id: null 
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        document.location.reload();
      } else {
        console.log(response.statusText);
        alert('Could not create appointment.');
      }
    } catch (err) {
      console.error(err);
    }
  });
$('.delete-btn').click(deleteAppt);