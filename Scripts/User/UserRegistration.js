window.addEventListener('DOMContentLoaded', () => {
  //Declaration of regex Pattern varaible
  const regexName = RegExp('^[A-Z]{1}[a-z]{2,}$');
  const regexEmail = RegExp('^([A-Za-z0-9]{3,20})([.][A-Za-z0-9]{1,10})*([@][a-z]{2,5})+[.][a-z]{2,3}([.][a-z]{2,3})?$');
  const regexPass = RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$_])[a-zA-Z0-9@#$_]{8,}$');

  //Declaration of instance variables  and binding data to them
  const firstName = document.getElementById('Fname');
  const lastName = document.getElementById('Lname');
  const userName = document.getElementById('Uname');
  const password = document.getElementById('pass');
  const Cpassword = document.getElementById('Cpass');

  const register = document.querySelector('#createAcc');

  let fn = 0, ln = 0, un = 0, psw = 0, cnfpw = 0;

  //function to show validation effects and hints
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

  //Events for Input Fields
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

  //Function to match password and Confirmpassword
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

  //Function to check Validation using Regex pattern defined
  function check(input, beforeinput, afterinput, spanId, errMsg, sucessMsg, regex) {
    if (!regex.test(input.value)) {
      a = showError(input.id, spanId, errMsg, beforeinput, afterinput);
      return 0;
    } else {
      a = showSuccess(input.id, spanId, sucessMsg, beforeinput, afterinput);
      return 1;
    }
  };

  //Event which triggers AddUser API
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
        alert('User Registration Sucessfull.Please Login...');
        Resetpage();
        window.location.href='http://127.0.0.1:5500/Pages/User/UserLogin.html';
      },
      error: function (error) {
        console.log(error);
        Resetpage();
      }
    })
  })

  //function to reset input fields
  function Resetpage(){
    firstName.value='';
    lastName.value='';
    userName.value='';
    password.value='';
    Cpassword.value='';
  }

})

//function to show or hide Password Fields
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
