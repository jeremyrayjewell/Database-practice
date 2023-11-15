/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAuth, 
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";

/* === Firebase Setup === */
const firebaseConfig = {
    apiKey: "AIzaSyB66SOTyLAN0HnpscwifhpeTQ9IY_7XI8U",
    authDomain: "moody-1961e.firebaseapp.com",
    projectId: "moody-1961e",
    storageBucket: "moody-1961e.appspot.com",
    messagingSenderId: "588787157721",
    appId: "1:588787157721:web:2b340fe917e3c49ad50cc8"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")
const appWelcomeEl = document.getElementById("app-welcome")
const logInNotification = document.getElementById("login-notification") 

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

/* === Main Code === */

showLoggedOutView()

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    console.log("Sign in with Google")
}

function authSignInWithEmail() {
    const email = emailInputEl.value;
    const password = passwordInputEl.value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        showLoggedInView()
        appWelcomeEl.innerHTML = `Welcome ${user.email}!`
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        logInNotification.innerHTML = `<span>Error ${error.code}: unable to login.</span> <br> Please verify your email and password are correct and belong to an existing account.`      });
}

function authCreateAccountWithEmail() {
    const email = emailInputEl.value;
    const password = passwordInputEl.value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // Send email verification
            sendEmailVerification(user)
        .then(() => {
            logInNotification.innerHTML = `<span>Please check inbox for ${email}!</span> <br> We have sent you a verification email.😊`});
            createAccountButtonEl.style.display = "none";
    })
    .catch((error) => {
    // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        logInNotification.innerHTML = `<span>Error ${error.code}: unable to create account. </span> <br> Please verify your email and password are valid for creating an account.`
    });
}

/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideElement(viewLoggedIn)
    showElement(viewLoggedOut)
}

function showLoggedInView() {
    hideElement(viewLoggedOut)
    showElement(viewLoggedIn)
}

function showElement(element) {
    element.style.display = "flex"
}

function hideElement(element) {
    element.style.display = "none"
}