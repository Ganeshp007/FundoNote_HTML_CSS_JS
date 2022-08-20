window.addEventListener('DOMContentLoaded', () => {

  console.log("=> Connected to Registration.js");

  let regexName = RegExp('^[A-Z]{1}[a-z]{2,}$');
  let regexEmail = RegExp('^([A-Za-z0-9]{3,20})([.][A-Za-z0-9]{1,10})*([@][a-z]{2,5})+[.][a-z]{2,3}([.][a-z]{2,3})?$');
  let regexPass = RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$_])[a-zA-Z0-9@#$_]{8,}$');

  let firstName = document.getElementById('Fname');
  let lastName = document.getElementById('Lname');
  let userName = document.getElementById('Uname');
  let password = document.getElementById('pass');
  let Cpassword = document.getElementById('Cpass');

  const register = document.querySelector('#createAcc');

  let fn = 0, ln = 0, un = 0, psw = 0, cnfpw = 0;

  const showError = (inputId, spanId, errMsg, beforeinput, afterinput) => {
    console.log(errMsg);
    document.getElementById(inputId).classList.remove(beforeinput);
    document.getElementById(inputId).classList.add(afterinput);
    document.getElementById(spanId).classList.add('Errmsg');
    document.getElementById(spanId).classList.remove('form-hint');
    document.getElementById(spanId).innerHTML = errMsg;
    return false;
  };

  const showSuccess = (inputId, spanId, sucessMsg, beforeinput, afterinput) => {
    document.getElementById(inputId).classList.add(beforeinput);
    document.getElementById(inputId).classList.remove(afterinput);
    document.getElementById(spanId).classList.remove('Errmsg');
    document.getElementById(spanId).classList.add('form-hint');
    document.getElementById(spanId).textContent = sucessMsg;
    return true;
  };

  firstName.addEventListener('keyup', () => {
    console.log(firstName.id);
    fn = check(firstName, 'beforeinput', 'afterinput', 'nameHint1', "Enter Valid First name", "", regexName)
  });

  lastName.addEventListener('keyup', () => {
    console.log(lastName.id);
    ln = check(lastName, 'beforeinput', 'afterinput', 'nameHint2', "Enter Valid Last name", "", regexName)
  });

  userName.addEventListener('keyup', () => {
    console.log(userName.id);
    un = check(userName, 'beforeinput', 'afterinput', 'UsernameHint', "Enter Valid User name", "You can use letters, numbers & periods", regexEmail)
  });

  password.addEventListener('keyup', () => {
    console.log(password.id);
    psw = check(password, 'beforeinput', 'afterinput', 'passHint', "Enter Valid Password", "Use 8 or more characters with a mix of letters, numbers & symbols", regexPass)
  });

  Cpassword.addEventListener('keyup', () => {
    cnfpw = matchpassword(Cpassword, 'beforeinput', 'afterinput', 'passHint', "Confirm password must match Password", "Use 8 or more characters with a mix of letters, numbers & symbols")
  });

  function matchpassword(cpass, beforeinput, afterinput, spanId, errMsg, sucessMsg) {
    if (password.value != cpass.value) {
      a = showError(cpass.id, spanId, errMsg, beforeinput, afterinput);
      return 0;
    }
    else {
      a = showSuccess(cpass.id, spanId, sucessMsg, beforeinput, afterinput);
      return 1;
    }
  }

  function check(input, beforeinput, afterinput, spanId, errMsg, sucessMsg, regex) {
    if (!regex.test(input.value)) {
      a = showError(input.id, spanId, errMsg, beforeinput, afterinput);
      return 0;
    } else {
      a = showSuccess(input.id, spanId, sucessMsg, beforeinput, afterinput);
      return 1;
    }
  };


  register.addEventListener('click', () => {
    let Userdata = {
      Firstname: firstName.value,
      Lastname: lastName.value,
      Email: userName.value,
      Password: password.value
    }
    console.log(Userdata);
    $.ajax({
      url: "https://localhost:44315/User/AddUser",
      type: "POST",
      data: JSON.stringify(Userdata),
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (result) {
        console.log(result);
      },
      error: function (error) {
        console.log(error);
      }
    })
  })

  function Resetpage(){
    document.getElementById('registrationForm').reset();
  }

})

function show() {

  var password = document.getElementById('pass');
  var confirm = document.getElementById('Cpass');

  if (password.type === "password", confirm.type === "password") {
    password.type = "text";
    confirm.type = "text";
  }
  else if (password.type === "text", confirm.type === "text") {
    password.type = "password";
    confirm.type = "password";
  }
}
