import { commonPartial } from './commonPartial.js'
import { setHeader } from './auth.js'
import { getAll } from '../models/events.js';


export function getHome(ctx){
    setHeader(ctx);
    getAll().then(res => {
        const movies = res.docs.map(x => x = {...x.data(), id: x.id});
        ctx.movies = movies;
        ctx.loadPartials(commonPartial).partial('./templates/home.hbs');
    });
}