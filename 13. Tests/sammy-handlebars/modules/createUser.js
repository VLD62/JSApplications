export default async function (){

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        createUserForm: await this.load('./templates/createUserForm.hbs'),
    };

    this.partial('./templates/createUser.hbs');

}

async function register(username, password){
    return (await fetch('https://jstest-48d7f.firebaseio.com/Users/.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json();
}

export async function registerUser() {
    if (this.params.password !== this.params.repeatPassword){
        alert("Passwords don\'t match!");
        return;
    }
    try {
        const result = await register(this.params.username, this.params.password);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
        this.redirect('#/home');
    } catch (err) {
        console.error(err);
        alert(err.message)
    }
}
