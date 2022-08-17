function show(){

  var password= document.getElementById('pass');
  var confirm= document.getElementById('Cpass');
  var image= document.getElementById('eye');

  if (password.type==="password",confirm.type==="password") {
    password.type="text";
    confirm.type="text";
    image.setAttribute('src', '../../Assets/User/eyeshow.png');

  }
  else if (password.type==="text",confirm.type==="text"){
    password.type="password";
    confirm.type="password";
    image.setAttribute('src', '../../Assets/User/eyehide.png');
  }
}