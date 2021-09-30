// Call the dataTables jQuery plugin
$(document).ready(function () {
    loadUsers();
    $('#users').DataTable();
    updateEmailUser();
});

function updateEmailUser() {
    document.querySelector("#txtEmailUser").outerHTML = localStorage.email;
}


async function loadUsers() {
    const request = await fetch('/api/users', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    });

    const users = await request.json();

    let listHTML = ``;

    users.forEach(user => {
        listHTML += `
                 <tr>
                    <td>${user.id}</td>
                    <td>${user.name} ${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>
                        <a href="#" onclick="deleteUser(${user.id})" class="btn btn-danger btn-circle btn-sm">
                            <i class="fas fa-trash"></i>
                        </a>
                    </td>
                </tr>`;
    })

    document.querySelector('#users tbody').outerHTML = listHTML;
}

async function deleteUser(id) {

    if (confirm('Do you want to delete this user?')) {
        const request = await fetch(`api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            },
        });

        // loadUsers();
        location.reload(); // I can also do it like this
    }
}
