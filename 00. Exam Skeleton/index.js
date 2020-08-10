import home from './controllers/home.js'
import second from './controllers/second.js'
import getData from './controllers/getData.js';
import createUser, { registerUser } from './controllers/createUser.js';
import login, { loginUser, logout } from './controllers/login.js';

window.addEventListener('load', () => {
    const app = $.sammy(function () {
        this.use('Handlebars', 'hbs');
        this.element_selector = '#content';
        this.userData = {
            loggedIn: false,
        };
        // routes go here

        this.get('#/home', home);
        this.get('#/second', second);
        this.get('#/getData', getData);
        this.get('#/createUser', createUser);
        this.get('#/login', login);
        this.get('#/logout', logout);


        this.post('#/createUser', (ctx) => { registerUser.call(ctx)});
        this.post('#/login', (ctx) => { loginUser.call(ctx) });



    });

    app.run('#/home');


});