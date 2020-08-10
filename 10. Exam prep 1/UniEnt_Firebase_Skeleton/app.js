import { commonPartial } from './controllers/commonPartial.js'
import { getHome } from './controllers/home.js';
import { getLogin, getProfile, getRegister, postRegister, postLogin, getLogout } from './controllers/user.js';
import { getCreate, postCreate, getDetails, getEdit, postEdit, getClose, getJoin } from './controllers/events.js';

const app = Sammy("body", function () {
    this.use("Handlebars", "hbs");

    this.get('#/home', getHome);
    this.get('#/login', getLogin);
    this.get('#/logout', getLogout);
    this.get('#/profile', getProfile);
    this.get('#/register', getRegister);

    this.post('#/register', postRegister);
    this.post('#/login', postLogin);

    this.get('#/create', getCreate);
    this.post('#/create', postCreate);
    this.get('#/details/:id', getDetails);
    this.get('#/edit/:id', getEdit);
    this.post('#/edit/:id', postEdit);

    this.get('#/close/:id', getClose);
    this.get('#/join/:id', getJoin);


});
app.run('#/home');