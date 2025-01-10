function logout() { 
    localStorage.removeItem('currentUser');

    localStorage.removeItem('contactMessages');
        window.location.href = 'login.html';
}
