(function() {

    // Initialize Firebase
    var config = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: ""
    };
    firebase.initializeApp(config);

    // Create an auth constant
    const auth = firebase.auth();

    // Get signup elements
    const txtName = document.getElementById('name');
    const txtEmail = document.getElementById('email');
    const txtPassword = document.getElementById('pass');
    const btnSignup = document.getElementById('signup');

    // Add signup event
    btnSignup.addEventListener('click', e => {
        // Get email and password
        const email = txtEmail.value;
        const password = txtPassword.value;
        // const auth = firebase.auth();
        // Create user
        // const promise = auth.createUserWithEmailAndPassword(email, password);
        // promise.catch(e => console.log(e.message));
        // // Sign in
        // const promise2 = auth.signInWithEmailAndPassword(email, password);
        // promise2.catch(e => console.log(e.message));
        window.location.href = "/login";

    });


    // Add a realtime authentication listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log('logged in', firebaseUser);
            window.location.href = "login";
        } else {
            console.log('not logged in');
            //window.location.href = "login.html";
        }
    });
}());
