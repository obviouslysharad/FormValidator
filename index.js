const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

function showError(username, message) {
    const formControl = username.parentElement
    formControl.className = 'form-control error';
    formControl.querySelector('small').innerText = message;
};

function showSuccess(username){
    const formControl = username.parentElement;
    formControl.className = 'form-control success'
};

function idName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

function checkEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email.value.trim()).toLowerCase())){
        showSuccess(email);
    }
    else showError(email, 'Email not valid');
};

function checkLength(element, min, max){
    if(element.value.length < min){
        showError(element, `Please enter minimum ${min} letters`);
    }
    else if(element.value.length > max){
        showError(element, `Please do not exceed ${max} letters`);
    }
    else showSuccess(element);
};

function passMatch(password, confirmPassword){
    if(password.value != confirmPassword.value){
        showError(confirmPassword, 'Passwords do not match');
        showError(password, 'Password do not match');
    }
    else showSuccess(confirmPassword);
}

function check(checkListArr){
    checkListArr.forEach( (input) => {
        if (input.value === ''){
            showError(input, `${idName(input)} is required`);
        }
        else showSuccess(input);
    })
};

form.addEventListener('submit', function(e){
    e.preventDefault();
    check([username, email, password, confirmPassword]);
    checkLength(username, 6, 10);
    checkLength(password, 5, 20);
    checkEmail(email);
    passMatch(password, confirmPassword);
});