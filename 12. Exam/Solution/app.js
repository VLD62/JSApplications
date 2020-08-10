import { getHome } from './controllers/home.js';
import { getLogin, getRegister, postRegister, postLogin, getLogout } from './controllers/user.js';
import { getAdd, postAdd, getDetails, getEdit, postEdit, getDelete, getLike} from './controllers/events.js';

const app = Sammy("body", function () {
    this.use("Handlebars", "hbs");

    //User actions
    this.get('#/home', getHome);
    this.get('#/register', getRegister);
    this.get('#/login', getLogin);
    this.get('#/logout', getLogout);
    this.post('#/register', postRegister);
    this.post('#/login', postLogin);
    //Movie events
    this.get('#/add', getAdd);
    this.post('#/add', postAdd);
    this.get('#/details/:id', getDetails);
    this.get('#/delete/:id', getDelete);
    this.get('#/edit/:id', getEdit);
    this.post('#/edit/:id', postEdit);
    this.get('#/like/:id', getLike);


});
app.run('#/home');