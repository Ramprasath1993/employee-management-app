document.getElementById('addEmployeeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

    axios.post('/api/employees', {
        firstName: firstName,
        lastName: lastName,
        email: email
    })
        .then(() => {
            alert('Employee added');
            loadEmployees();
            document.getElementById('addEmployeeForm').reset();
        })
        .catch(error => {
            console.error('Error adding employee:', error);
        });
});

function loadEmployees() {
    axios.get('/api/employees')
        .then(response => {
            const employees = response.data;
            const listDiv = document.getElementById('employee-list');
            listDiv.innerHTML = `
                <table border="1">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    ${employees.map(emp => `
                        <tr>
                            <td>${emp.firstName}</td>
                            <td>${emp.lastName}</td>
                            <td>${emp.email}</td>
                            <td>
                                <button onclick="updateEmployee(${emp.id})">Update</button>
                                <button onclick="deleteEmployee(${emp.id})">Delete</button>
                                <button onclick="viewEmployee(${emp.id})">View</button>
                            </td>
                        </tr>
                    `).join('')}
                </table>
            `;
        })
        .catch(error => {
            console.error('Error loading employees:', error);
        });
}

function deleteEmployee(id) {
    axios.delete(`/api/employees/${id}`)
        .then(() => {
            alert('Employee deleted');
            loadEmployees();
        })
        .catch(error => {
            console.error('Error deleting employee:', error);
        });
}

function updateEmployee(id) {
    const newFirstName = prompt('Enter new First Name:');
    const newLastName = prompt('Enter new Last Name:');
    const newEmail = prompt('Enter new Email:');

    axios.put(`/api/employees/${id}`, {
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail
    })
        .then(() => {
            alert('Employee updated');
            loadEmployees();
        })
        .catch(error => {
            console.error('Error updating employee:', error);
        });
}

function viewEmployee(id) {
    axios.get('/api/employees')
        .then(response => {
            const employee = response.data.find(emp => emp.id === id);
            alert(`Employee Details:\nFirst Name: ${employee.firstName}\nLast Name: ${employee.lastName}\nEmail: ${employee.email}`);
        })
        .catch(error => {
            console.error('Error viewing employee:', error);
        });
}
