export default async function (){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        loginForm: await this.load('./templates/loginForm.hbs')
    };
    this.partial('./templates/login.hbs');


}

//TODO:

export async function loginUser(){
    let config = {
        apiKey: "AIzaSyAlEU8QfAj24sGdI4zLY33knPcWjhCWoZk",
        authDomain: "jstest-48d7f.firebaseapp.com",
        databaseURL: "https://jstest-48d7f.firebaseio.com",
        storageBucket: "jstest-48d7f.appspot.com",
      };
    firebase.initializeApp(config);
    
    firebase.auth().onAuthStateChanged(function(user) {
        window.user = user;
        // Step 1:
        //  If no user, sign in anonymously with firebase.auth().signInAnonymously()
        //  If there is a user, log out out user details for debugging purposes.
      });
}


export async function logout(){
    await logoutGet();
    this.app.userData.loggedIn = false;
    this.app.userData.hasTeam = false;
    this.app.userData.username = undefined;
    this.app.userData.userId = undefined;
    this.app.userData.teamId = undefined;
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    this.redirect('#/home');
}