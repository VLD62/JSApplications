import { commonPartial } from './commonPartial.js'
import { registerUser, login, logout } from '../models/user.js'
import { saveUserInfo } from './auth.js'
//import { notify } from './notifications.js';


export function getLogin(ctx) {
    ctx.loadPartials(commonPartial).partial('./templates/user/login.hbs')
}

export function getRegister(ctx) {
    ctx.loadPartials(commonPartial).partial('./templates/user/register.hbs')
}

export function postRegister(ctx) {
    const { email, password, repeatPassword } = ctx.params;
    if (password !== repeatPassword) {
        alert("Passwords don\'t match!")
    }
    registerUser(email, password).then(res => {
        alert("Successful registration!")
        saveUserInfo(res.user.email)
        ctx.redirect('#/home')
    }).catch(e => alert(e));
}

export function postLogin(ctx) {
    const { email, password } = ctx.params;
    login(email, password).then(res => {
        saveUserInfo(res.user.email)
        alert("Login successful.");
        ctx.redirect('#/home');
    }).catch(e => alert(e));
}

export function getLogout(ctx) {
    logout().then(res => {
        sessionStorage.clear();
        alert("Successful logout.");
        ctx.redirect('#/login');
    }).catch(e => alert(e));
}

