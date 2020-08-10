window.addEventListener('load', async function() {
    const containerEl = document.querySelector('#root');
    const inputEl = document.querySelector('#towns');
    const townString = await (await fetch('./towns.hbs')).text();
    const townTemplate = Handlebars.compile(townString);

    document.querySelector('#btnLoadTowns').addEventListener('click', function(e) {
        e.preventDefault();
        const towns = inputEl.value.split(', ');
        const html = townTemplate({towns});
        containerEl.innerHTML = html;
        inputEl.value = '';
    })
})