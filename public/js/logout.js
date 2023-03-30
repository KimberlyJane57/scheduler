const logout = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    response.ok ? document.location.replace('/') : alert(response.statusText)
  };
  
 $('#logout').click(logout);
