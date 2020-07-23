(function () {
    const appEl = document.getElementById('app');
    function init() {
        Promise.all([
            fetch('./contact-card.hbs').then(res => res.text()),
            fetch('./contacts.hbs').then(res => res.text()),
            fetch('./contacts.json').then(res => res.json())
        ]).then(([contactCardTemplateString, contactsTemplateString, contacts]) => {
            Handlebars.registerPartial('contact', contactCardTemplateString);
            const template = Handlebars.compile(contactsTemplateString);
            appEl.innerHTML = template({ contacts });
            const contactsEL = appEl.querySelector('#contacts');
            contactsEL.addEventListener('click', function (e) {
                const target = e.target;
                if (!target.classList.contains('detailsBtn')) { return; }
                const detailsEl = target.parentElement.querySelector('.details');
                if (detailsEl.classList.contains('hidden')) {
                    detailsEl.classList.remove('hidden');
                } else {
                    detailsEl.classList.add('hidden');
                }
            });
        });
    }

    init();
}());