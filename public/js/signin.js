(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyA4GhAo7P1s_U0RAFuV19wHCVjZ09WQOIs",
        authDomain: "audio-39f98.firebaseapp.com",
        databaseURL: "https://audio-39f98.firebaseio.com",
        projectId: "audio-39f98",
        storageBucket: "audio-39f98.appspot.com",
        messagingSenderId: "981576778175"
    };
    firebase.initializeApp(config);

    // Create an auth constant
    const auth = firebase.auth();

    // Get signin elements
    const txtEmail = document.getElementById('your_email');
    const txtPassword = document.getElementById('your_password');
    const btnLogin = document.getElementById('signin');

    // Add login event
    btnLogin.addEventListener('click', e => {
        // Get email and password
        // TODO: VALIDATE EMAIL AND PASSWORD AGAIN
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
    });

    // Add a realtime authentication listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log('logged in', firebaseUser);
            window.location.href = "dashboard";
        } else {
            console.log('not logged in');
            //window.location.href = "login.html";
        }
    });
}());