import { beginRequest, endRequest, showInfo } from './notification.js';

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        loginForm: await this.load('./templates/login/loginForm.hbs')
    };
    this.partial('./templates/login/login.hbs', this.app.userData);


}

export async function loginUser() {

    const email = this.params.username;
    const password = this.params.password;
    beginRequest();
    firebase.auth().signInWithEmailAndPassword(email, password).then(data => {
        console.log('Successfully logged user with details:', data);
        this.app.userData.loggedIn = true;
        this.app.userData.email = data.user.email;
        this.app.userData.userId = data.user.uid;
        localStorage.setItem('userToken', data['user-token']);
        localStorage.setItem('username', data.user.email);
        localStorage.setItem('userId', data.user.uid);
        endRequest();
        showInfo('Successfully logged in!');
        this.redirect('#/home');
    }).catch(error => {
        const errorMsg = error.message;
        console.error(errorMsg);
        alert(errorMsg)
    });
}

export async function logout() {
    const thisClass = this; //  here is how you assign this to variable
    beginRequest();
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("Successfully log out!")
        thisClass.app.userData.loggedIn = false;
        thisClass.app.userData.username = undefined;
        thisClass.app.userData.userId = undefined;
        thisClass.app.userData.teamId = undefined;
        localStorage.removeItem('userToken');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        endRequest();
        showInfo('Logged out!');
        thisClass.redirect('#/home');
    }, (error) => {
        console.log(error);
    });

}


