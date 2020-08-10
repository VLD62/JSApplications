import { render, html } from './node_modules/lit-html/lit-html.js'
import { repeat } from './node_modules/lit-html/directives/repeat.js'

const getAppRootTemplate = (context) => html`
<button @click=${context.toggleDisabledHandler}>Toggle Disabled</button>
<input ?disabled=${context.isDisabled} />
${context.isLoading ?
    html`<div>Loading...</div>` :
    repeat(context.users, u => u.id, (user) => html`<div>${user.email}</div>`)}
`;

class AppRoot extends HTMLElement {

    set isLoading(newValue) {
        this._isLoading = newValue;
        this._update();
    }

    get isLoading(){
        return this._isLoading;
    }

    set users(newValue) {
        this._users = newValue;
        this._update();
    }

    get users(){
        return this._users;
    }

    set isDisabled(newValue) {
        this._isDisabled = newValue;
        this._update();
    }

    get isDisabled(){
        return this._isDisabled;
    }

    toggleDisabledHandler() {
        this.isDisabled = !this.isDisabled;
    }

    constructor(){
        super();
        const root = this.attachShadow({ mode: 'closed'});

        this._update = function () {
            const template = getAppRootTemplate(this);
            render(template, root)
        }
        this.users = [];
        this.isLoading = false;
    }

    connectedCallback(){
        this.loadUsers().then( users => {
            this.users = users;
            this._update();
        });
    }

    loadUsers(){
        this.isLoading = true;
        return fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => {
              this.isLoading = false;
              return res.json();
            });
    }
}

customElements.define('app-root', AppRoot);