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

// function switchForm(className, e) {
//     e.preventDefault();
//     const allForms = document.querySelectorAll('form');
//     const form = document.querySelector(`form.${className}`);

//     allForms.forEach(item => {
//         item.classList.remove('active');
//     })
//     form.classList.add('active');
// }

// const container = document.getElementById('container')
// const registerBtn = document.getElementById('register')
// const loginBtn = document.getElementById('login')

// registerBtn.addEventListener('click', ()=>{
//     container.classList.add('active')
// })

// loginBtn.addEventListener('click', ()=>{
//     container.classList.remove('active')
// })

// const loginApi = "https://recruitment-api.pyt1.stg.jmr.pl/login";
// const email = document.getElementById("email")
// const password = document.getElementById("password")
// const buttonlogin = document.getElementById("buttonlogin")

// function loginSubmit(){
//   fetch(loginApi, {
//     method: "POST",
//     body: JSON.stringify({
//       login: email.value.trim(),
//       password: password.value.trim()
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   })
//     .then((response) => response.json())
//     .then((res) => {
//       if (res.status === "ok") {
//         localStorage.status = res.status;
//         alert("Đăng nhập thành công");
//         console.log(res);
//         // updateButtonUI(true);
//         localStorage.setItem('isLoggedIn', true);
//         window.location.href = "./mainpage.html";
//       }
//       else{
//         alert("Đăng nhập thất bại");
//         // validateForm()
//         console.log(res)
//       }
//     })
//     .catch((err) => {
//       alert("Đăng nhập thất bại 33");
//     //   validateForm()
//       console.log(err);
//     })
//     .finally(() => {
//       render();
//     });
// }


// function checkLoggedIn() {
//   const accessToken = localStorage.getItem('access_token');
//   if (accessToken) {
//     updateButtonUI(true);
//   } else {
//     updateButtonUI(false);
//   }
// }
// checkLoggedIn();


// document.querySelectorAll(".container .right .top button").forEach(function(button) {
//   button.addEventListener("click", function() {
//       document.querySelectorAll(".container .right .top button").forEach(function(btn) {
//           btn.classList.remove("id1");
//       });
//       button.classList.add("id1");
//       filterItems(button.textContent);
//   });
// });

// //Border login
// function validateEmail(){
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//   if(!emailPattern.test(email.value)){
//       email.classList.add("error")
//       email.classList.remove("success")
//       return false
//   }else if(email.value === ""){
//       email.classList.add("error")
//       email.classList.remove("success")
//       return false
//   }else{
//       email.classList.remove("error")
//       email.classList.add("success")
//       return true
//   }
// }

// function validatePws(){
//   if(password.value === ""){
//       password.classList.add("error")
//       password.classList.remove("success")
//       return false
//   }else{
//       password.classList.remove("error")
//       password.classList.add("success")
//       return true
//   }
// }
// function validateForm(){
//   validateEmail()
//   validatePws()
// }

// // border register

// function checkLoginStatus() {
//   let isLoggedIn = localStorage.getItem('isLoggedIn');
//   if (isLoggedIn === 'true') {
//     window.location.href = "./mainpage.html";
//   }
// }
// checkLoginStatus()