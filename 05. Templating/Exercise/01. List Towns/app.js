/* globals Handlebars */
window.addEventListener('load', () => {
    document.querySelector('#btnLoadTowns').addEventListener('click', renderTowns);
    const rootEl = document.querySelector('#root');
    const input = document.querySelector('#towns');

    function renderTowns(e) {
        e.preventDefault();
        const towns = input.value.split(', ');

        //Load template -> text:
        const templateString = document.getElementById('main-template').innerHTML;

        //Compile template -> function
        const templateFN = Handlebars.compile(templateString);

        //Apply data to the template -> text (HTML)
        const generatedHtml = templateFN({ towns});

        //Insert generated HTML into DOM
        rootEl.innerHTML = generatedHtml;

    }



})