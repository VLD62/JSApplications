export default async function (){

    const booksURL = 'https://jstest-48d7f.firebaseio.com/Books/.json'
    

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };



    async function getData(){
        return (await fetch(booksURL)).json();
    }

    const booksInfo = await getData();




    console.log(booksInfo)
    this.partial('./templates/getData.hbs', {books : Object.values(booksInfo)});
}



