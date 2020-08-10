import home from './modules/home.js'
import second from './modules/second.js'
import getData from './modules/getData.js';
import createUser, { registerUser } from './modules/createUser.js';
import login, {loginUser, logout} from './modules/login.js';

const app = $.sammy(function () {
    this.use('Handlebars', 'hbs');
    this.element_selector = '#content';

    // routes go here

    this.get('#/home', home);
    this.get('#/second', second);
    this.get('#/getData', getData);
    this.get('#/createUser', createUser);
    this.get('#/login', login);
    this.get('#/logout', logout);


    this.post('#/createUser', (ctx) => { registerUser.call(ctx); });
    this.post('#/login', (ctx) => { loginUser.call(ctx)})



});


$(function () {
    app.run('#/home');
});