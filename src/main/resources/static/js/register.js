// Call the dataTables jQuery plugin
$(document).ready(function () {
    // On ready
});

async function registerUsers() {

    let data = {};

    data.name = document.querySelector('#txtName').value;
    data.lastName = document.querySelector('#txtLastName').value;
    data.email = document.querySelector('#txtEmail').value;
    data.phone = document.querySelector('#txtPhone').value;
    data.password = document.querySelector('#txtPassword').value;

    let repeatPassword = document.querySelector('#txtRepeatPassword').value;

    if (repeatPassword !== data.password) {
        alert('Different Passwords!')
        return;
    }

    const request = await fetch('api/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    alert('Account created successfully!')
    window.location.href = 'login.html';
}
