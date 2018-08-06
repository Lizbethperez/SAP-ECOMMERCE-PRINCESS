document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });
//USANDO FIREBASE PARA INICIAR SESION

(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAtdoJpgCIo3WvZb2vlXg48Qu-IE-Rwkkc",
    authDomain: "mi-p-d4a76.firebaseapp.com",
    databaseURL: "https://mi-p-d4a76.firebaseio.com",
    projectId: "mi-p-d4a76",
    storageBucket: "mi-p-d4a76.appspot.com",
    messagingSenderId: "163277132167"
  };
  firebase.initializeApp(config);

  var userEmail=document.getElementById("icon_prefix");
  var password=document.getElementById("icon_telephone");
  var btnLogin=document.getElementById("btn-login");
  var btnSignUp=document.getElementById("btn-signUp");
  var newEmail=document.getElementById("new-email");
  var newPassword=document.getElementById("new-password");

  //Creando un evento para el boton de login
  btnLogin.addEventListener("click", e => {
      var userEmailValue=userEmail.value;
      var passwordValue=password.value;
      var auth=firebase.auth();
      var promise=auth.signInWithEmailAndPassword(userEmailValue,passwordValue);
      promise.catch( e => alert(e.message));
  });
  btnSignUp.addEventListener("click", e => {
    var userEmailValue=newEmail.value;
    var passwordValue=newPassword.value;
    var auth=firebase.auth();
    var promise=auth.createUserWithEmailAndPassword(userEmailValue,passwordValue);
    promise.catch( e => alert(e.message));
    });

    firebase.auth().onAuthStateChanged(firebaseUser =>{
        if(firebaseUser){
            console.log("logeado");
            location.href="index.html"
        }else{
            console.log("not loged in");
        }
    });

} ());


