export default async function (){

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        createUserForm: await this.load('./templates/user/createUserForm.hbs'),
    };
    this.partial('./templates/user/createUser.hbs', this.app.userData);

}

export async function registerUser() {
    const email = this.params.username;
    const password = this.params.password;

    if (password !== this.params.repeatPassword){
        alert("Passwords don\'t match!");
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).then(data => {
        console.log('Successfully created user with details:', data);
        //TODO: Direct login
        this.redirect('#/login');
    }).catch(error => {
        errorMsg = error.message;
        console.error(errorMsg);
        alert(errorMsg)
    });
}
