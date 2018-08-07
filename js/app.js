$(document).ready(function(){
    $(".dropdown-trigger").dropdown();
    $('.collapsible').collapsible();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true,
      });
});

//AUTENTIFICACION CON FIREBASE
//USANDO FIREBASE PARA INICIAR SESION
/*
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });

  (function(){
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCm8xsJEXOZaB6Mho7fFA5iavzUawhIs9A",
      authDomain: "ecommerce-princess.firebaseapp.com",
      databaseURL: "https://ecommerce-princess.firebaseio.com",
      projectId: "ecommerce-princess",
      storageBucket: "ecommerce-princess.appspot.com",
      messagingSenderId: "50790994488"
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
              location.href="index1.html"
          }else{
              console.log("not loged in");
          }
      });
  
  } ());
  

*/
//OBTENIEDO INFORMACION DE API DE MERCADO LIBRE
  const getAllInformation=()=>{
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', `https://api.mercadolibre.com/items/MLM591686651`);
    articleRequest.onload = addInformation;
    articleRequest.onerror = handleError;
    articleRequest.send();
  }
  function addInformation(){
    console.log(this.responseText);
    const data = JSON.parse(this.responseText);
    console.log(data);
    //console.log(article);
  }
  const handleError=() =>{
    console.log('Se ha presentado un error');
  }
  getAllInformation();
  