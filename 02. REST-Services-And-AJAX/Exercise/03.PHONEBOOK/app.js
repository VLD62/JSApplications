function attachEvents() {
    const baseUrl = 'http://localhost:3000/contacts'
    const elements = {
        person() { return document.querySelector('input#person') },
        phone() { return document.querySelector('input#phone') },
        createContact() { return document.querySelector('button#btnCreate') },
        loadContact() { return document.querySelector('button#btnLoad') },
        phoneBook() { return document.querySelector('ul#phonebook') },
    }
    let contacts = [];
    elements.createContact().addEventListener('click', () => {
        const { value: person } = elements.person();
        const { value: phone } = elements.phone();

        fetch(baseUrl,{
            method: "POST",
            body: JSON.stringify({ person, phone })
        })
        .then((response) => response.json())
        .then((response) => contacts.push(response));
        elements.person().value = "";
        elements.phone().value = "";
    });

    elements.loadContact().addEventListener('click', () => {
        elements.phoneBook().innerHTML = "";
        contacts.forEach(contact => {
            const delBtn = document.createElement('button')
            const listItem = document.createElement('li');
            const key = Object.keys(contact)[0];
            let person = contact[key].person;
            let phone = contact[key].phone;
            listItem.textContent = `${person} - ${phone}`;
            delBtn.textContent = "Delete";
            listItem.appendChild(delBtn);
            elements.phoneBook().appendChild(listItem);
            delBtn.addEventListener('click', () => {
                listItem.remove();
                contacts.splice(contact, 1);
            });

        });
    });
}

attachEvents();