// Call the dataTables jQuery plugin
$(document).ready(function () {
    // On ready
});

async function logIn() {

    let data = {};
    data.email = document.querySelector('#txtEmail').value;
    data.password = document.querySelector('#txtPassword').value;

    const request = await fetch('api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)
    });

    const response = await request.text();

    console.log(response)
    if (response != 'Fail') {
        localStorage.token = response;
        localStorage.email = data.email;
        window.location.href = 'users.html';
    } else {
        alert('Wrong credentials, try again please');
    }
}
