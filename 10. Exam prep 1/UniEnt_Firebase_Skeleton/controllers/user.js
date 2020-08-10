import { commonPartial } from './commonPartial.js'
import { getAll } from '../models/events.js';
import { registerUser, login, logout } from '../models/user.js'
import { setHeader,saveUserInfo } from './auth.js'
import { notify } from './notifications.js';



export function getLogin(ctx){
    ctx.loadPartials(commonPartial).partial('./templates/user/login.hbs')
}

export function getProfile(ctx){
    setHeader(ctx);

    getAll().then(res => {
        const events = res.docs.map(x => x = {...x.data(), id: x.id});
        let eventList = []
        events.forEach(event => {
            if (event.oranizer == ctx.user.email) {
                eventList.push(event.description)
            }
        });
        ctx.eventList = eventList
        ctx.eventCounter = eventList.length;
        ctx.loadPartials(commonPartial).partial('./templates/user/profile.hbs');
    });

}

export function getRegister(ctx){
    ctx.loadPartials(commonPartial).partial('./templates/user/register.hbs')
}

export function postRegister(ctx){
    const {username, password, rePassword} = ctx.params;
    if (password !== rePassword){
        notify("Passwords don\'t match!", '#errorBox')
        return;
    }   
    registerUser(username, password).then( res => {
        saveUserInfo(res.user.email)
        ctx.redirect('#/home')
    }).catch(e => notify(e, '#errorBox'));
}

export function postLogin(ctx){
    const {username, password } = ctx.params;
    login(username, password).then( res => {
        saveUserInfo(res.user.email)
        notify("Logged in!", '#successBox')
        setTimeout(() => { ctx.redirect('#/home')}, 5000)
    }).catch(e => notify(e, '#errorBox'));
}

export function getLogout(ctx){
    logout().then( res => {
        sessionStorage.clear();
        ctx.redirect('#/login');
    }).catch(e => notify(e, '#errorBox'));
}

