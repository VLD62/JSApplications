window.addEventListener('load', async function() {
    const catContainer = document.querySelector('#allCats');
    const catsTemplate = await (await fetch('./catlist.hbs')).text();
    const catListFn = Handlebars.compile(catsTemplate);
    Handlebars.registerPartial('cat', await (await fetch('./cat.hbs')).text())

    const htmlEl = catListFn({cats});
    catContainer.innerHTML = htmlEl;
    catContainer.addEventListener('click', function(e) {
        if (e.target.tagName !== 'BUTTON') {
            return;
        }
        const moreInfoEl = e.target.parentElement.querySelector('.status');
        const showBTN = e.target;
        if (moreInfoEl.style.display === 'none') {
            moreInfoEl.style.display = '';
            showBTN.textContent = 'Hide status code';
        } else {
            moreInfoEl.style.display = 'none';
            showBTN.textContent = 'Show status code';
        }
    })
})
