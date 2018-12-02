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

    // Get signin elements
    const txtEmail = document.getElementById('your_email');
    const txtPassword = document.getElementById('your_pass');
    const btnLogin = document.getElementById('signin');

    // Add login event
    btnLogin.addEventListener('click', e => {
        // Get email and password
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
