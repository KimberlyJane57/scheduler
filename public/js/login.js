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
        response.ok ? document.location.replace('/my-appointments') : alert("Incorrect email or password, please try again.")
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
        response.ok ? document.location.replace('/my-profile') : alert(response.statusText)
    }
};

$('#login-btn').click(login);
$('#signup-btn').click(signup);
