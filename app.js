const cl = console.log;

const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const signUpForm = document.getElementById("signUpForm");
const signUpEmail = document.getElementById("signUpEmail");
const signUpPassword = document.getElementById("signUpPassword");
const signUpUser = document.getElementById("signUpUser");

const spinner = document.getElementById("spinner");


const AUTH_URL = "https://auth-git-main-iamrkjs-projects.vercel.app";
const LOGIN_URL = `${AUTH_URL}/api/auth/login`;
const SIGNUP_URL = `${AUTH_URL}/api/auth/register`;

const SnackBar = (title, icon) => {
    Swal.fire({
        title,
        icon,
        timer: 3000
    })
}

function toggleSpinner(flag) {
    if (flag) {
        spinner.classList.remove('d-none')
    } else {
        spinner.classList.add('d-none')
    }
}

const makeApiCall = async (apiUrl, methodName, msgBody) => {
    msgBody = msgBody ? JSON.stringify(msgBody) : null;
    toggleSpinner(true)

    let configObj = {
        method: methodName,
        body: msgBody,
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        let res = await fetch(apiUrl, configObj);
        let data = await res.json();

        if (!res.ok) {
            //let err = data.error || data.message
            throw new Error(data.error || data.message);
        }
        return data;
    }
    finally {
        toggleSpinner(false)
    }
}

const onSignUP = async (eve) => {
    eve.preventDefault();
    let obj = {
        email: signUpEmail.value,
        password: signUpPassword.value,
        userRole: signUpUser.value
    }
    try {
        let res = await makeApiCall(SIGNUP_URL, "POST", obj);
        SnackBar( res.message ,"success");
        signUpForm.reset()
        document.getElementById("nav-home-tab").click();
    }
    catch (err) {
        SnackBar(err, "error");
    }
}

const onLogin = async (eve) => {
    eve.preventDefault();
    let obj = {
        email: loginEmail.value,
        password: loginPassword.value,
    }
    try {
        let res = await makeApiCall(LOGIN_URL, "POST", obj);

        localStorage.setItem("token", res.token);
        localStorage.setItem("userRole", res.userRole);
        localStorage.setItem("isLogin", true);

        SnackBar( res.message ,"success");
        window.location.href = "Dashboard.html";
        loginForm.reset()
    }
    catch (err) {
         SnackBar(err, "error");
    }
}


signUpForm.addEventListener("submit", onSignUP);
loginForm.addEventListener("submit", onLogin);

