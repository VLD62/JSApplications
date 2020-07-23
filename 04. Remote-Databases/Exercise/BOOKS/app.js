function attachEvents() {
    const baseUrl = "https://jstest-48d7f.firebaseio.com/Books/";
    const booksTable = document.querySelector('tbody');
    const loadBtn = document.querySelector('#loadBooks');
    const submitBtn = document.querySelector('form button');
    const btns = document.querySelectorAll('button');

    for (let i = 0; i < btns.length; i++) {
        if (btns[i].textContent == 'Edit') {
            btns[i].addEventListener('click', editBook);
        } else if (btns[i].textContent == 'Delete'){
            btns[i].addEventListener('click', deleteBook);
        }
    }
    loadBtn.addEventListener('click', loadBooks);
    submitBtn.addEventListener('click', addBook);

    function createNewTr(id, data) {
        const newTr = document.createElement('tr');
        newTr.setAttribute('book-id', id);
        newTr.innerHTML = `<td>${data.title}</td><td>${data.author}</td><td>${data.Isbn}</td>`;
        const newTd = document.createElement('td');
        const newEditBtn = document.createElement('button');
        newEditBtn.textContent = 'Edit';
        newEditBtn.addEventListener('click', editBook);
        const newDeleteBtn = document.createElement('button');
        newDeleteBtn.textContent = 'Delete';
        newDeleteBtn.addEventListener('click', deleteBook);
        newTd.appendChild(newEditBtn);
        newTd.appendChild(newDeleteBtn);
        newTr.appendChild(newTd);
        booksTable.appendChild(newTr);
    }
    async function addBook() {
        event.preventDefault();
        const title = document.querySelector('#title');
        const author = document.querySelector('#author');
        const isbn = document.querySelector('#isbn');
        let bookData = {
            'title': title.value,
            'author': author.value,
            'Isbn': isbn.value
        }
        await fetch(baseUrl + '.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                createNewTr(data, bookData);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        title.value = '';
        author.value = '';
        isbn.value = '';
    }

    async function loadBooks() {
        booksTable.innerHTML = '';
        let bookData = ''
        try {
            bookData = await (await fetch(baseUrl + '.json')).json()
        }
        catch (err) {
            catchesDiv.innerHTML = (err);
            return err;
        }
        Object.entries(bookData).forEach(element => {
            createNewTr(element[0],element[1]);
        });
    }

    async function deleteBook() {
        const currentForm = this.parentNode.parentNode;
        const bookId = currentForm.getAttribute('book-id');
        await fetch(`${baseUrl}/${bookId}/.json`, {
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

    function editBook() {
        const currentForm = this.parentNode.parentNode;
        const bookId = currentForm.getAttribute('book-id');
        const tds = currentForm.querySelectorAll('td');
        const titleTd = document.createElement('td');
        const newTitleInput = document.createElement('input');
        newTitleInput.setAttribute("placeholder", tds[0].textContent);
        newTitleInput.setAttribute("id", "title");
        titleTd.appendChild(newTitleInput);
        const authorTd = document.createElement('td');
        const newAuthorInput = document.createElement('input');
        newAuthorInput.setAttribute("placeholder", tds[1].textContent);
        newAuthorInput.setAttribute("id", "author");
        authorTd.appendChild(newAuthorInput);
        const isbnTd = document.createElement('td');
        const newIsbnInput = document.createElement('input');
        newIsbnInput.setAttribute("placeholder", tds[2].textContent);
        newIsbnInput.setAttribute("id", "isbn");
        isbnTd.appendChild(newIsbnInput);
        const delBtnTd = document.createElement('td');
        const newDeleteBtn = document.createElement('button');
        newDeleteBtn.textContent = 'Delete';
        newDeleteBtn.addEventListener('click', deleteBook);
        delBtnTd.appendChild(newDeleteBtn);
        const newSaveBtn = document.createElement('button');
        const saveBtnTd = document.createElement('td');
        newSaveBtn.textContent = 'Save';
        newSaveBtn.addEventListener('click', async e => {
            let title = currentForm.querySelector('#title');
            let author = currentForm.querySelector('#author');
            let isbn = currentForm.querySelector('#isbn');
            title = (title.value.length > 0) ? title.value : title.placeholder;
            author = (author.value.length > 0) ? author.value : author.placeholder;
            isbn = (isbn.value.length > 0) ? isbn.value : isbn.placeholder;
            currentForm.innerHTML = '';
            currentForm.innerHTML = `<td>${title}</td><td>${author}</td><td>${isbn}</td>`;
            const newTd = document.createElement('td');
            const newEditBtn = document.createElement('button');
            newEditBtn.textContent = 'Edit';
            newEditBtn.addEventListener('click', editBook);
            const newDeleteBtn = document.createElement('button');
            newDeleteBtn.textContent = 'Delete';
            newDeleteBtn.addEventListener('click', deleteBook);
            newTd.appendChild(newEditBtn);
            newTd.appendChild(newDeleteBtn);
            currentForm.appendChild(newTd);
            const newBookInfo = currentForm.querySelectorAll('td');
            let newData = {
                'title': newBookInfo[0].textContent,
                'author': newBookInfo[1].textContent,
                'isbn': newBookInfo[2].textContent
            }
            await fetch(`${baseUrl}/${bookId}/.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
            });
        });
        saveBtnTd.appendChild(newSaveBtn);
        currentForm.innerHTML = '';
        currentForm.appendChild(titleTd);
        currentForm.appendChild(authorTd);
        currentForm.appendChild(isbnTd);
        currentForm.appendChild(saveBtnTd);
        currentForm.appendChild(delBtnTd);
    }
}
attachEvents();
