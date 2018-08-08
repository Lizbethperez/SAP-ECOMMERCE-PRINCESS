$(document).ready(function(){
    $(".dropdown-trigger").dropdown();
    $('.collapsible').collapsible();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true,
        interval:2000
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
/*
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
 */ 

$(document).ready(function () {

/*AL DAR CLICK SE BUSCAN LOS ARETES EN LA API*/
$(document).on('click', '#second-Image', function(event){
  event.preventDefault();
  ajaxEarrings();
});
/*AL DAR CLICK SE BUSCAN LOS COLLARES EN LA API*/
$(document).on('click', '#third-Image', function(event){
  event.preventDefault();
  ajaxNecklace();
});
/*AL DAR CLICK SE BUSCAN LOS ACCESORIOS EN LA API*/
$(document).on('click', '#first-Image', function(event){
  event.preventDefault();
  ajaxHairAccesories();
});
/*AL DAR CLICK SE BUSCA LA INFORMACION PARTICULAR DE CADA PRODUCTO*/
$(document).on('click', '.btn-more', function(event){
  event.preventDefault();
  var singleIdProducts=$(this).attr('id-jewelry');
       console.log(singleIdProducts);
      ajaxSingleProducts(singleIdProducts)
});

/*FUNCION PARA VER LA DESCRIPCION PARTICULAR DE CADA FOTO DE ARETES*/



/*FUNCION AJAX PARA BUSCAR ARETES*/
    function ajaxEarrings() {
        $.ajax({
            url: "https://api.mercadolibre.com/sites/MLA/search?q=jewelry=earrings",
            type: 'GET',
            datatype: 'json',
            limit: 20
        })
            .done(function (response) {
                var data = (response);
                //console.log(data);
                getEarrings(data);
            })
            .fail(function () {
                console.log("error");
            })
    }
    /*FUNCION AJAX PARA BUSCAR COLLARES*/

    function ajaxNecklace() {
      $.ajax({
          url: "https://api.mercadolibre.com/sites/MLA/search?q=jewelry=necklace",
          type: 'GET',
          datatype: 'json',
          limit: 20
      })
          .done(function (response) {
              var data = (response);
              //console.log(data);
              getNecklace(data);
          })
          .fail(function () {
              console.log("error");
          })
  }
  /*FUNCION AJAX PARA BUSCAR ACCESORIOS*/

  function ajaxHairAccesories() {
    $.ajax({
        url: "https://api.mercadolibre.com/sites/MLA/search?q=accesories=hair=woman",
        type: 'GET',
        datatype: 'json',
        limit: 20
    })
        .done(function (response) {
            var data = (response);
            console.log(data);
            getAccesoriesHair(data);
        })
        .fail(function () {
            console.log("error");
        })
}

/*funcion AJAX INFORMACION PARTICULAR DE CADA PRODUCTO*/
function ajaxSingleProducts(idEarrings) {
  $.ajax({
      url: "https://api.mercadolibre.com/items/"+`${idEarrings}`,
      type: 'GET',
      datatype: 'json',
      limit: 20
  })
      .done(function (response) {
          var data = (response);
          console.log(data);
          descriptionSingleProducts(data);
      })
      .fail(function () {
          console.log("error");
      })
}


  /*SE OBTIENE INFORMACION DE ARETES*/
    function getEarrings(infoEarringsData) {
        var infoEarrings = infoEarringsData.results;
        //console.log(infoEarrings);
        for (var i = 0; i < infoEarrings.length; i++) {
            var singularEarrings = infoEarrings[i];
            var idEarrings = singularEarrings.id;
            var pictureEarrings = singularEarrings.thumbnail;
            var title = singularEarrings.title;
            var price = '$ ' +singularEarrings.price+" MX";

            $("#template-Product-description").append(template(idEarrings, pictureEarrings,title,price));
        }
    }
     /*SE OBTIENE INFORMACION DE COLLARES*/
    function getNecklace(infoNeklaceData) {
      var infoNeklaceData = infoNeklaceData.results;
      console.log(infoNeklaceData);
      for (var i = 0; i < infoNeklaceData.length; i++) {
          var singularNeklace = infoNeklaceData[i];
          var idNeklace = singularNeklace .id;
          var pictureNeklace = singularNeklace .thumbnail;
          var title = singularNeklace.title;
          var price = '$ '+singularNeklace.price+" MX";

          $("#template-Product-description").append(template(idNeklace,pictureNeklace,title,price));
      }
  }
   /*SE OBTIENE INFORMACION DE ACCESORIOS*/
  function getAccesoriesHair(infoAccesoriesHairData) {
    var infoAccesoriesHairData = infoAccesoriesHairData.results;
    console.log(infoAccesoriesHairData);
    for (var i = 0; i < infoAccesoriesHairData.length; i++) {
        var singularAccesoriesHair = infoAccesoriesHairData[i];
        var idAccesoriesHaair = singularAccesoriesHair.id;
        var pictureAccesoriesHair = singularAccesoriesHair.thumbnail;
        var title = singularAccesoriesHair.title;
        var price = '$ '+singularAccesoriesHair.price.toFixed(2)+' MX';

        $("#template-Product-description").append(template(idAccesoriesHaair,pictureAccesoriesHair,title,price));
    }
}

//FUNCION PARA OBTENER LA INFORMACION DE UN ARTICULO EN PARTICULAR
function descriptionSingleProducts(data){
  console.log(data);
  var articleDescription= data.title;
  var articlePrice= data.price;
  var articlePictures=data.pictures;
  var principalImg=data.thumbnail;
  var picturesArray=[];
  for(j=0;j<4;j++){
     picturesArray.push(articlePictures[j]);
  }
  console.log(picturesArray);
  var imageSmallOne=picturesArray[0].url;
  var imageSmallTwo=picturesArray[1].url;
  var imageSmallThree=picturesArray[2].url;
  var imageSmallFour=picturesArray[3].url;
  console.log(imageSmallFour);
  $('#product-single-description').append(templateOneProducts(principalImg,articleDescription,articlePrice,imageSmallOne,imageSmallTwo,imageSmallThree,imageSmallFour))
}

function templateOneProducts(principalImage,descriptionOneProduct,priceOneProduct,imageSmall1,imageSmall2,imageSmall3,imageSmall4){
  var templateOneProduct='<div class="row">'+
                '<img class="col l4 offset-l4 s4 offset-s4 center articuleImageDemostration" src="'+principalImage+'" alt="descripcionImg">'+
            '</div>'+
            '<div class="row">'+
                '<h5 class="center">'+descriptionOneProduct+'</h5>'+
                '<h5 class="center">'+priceOneProduct+'</h5>'+
            '</div>'+
            '<div class="row">'+
               '<img  class="col l2 offset-l2 s6 small-pictureArticule" src="'+imageSmall1+'" alt="description2">'+
               '<img  class="col l2 s6 small-pictureArticule" src="'+imageSmall2+'" alt="description2">'+
               '<img  class="col l2 s6 small-pictureArticule" src="'+imageSmall3+'" alt="description2">'+
               '<img  class="col l2 s6 small-pictureArticule" src="'+imageSmall4+'" alt="description2">'+
            '</div>'+
            '<div class="row">'+
                 '<a class="col l2 offset-l5 s6 offset-s3 btn" href="#">Agregar al Carrito'+ '<i class="small material-icons">shopping_cart</i>'+'</a>'+
            '</div>'
      return templateOneProduct;      
}

    function template(idJewelry, pictureJewelry,titleJewelry,priceJewelry){
        var template = '<div class="col l2 s3 format-template" id="product1">'+
            '<div class="">'+
              '<img id="jewelyImage" class="format-img-description"src="'+ pictureJewelry+'" alt="">'+
            '</div>'+
            '<div>'+
                '<ul class="format-text-template">'+
                    '<li>'+titleJewelry+'</li>'+
                    '<li>'+idJewelry+'</li>'+
                    '<li>'+priceJewelry+'</li>'+
               '</ul>'+
                '<span class="format-icons-card"><a href="#"><i class="card-move fas fa-cart-plus"></i></a></span>'+
                '<span class="format-icons-card"><a href="#"> <i class="heart-move fas fa-heart"></i> </a></span><br>'+
                '<div class="center"><a  class="black-text format-more btn-more" href="#" id-jewelry="'+idJewelry+'">More</a></div>'+
            '</div>'+
    '</div>'
        return template;
    }
  });