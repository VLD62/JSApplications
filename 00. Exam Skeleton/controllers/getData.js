import { beginRequest, endRequest } from './notification.js';

export default async function () {
    // const booksURL = firebaseConfig.databaseURL + '/Books/.json'
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    // //TODO: get data with firestore! Crete another function to add books
    // beginRequest();
    // async function getData() {
    //     return (await fetch(booksURL)).json();
    // };
    // endRequest();
    // const books = await getData();
    function getAll() {
        return firebase.firestore().collection('Books').get()
    }
    getAll().then(res => {
        const books = res.docs.map(x => x = {...x.data()});
        const data = Object.assign({ books }, this.app.userData);
        this.partial('./templates/getData.hbs', data);
    });

}



