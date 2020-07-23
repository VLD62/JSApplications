function attachEvents() {
    const baseUrl = 'https://jstest-48d7f.firebaseio.com/Students/';
    const body = document.querySelector('body');
    const tableBody = document.querySelector('tbody');

    const loadBtn = document.createElement('button');
    loadBtn.addEventListener('click', loadStudents);
    loadBtn.textContent = 'Load Students'
    const newDiv = document.createElement('div');
    newDiv.appendChild(loadBtn);
    const dividerDiv = document.createElement('div');
    dividerDiv.setAttribute('class', 'divider');
    newDiv.appendChild(dividerDiv);
    const addBtn = document.createElement('button');
    addBtn.addEventListener('click', addStudent);
    addBtn.textContent = 'Add Student'
    newDiv.appendChild(addBtn);
    body.appendChild(newDiv);

    function createNewTr(id, data) {
        const newTr = document.createElement('tr');
        newTr.setAttribute('student-id', id);
        newTr.innerHTML = `<td>${data['ID']}</td>
                           <td>${data['First Name']}</td>
                           <td>${data['Last Name']}</td>
                           <td>${data['Faculty Number']}</td>
                           <td>${data['Grade']}</td>`;
        const newTd = document.createElement('td');
        newTr.appendChild(newTd);
        tableBody.appendChild(newTr);
    }
    async function addStudent() {
        const formTable = document.createElement('table');
        formTable.setAttribute('id', 'input');
        formTable.setAttribute('class', 'inputTable');
        const thead = document.createElement('thead');
        thead.innerHTML = `<tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Faculty Number</th>
                                <th>Grade</th>
                            </tr>`
        formTable.appendChild(thead);
        const tbody = document.createElement('tbody');
        formTable.appendChild(tbody);
        const newTr = document.createElement('tr');

        const idTd = document.createElement('td');
        const idInput = document.createElement('input');
        idInput.setAttribute('placeholder', 'Enter number..');
        idInput.setAttribute('id', 'studentId');
        idTd.appendChild(idInput);
        newTr.appendChild(idTd);

        const firstNameTd = document.createElement('td');
        const firstNameInput = document.createElement('input');
        firstNameInput.setAttribute('placeholder', 'Enter string..');
        firstNameInput.setAttribute('id', 'studentFirstName');
        firstNameTd.appendChild(firstNameInput);
        newTr.appendChild(firstNameTd);

        const lastNameTd = document.createElement('td');
        const lastNameInput = document.createElement('input');
        lastNameInput.setAttribute('placeholder', 'Enter string..');
        lastNameInput.setAttribute('id', 'studentLastName');
        lastNameTd.appendChild(lastNameInput);
        newTr.appendChild(lastNameTd);

        const fnId = document.createElement('td');
        const fnInput = document.createElement('input');
        fnInput.setAttribute('placeholder', 'Enter number..');
        fnInput.setAttribute('id', 'studentFn');
        fnId.appendChild(fnInput);
        newTr.appendChild(fnId);

        const gradeId = document.createElement('td');
        const gradeInput = document.createElement('input');
        gradeInput.setAttribute('placeholder', 'Enter number..');
        gradeInput.setAttribute('id', 'studentGrade');
        gradeId.appendChild(gradeInput);
        newTr.appendChild(gradeId);

        formTable.appendChild(newTr);

        const trBtn = document.createElement('tr');
        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        saveBtn.addEventListener('click', async e => {
            let id = document.querySelector('#studentId').value;
            let firstName = document.querySelector('#studentFirstName').value;
            let lastName = document.querySelector('#studentLastName').value;
            let fn = document.querySelector('#studentFn').value;
            let grade = document.querySelector('#studentGrade').value;
            if (id == '' || isNaN(id)) {
                alert('ID field should be non-empty valid number!');
                return false;
            }
            if (grade == '' || isNaN(grade)) {
                alert('Grade field should be non-empty valid number!');
                return false;
            }
            if (firstName == '' || lastName == '' || fn == '') {
                alert('First, Last names and Faculty number fields should not be empty!');
                return false;
            }

            let studentData = {
                'ID': Number(id),
                'First Name': firstName,
                'Last Name': lastName,
                'Faculty Number': fn,
                'Grade': Number(grade)
            }

            await fetch(baseUrl + '.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    createNewTr(data, studentData);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            formTable.remove();
        })
        trBtn.appendChild(saveBtn);
        formTable.appendChild(trBtn);

        body.appendChild(formTable);
    }

    async function loadStudents() {
        tableBody.innerHTML = '';
        let studentData = ''
        try {
            studentData = await (await fetch(baseUrl + '.json')).json()
        }
        catch (err) {
            body.innerHTML = (err);
            return err;
        }
        //Sorting by conversion to MAP
        let sorted = Object.entries(studentData).map(x => Object.assign(x[1], {
            student: x[0]
        })).sort((a, b) => a.ID - b.ID);
        function interMapElements(value, key, map) {
            createNewTr(key, value)
        }
        let sortedStudents = new Map(sorted.map(x => ([x.student, (delete x.student, x)])));
        sortedStudents.forEach(interMapElements);
    }

}
attachEvents();
