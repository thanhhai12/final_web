document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = {
        'admin': {
            email: 'DaFool@fuckyou.com',
            password: 'GuessMotherFuckers',
            role: 'admin'
        },
        'normal': {
            email: 'Peasant@fuckyoutoo.com',
            password: 'Peasant1',
            role: 'normal'
        }
    };

    let currentUser = null;

    if (email === users['admin'].email && password === users['admin'].password) {
        alert('Admin login successful');
        currentUser = users['admin'];
    } else if (email === users['normal'].email && password === users['normal'].password) {
        alert('Normal user login successful');
        currentUser = users['normal'];
    } else {
        alert('Invalid email or password');
        return; 
    }

    localStorage.setItem('userRole', currentUser.role);
    if (currentUser.role === 'admin') {
        window.location.href = 'index.html';
    } else if (currentUser.role === 'normal') {
        window.location.href = 'index.html'; 
    }
});

function getCurrentUserRole() {
    return localStorage.getItem('userRole'); 
}

function checkAccess(page) {
    const userRole = getCurrentUserRole(); 

    if (userRole === 'admin') {

        return true;
    } else if (userRole === 'normal' && page === 'index.html') {
        return true;
    } else {
        alert('Access Denied');
        window.location.href = 'index.html'; 
        return false;
    }
}
