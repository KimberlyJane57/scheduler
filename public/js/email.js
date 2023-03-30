const sendApptEmail = async (event) => {
    event.preventDefault();
    console.log('Click is working');
    const confirmed = 'Appointment confirmed'

    const response = await fetch('/api/email/send', {
        method: 'POST',
        body: JSON.stringify({ confirmed }),
        headers: { 'Content-Type': 'application/json' }
    });
    
    response.ok ? alert("Confirmation email was sent.") : alert("Confirmation email could not be sent.")
};

$('#confirm-btn').click(sendApptEmail);