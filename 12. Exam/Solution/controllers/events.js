import { commonPartial } from './commonPartial.js'
import { setHeader } from './auth.js'
import { create, get, update, close } from '../models/events.js';

export function getAdd(ctx) {
    setHeader(ctx);
    ctx.loadPartials(commonPartial).partial('./templates/movies/add.hbs')
}

export function postAdd(ctx) {
    const { title, description, imageUrl } = ctx.params;
    const creator = sessionStorage.getItem('user');
    const peopleLikeIt = "";

    create({ title, description, description, imageUrl, creator, peopleLikeIt, totalLikes: 0 })
        .then(res => {
            alert("Created successfully!")
            ctx.redirect('#/home')
        }).catch(e => console.error(e))
}

export function getDetails(ctx) {
    setHeader(ctx);
    const id = ctx.params.id;
    get(id).then(res => {
        ctx.movie = { ...res.data(), id: res.id };
        ctx.isCreator = ctx.movie.creator === sessionStorage.getItem('user');
        ctx.isLiker = false
        if (ctx.movie.peopleLikeIt.includes(sessionStorage.getItem('user'))){
            ctx.isLiker = true
        }
        ctx.loadPartials(commonPartial).partial('./templates/movies/details.hbs')
    }).catch(e => console.error(e))

}

export function getEdit(ctx) {
    setHeader(ctx);
    const id = ctx.params.id;
    get(id).then(res => {
        ctx.movie = { ...res.data(), id: res.id };
        ctx.loadPartials(commonPartial).partial('./templates/movies/edit.hbs');
    }).catch(e => console.error(e));
}

export function postEdit(ctx) {
    const { title, description, imageUrl } = ctx.params;
    const id = ctx.params.id;
    update(id, { title, description, imageUrl }).then(res => {
        alert("Eddited successfully")
        ctx.redirect(`#/details/${id}`);
    }).catch(e => console.error(e));
}

export function getDelete(ctx) {
    const id = ctx.params.id;
    close(id).then(res => {
        ctx.redirect('#/home');
    }).catch(e => console.error(e));
}

export function getLike(ctx) {
    setHeader(ctx);
    const id = ctx.params.id;
    get(id).then(res => {
        ctx.movie = res.data();
        const totalLikes = ctx.movie.totalLikes + 1;
        const peopleLikeIt = ctx.movie.peopleLikeIt + `${sessionStorage.getItem('user')}, `;
        update(id, { totalLikes, peopleLikeIt}).then(res => {
            alert("Liked successfully")
            ctx.redirect(`#/details/${id}`);
        }).catch(e => console.error(e))

    }).catch(e => console.error(e))


}