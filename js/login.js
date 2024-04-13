function switchForm(className, e) {
    e.preventDefault();
    const allForms = document.querySelectorAll('form');
    const form = document.querySelector(`form.${className}`);

    allForms.forEach(item => {
        item.classList.remove('active');
    })
    form.classList.add('active');
}

let loginApi = "https://api.storerestapi.com/auth/login"; // user name: marklyan@gmail.com // password: simple-password
let isLoggedIn = false;

const loginEmail = document.getElementById('email');
const loginPassword = document.getElementById('password');
const formLogin = document.getElementById('form-login');

function logout() {

}

function loginSubmit(event) {
    fetch(loginApi, {
            method: 'POST',
            body: JSON.stringify({
                email: loginEmail.value.trim(),
                password: loginPassword.value.trim(),
            }),
            headers: {
                "Content-type": "application/json; charset=utf-8",
            },
        })
        .then(response => response.json())
        .then(res => {
            console.log(res.data);
            if (res.status != 200) {
                alert("Đăng nhập thất bại");
                console.log(res);
                console.log("chua nhap thong tin");
            } else if (res.status == 200) {
                localStorage.access_token = res.data.access_token;
                alert("Đăng nhập thành công");
                window.location.href = "./mainpage.html";
                console.log(res);
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