function switchForm(className, e) {
    e.preventDefault();
    const allForms = document.querySelectorAll('form');
    const form = document.querySelector(`form.${className}`);

    allForms.forEach(item => {
        item.classList.remove('active');
    })
    form.classList.add('active');
}

let loginApi = 'https://recruitment-api.pyt1.stg.jmr.pl/login';
let isLoggedIn = false;

const loginEmail = document.getElementById('email');
const loginPassword = document.getElementById('password');
const formLogin = document.getElementById('form-login');

function logout() {

}

function loginSubmit(event) {
    console.log(loginEmail.value.trim(), loginPassword.value.trim());
    fetch(loginApi, {
            method: 'POST',
            body: JSON.stringify({
                login: loginEmail.value.trim(),
                password: loginPassword.value.trim(),
            }),
            headers: {
                "Content-type": "application/json; charset=utf-8",
            },
        })
        .then(response => response.json())
        .then((res) => {
            console.log(res);
            if (res.status == "ok") {
                localStorage.status = res.status;
                localStorage.setItem('isLoggedIn', true);
                localStorage.access_token = res.data.access_token;
                alert("Đăng nhập thành công");
                 window.location.href = "./mainpage.html";
                console.log(res);
            } else {
                alert("Đăng nhập thất bại");
                console.log(res);
                console.log("chua nhap thong tin");

            }

        })
        .catch((err) => {
            alert("Đăng nhập thất bại");
            console.log(err);
            console.log("loi catch")
        });
    event.preventDefault();
   

}
formLogin.addEventListener("submit", loginSubmit);


const overlayer = document.querySelector('.overlayer');
const box = document.querySelector(".box");


function pop() {
    overlayer.classList.add('pop');
    box.classList.add('pop');
}
