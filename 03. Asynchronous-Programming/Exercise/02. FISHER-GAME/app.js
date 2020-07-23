function attachEvents() {
    const baseUrl = "https://fisher-game.firebaseio.com/catches";
    const loadBtn = document.querySelector('.load');
    const updateBtns = document.querySelectorAll('.update');
    const deleteBtns = document.querySelectorAll('.delete');
    const addBtn = document.querySelector('.add');
    const addForm = document.querySelector('#addForm');
    const catchesDiv = document.querySelector('#catches');

    loadBtn.addEventListener('click', listCatches);
    addBtn.addEventListener('click', createCatch);
    updateBtns.forEach(updateBtn => updateBtn.addEventListener('click', updateCatch));
    deleteBtns.forEach(updateBtn => updateBtn.addEventListener('click', deleteCatch));

    function createElements(dataId, objData) {
        const newDiv = document.createElement('div');
        newDiv.className = 'catch';
        newDiv.setAttribute('data-id', dataId);
        let newLabel = "";
        let newInput = ""
        Object.entries(objData).forEach(subelement => {
            //Create Lable and Input tags for each property
            newLabel = document.createElement('label');
            newLabel.textContent = subelement[0];
            newInput = document.createElement('input');
            if (['captureTime', 'weight'].includes(subelement[0])) {
                newInput.type = 'number';
            } else {
                newInput.type = 'text';
            }
            newInput.setAttribute('class', subelement[0]);
            newInput.setAttribute('value', subelement[1]);
            newDiv.appendChild(newLabel);
            newDiv.appendChild(newInput);
            const newHr = document.createElement('hr');
            newDiv.appendChild(newHr);
        });
        //Create Update and Delete Buttons
        const newUpdateBtn = document.createElement('button');
        newUpdateBtn.setAttribute('class', 'update');
        newUpdateBtn.textContent = 'Update';
        newUpdateBtn.addEventListener('click', updateCatch);
        newDiv.appendChild(newUpdateBtn);
        const newDeleteBtn = document.createElement('button');
        newDeleteBtn.setAttribute('class', 'delete');
        newDeleteBtn.textContent = 'Delete';
        newDeleteBtn.addEventListener('click', deleteCatch);
        //Append all to the catchesDiv
        newDiv.appendChild(newDeleteBtn);
        catchesDiv.appendChild(newDiv);
    }

    async function listCatches() {
        catchesDiv.innerHTML = '';
        let data = ''
        try {
            data = await (await fetch(baseUrl + '.json')).json()
        }
        catch (err) {
            catchesDiv.innerHTML = (err);
            return err;
        }
        Object.entries(data).forEach(element => {
            createElements(element[0], element[1])
        });
        return data;
    }

    async function createCatch() {
        const currentData = {
            "angler": addForm.querySelector('input.angler').value,
            "weight": addForm.querySelector('input.weight').value,
            "species": addForm.querySelector('input.species').value,
            "location": addForm.querySelector('input.location').value,
            "bait": addForm.querySelector('input.bait').value,
            "captureTime": addForm.querySelector('input.captureTime').value
        }
        await fetch(baseUrl + '.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                createElements(data, currentData);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    async function updateCatch() {
        const currentForm = this.parentNode;
        const dataId = currentForm.getAttribute('data-id');
        console.log(dataId);
        const data = {
            "angler": currentForm.querySelector('input.angler').value,
            "weight": currentForm.querySelector('input.weight').value,
            "species": currentForm.querySelector('input.species').value,
            "location": currentForm.querySelector('input.location').value,
            "bait": currentForm.querySelector('input.bait').value,
            "captureTime": currentForm.querySelector('input.captureTime').value
        }
        await fetch(`${baseUrl}/${dataId}.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    async function deleteCatch() {
        const currentForm = this.parentNode;
        const dataId = currentForm.getAttribute('data-id');
        await fetch(`${baseUrl}/${dataId}.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        currentForm.remove();
    }
}
attachEvents();
