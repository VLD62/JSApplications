import {monkeys} from './monkeys.js'

window.addEventListener('load', async function() {
    const mainEl = document.querySelector('section');

    const monkeysTemplate = await (await fetch('./monkeyDiv.hbs')).text();
    Handlebars.registerPartial('monk', await (await fetch('./monk.hbs')).text());
    const monkeyFn = Handlebars.compile(monkeysTemplate);

    const htmlEl = monkeyFn({monkeys});
    mainEl.innerHTML = htmlEl;

    const monkeysEl = document.querySelector('.monkeys');
    monkeysEl.addEventListener('click', function(e) {
        if (e.target.tagName !== 'BUTTON') {
            return;
        }
        const showBTN = e.target;
        const infoEl = e.target.parentElement.querySelector('p');
        if (infoEl.style.display === 'none') {
            infoEl.style.display = '';
            showBTN.textContent = 'Hide';
        } else {
            infoEl.style.display = 'none';
            showBTN.textContent = 'Info';
        }
    })
})