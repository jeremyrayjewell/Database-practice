

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

            .then(result => {
                const user = result.user;
                document.write(`Hello/Hola ${user.displayName}<br><br><h1>It worked!</h1><br><h1></h1>¡Funcionó!<br><br>Thank you for logging in. Goodbye! <br> Gracias por iniciar sesión. ¡Adiós!`);
                console.log(user)
            })
            .catch(console.log)


}