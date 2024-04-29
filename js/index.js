// ^ html elements 
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const nameInput = document.getElementById("nameInput");
const btn = document.getElementById("btn");
let list = JSON.parse(localStorage.getItem("customer")) || [];
const passwordregex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
const emailRegex = /\S+@\S+\.\S+/;
const nameRegex = /^[A-Z][a-z0-9\s]+( [A-Z][a-z0-9\s]+)*$/
const content = document.getElementById("content");
var username 
// ^ function 
// * function Empty
function Empty() {
    if (emailInput.value == "" || passwordInput.value == "") {
        document.getElementById("exist").innerHTML = `<span class="text-center h5 text-danger mt-1">All inputs are required</span>`;
        return false;
    } else {
        return true;
    }
}
// * function validation
function validation(regex, input) {
    if (regex.test(input.value)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        input.nextElementSibling.classList.add("d-none");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        input.nextElementSibling.classList.remove("d-none");
        return false;
    }
}
// * check
function check() {
    for (let i = 0; i < list.length; i++) {
        if (list[i].email == emailInput.value) {
            return true;
        }
    }
    return false;
}
// * login
function login() {
    if (Empty() === true) {
        console.log("nice");
            let isExist = false;
            let state = function () {
            for (let i = 0; i < list.length; i++) {
                if (list[i].email === emailInput.value && list[i].password === passwordInput.value) {
                    localStorage.setItem("nameUser", list[i].name);
                    
                    isExist = true;
                    clear()
                    return true;
                }
            
                }
            return false;
        }
        if (state()) {
            window.location.replace("home.html");
        
        } else {
        document.getElementById("exist").innerHTML = `<span class="text-center h5 text-danger mt-1">not Exist</span>`;
        }
    }
    
}
if (content) {
        if (localStorage.getItem("nameUser") !== null) {
    let textHTML = "Welcome " + localStorage.getItem("nameUser");
    content.innerHTML = textHTML;
}
}
btn.addEventListener("click", function () {
    if (Empty()) {
        console.log("hello");
        if (validation(passwordregex, passwordInput) && validation(emailRegex, emailInput) && validation(nameRegex, nameInput)) {
            let user = {
                name:nameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            };
            
            if (check()) {
                document.getElementById("exist").innerHTML = `<span class="text-center h5 text-danger mt-1">Email already exists</span>`;
            } else {
                list.push(user);
                localStorage.setItem("customer", JSON.stringify(list));
                clearForm();
                document.getElementById("exist").innerHTML = `<span class="text-center h5 text-success mt-1">Success</span>`;
            }
            } else {
                document.getElementById("exist").innerHTML = `<span class="text-center h5 text-danger mt-1">All inputs are not correct</span>`;
            }
    }
});

function clearForm() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}
function clear() {
  emailInput.value = "";
  passwordInput.value = "";
}
