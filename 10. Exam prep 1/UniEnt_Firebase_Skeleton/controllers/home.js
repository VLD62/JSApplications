import { commonPartial } from './commonPartial.js'
import { setHeader } from './auth.js'
import { getAll } from '../models/events.js';
import { beginRequest, endRequest } from './notifications.js';

export function getHome(ctx){
    setHeader(ctx);
    getAll().then(res => {
        //Convert to array
        const events = res.docs.map(x => x = {...x.data(), id: x.id});
        ctx.events = events;
        ctx.loadPartials(commonPartial).partial('./templates/home.hbs').then(
            beginRequest());
    });
    endRequest();
}