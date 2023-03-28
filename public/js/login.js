const login = async (event) => {
    event.preventDefault();
    const email = $('#login-email').val().trim();
    const password = $('#login-password').val().trim();

    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        response.ok ? document.location.replace('/appointments') : alert("Incorrect email or password, please try again.")
    }
    else {
        alert('Please enter all required fields.')
    }
};

const signup = async (event) => {
    event.preventDefault();
    const email = $('#signup-email').val().trim();
    const password = $('#signup-password').val().trim();
    const confirmPassword = $('#confirm-password').val().trim();

    if (email && password && password == confirmPassword) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        response.ok ? document.location.replace('/profile') : alert(`${email} already exists.`)
    }
    else {
        alert('Please enter all required fields.')
    }
};


const finishSigningUp = async (event) => {
    event.preventDefault();
    console.log('finishsignup');
    const first_name = $('#first-name').val().trim();
    const last_name = $('#last-name').val().trim();
    const birthdate = $('#birthdate').val().trim();
    const phone_number = $('#phone-number').val().trim();

    if (first_name && last_name && birthdate && phone_number) {
        const response = await fetch('/api/user/profile', {
            method: 'PUT',
            body: JSON.stringify({ first_name, last_name, birthdate, phone_number }),
            headers: { 'Content-Type': 'application/json' }
        });
        response.ok ? document.location.replace('/view-my-profile') : alert("Please try again.")
    }
    else {
        alert("Please enter all required fields.")
    }
}


$('#login-btn').click(login);
$('#signup-btn').click(signup);
$('#update-btn').click(finishSigningUp);
