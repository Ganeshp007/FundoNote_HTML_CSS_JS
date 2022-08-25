window.addEventListener('DOMContentLoaded',()=>{
    //Declaration of Regex Patterns
    const regexEmail=RegExp('^([A-Za-z0-9]{3,20})([.][A-Za-z0-9]{1,10})*([@][A-Za-z]{2,5})+[.][A-Za-z]{2,3}([.][A-Za-z]{2,3})?$');
    const regexPass=RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$_])[a-zA-Z0-9@#$_]{8,}$');
    //Declaration of instance variables  and binding data to them
    const userName = document.getElementById('emailId');
    const password = document.getElementById('pass');

    const Login = document.querySelector('#Login');

    let un=0, psw=0;
    
    //function to show validation effects and hints
    const showError = (inputId,spanId,errMsg,beforeinput,afterinput) =>{
      console.log(errMsg);
      document.getElementById(inputId).classList.remove(beforeinput);
      document.getElementById(inputId).classList.add(afterinput);
      document.getElementById(spanId).classList.add('Errmsg');
      document.getElementById(spanId).innerHTML = errMsg;
      return false;
  };

  const showSuccess = (inputId,spanId,beforeinput,afterinput) => {
      document.getElementById(inputId).classList.add(beforeinput);
      document.getElementById(inputId).classList.remove(afterinput);
      document.getElementById(spanId).classList.remove('Errmsg');
      document.getElementById(spanId).textContent = "";
      return true;
  };

  //Events for Input Fields
  userName.addEventListener('keyup',()=>{
    console.log(userName.id);
      un=check(userName,'beforeinput','afterinput','emailHint',"Enter Valid Email address",regexEmail )
  });

  password.addEventListener('keyup',()=>{
    console.log(password.id);
      psw=check(password,'beforeinput','afterinput','passHint',"Enter Valid Password",regexPass )
  });


  //function to check for validations and calls show methods implicitly
  function check(input,beforeinput,afterinput,spanId,errMsg,regex){
    if (!regex.test(input.value)) {
        a = showError(input.id,spanId,errMsg,beforeinput,afterinput);
        return 0;
      } else {
        a= showSuccess(input.id,spanId,beforeinput,afterinput);
        return 1;
      }
   };


   //Event triggers Login API
   Login.addEventListener('click', () => {
    let Logindata = {
      Email: userName.value,
      Password: password.value
    }
    console.log(Logindata);
    $.ajax({
      url: "https://localhost:44315/User/LoginUser",
      type: "POST",
      data: JSON.stringify(Logindata),
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (result) {
        console.log(result);
        set_tokenWithExpiry('token', result.data, 7200000); //2hrs=7,200,000 ms
        window.location.href = "http://127.0.0.1:5500/Pages/Dashboard/Dashboard.html";
      },
      error: function (error) {
        console.log(error);
      }
    })
    Resetpage();
  })

  //function to reset input fields
  function Resetpage(){
    userName.value='';
    password.value='';
  }

  //function to set token with expiry
  function set_tokenWithExpiry(key, value, Extime) {
    const now = new Date()
    const token= {
      value: value,
      expiry: now.getTime() + Extime,
    }
    localStorage.setItem(key, JSON.stringify(token));
  }

})

//function to set token with key,token recieved from backend response and Expiration time
function show()
{
    var x = document.getElementById("pass");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}