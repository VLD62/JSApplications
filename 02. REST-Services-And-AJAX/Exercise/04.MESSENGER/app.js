function attachEvents() {
    const baseUrl = 'http://localhost:3000/messenger';
    const elements = {
        textArea() { return document.querySelector('textarea#messages') },
        author() { return document.querySelector('input#author') },
        content() { return document.querySelector('input#content') },
        submitBtn() { return document.querySelector('input#submit') },
        refreshBtn() { return document.querySelector('input#refresh') }
    }

    elements.submitBtn().addEventListener('click', () => {
        const { value: author } = elements.author();
        const { value: content } = elements.content();
        fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify({ author, content })
        })
            .then((response) => response.json());
        elements.author().value = "";
        elements.content().value = "";
    });

    elements.refreshBtn().addEventListener('click', () => {
        elements.textArea().textContent = ""
        fetch(baseUrl, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((response) => Object.values(response).forEach(element => {
                elements.textArea().textContent += (`${element.author}: ${element.content}\n`);
            }));
    });
}

attachEvents();