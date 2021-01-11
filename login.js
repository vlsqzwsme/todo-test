const loginButton = document.querySelector('#login');
const loginForm = document.querySelector('.login-form');

if (!localStorage.getItem('passwords')) {
    localStorage.setItem('passwords', JSON.stringify([]));
}

// LOGIN

loginButton.addEventListener('click', e => {
    const username = loginForm.username.value;
    loginForm.classList.remove("incorrect");
    loginForm.classList.remove("incorrect-username");

    const password = loginForm.password.value;
    passwords = JSON.parse(localStorage.getItem('passwords'));
    let exists = false;
    let passwordCorrect = false;

    // if username = 'passwords'

    if (username === 'passwords') {
        loginForm.classList.add("incorrect-username");
        loginForm.reset();
    }

    // check if user exists

    Object.keys(localStorage).forEach((key) => {
        if (username === key) { exists = true; }
    });

    // check if password correct

    if (exists) {

        passwords.forEach(pass => {
            if (username === pass.username) {
                passwordCorrect = (password === pass.password); 
            }
        });

        if (passwordCorrect) {
            sessionStorage.setItem('current', username);
            window.location="todo.html";
         
        } else {
            loginForm.classList.add("incorrect");
            loginForm.reset();
        }
    } else {     // create new user
        localStorage.setItem(username, '');
        const newUser = {
            username: username,
            password: password
        }
        passwords.push(newUser);
        localStorage.setItem('passwords', JSON.stringify(passwords));
        sessionStorage.setItem('current', username);
        window.location="todo.html";
  
    }
});
