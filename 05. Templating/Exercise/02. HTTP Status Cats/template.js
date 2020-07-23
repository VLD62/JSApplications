/* Globals Handlebars */
window.addEventListener('load', async () => {
    const mainEl = document.querySelector('#allCats');
    //Initialize templates
    const listString = await (await fetch('./list.hbs')).text();
    const catTemplate = Handlebars.compile(listString);
    Handlebars.registerPartial('cat', await (await fetch('./cat.hbs')).text());

    //Render html
    const html = catTemplate({ cats });
    mainEl.innerHTML = html;

    //setup interaction
    mainEl.addEventListener('click', onClick);
    
    function onClick(e) {
        if (e.target.tagName !== 'BUTTON'){
            return;
        }
        const div = e.target.parentNode.querySelector('.status');
        if (div.style.display == 'none'){
            e.target.textContent = 'Hide status code';
            div.removeAttribute('style');
        } else {
            e.target.textContent = 'Show status code';
            div.style.display = 'none';
        }
    }
});