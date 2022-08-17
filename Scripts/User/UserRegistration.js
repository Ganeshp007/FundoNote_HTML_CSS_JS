function show(){

  var password= document.getElementById('pass');
  var confirm= document.getElementById('Cpass');

  if (password.type==="password",confirm.type==="password") {
    password.type="text";
    confirm.type="text";
  }
  else if (password.type==="text",confirm.type==="text"){
    password.type="password";
    confirm.type="password";
  }
}
