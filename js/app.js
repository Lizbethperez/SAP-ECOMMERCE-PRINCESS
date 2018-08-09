
//AUTENTIFICACION CON FIREBASE
//USANDO FIREBASE PARA INICIAR SESION

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
              window.location.hash = '';
              //location.href="index1.html"
          }else{
              console.log("not loged in");
          }
      });
  
  } ());

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });

$(document).ready(function(paypal){
    //console.log(paypal);
    $(".dropdown-trigger").dropdown();
    $('.collapsible').collapsible();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true,
      });

setTimeout(autoplay, 4500);
function autoplay() {
    $('.carousel').carousel('next');
    setTimeout(autoplay, 2000);
}

var option="";
//* MOSTRAR AL DAR CLICK DN USER LOGIN 
$(document).on('click', '#user-login', function(event){
    event.preventDefault();
      window.location.hash = 'userLogin/'
  });

//MOSTRAR LA FUNCION DEL CARRITO DE COMPRAS
$(document).on('click','#buy-car', function(event){
    event.preventDefault();
      window.location.hash = 'carBuy/'
  });

/*AL DAR CLICK SE BUSCAN LOS ARETES EN LA API*/
$(document).on('click', '#second-Image', function(event){
  event.preventDefault();
  $("#template-Product-description").empty();
    option="aretes";
    window.location.hash = 'allArticles/'
});

  //ajaxEarrings();
/*AL DAR CLICK SE BUSCAN LOS COLLARES EN LA API*/
$(document).on('click', '#third-Image', function(event){
  event.preventDefault();
  $("#template-Product-description").empty();
  option="collares";
  //ajaxNecklace();
  window.location.hash = 'allArticles/'
});
/*AL DAR CLICK SE BUSCAN LOS ANILLOS EN LA API*/
$(document).on('click', '#first-Image', function(event){
  event.preventDefault();
  $("#template-Product-description").empty();
  option="anillos"
  window.location.hash = 'allArticles/'
  //ajaxHairAccesories();
});
/*AL DAR CLICK SE BUSCA LA INFORMACION PARTICULAR DE CADA PRODUCTO*/
$(document).on('click', '.btn-more', function(event){
  event.preventDefault();
 $('#product-single-description').empty();
  var singleIdProducts=$(this).attr('id-jewelry');
  window.location.hash = 'singleArticles/' + singleIdProducts;
       console.log(singleIdProducts);
     // ajaxSingleProducts(singleIdProducts)
});

/*FUNCION PARA VER LA DESCRIPCION PARTICULAR DE CADA FOTO DE ARETES*/

/*FUNCION AJAX PARA BUSCAR ARETES*/
    function ajaxEarrings(option) {
        console.log(option);
        $.ajax({
            url: "https://api.mercadolibre.com/sites/MLA/search?q=joyeria"+`${option}`,
            type: 'GET',
            datatype: 'json',
            limit: 20
        })
            .done(function (response) {
                var data = (response);
                console.log(data);
                getEarrings(data);
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

  /*SE OBTIENE INFORMACION DE LOS ARTICULOS DE LAS CATEGORIAS:ARETES,ANILLOS,COLLARES*/
    function getEarrings(infoEarringsData) {
        var infoEarrings = infoEarringsData.results;
        for (var i = 0; i < infoEarrings.length; i++) {
            var singularEarrings = infoEarrings[i];
            var idEarrings = singularEarrings.id;
            var pictureEarrings = singularEarrings.thumbnail;
            var title = singularEarrings.title;
            var price = '$ ' +singularEarrings.price+" MX";

            $("#template-Product-description").append(template(idEarrings, pictureEarrings,title,price));
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
            '<div class="row">'+'<a class="col l2 offset-l5 s6 offset-s3 btn" href="#">REGRESAR'+'</a>'+
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


/**SPA MOVIENDO URLS */
$(window).on('hashchange', function(){
    loadingPrincipalPage(decodeURI(window.location.hash));
});
    $(window).trigger('hashchange');
//EJECUTA EL MOVIMIENTO ENTRE LAS URLS 
function loadingPrincipalPage(url) {
        // Se Obtiene La clave de la Url dependiendo de donde estes navegando
        var temp = url.split('/')[0];
        var map = {
            // The "Homepage".
            '': function () {
                homePage();
            },
            '#allArticles': function () {
                //llama a la funcion que arrojara el listado con todos los productos. 
                console.log("entrando a all articles aretes")
                pageAllArticules(option);
            },
            '#singleArticles': function () {
                // Se obtiene el Id de cada producto en particular 
                var pageIdSingleArticule = url.split('#singleArticles/')[1].trim();
                console.log(url);
                console.log(url.split('#singleArticles/'));
                pageSingleArticuleEarrings(pageIdSingleArticule);
            },
            '#userLogin': function () {
                //Se Manada a llamar a la funcion que muestra la estructura del Login.
                showUserLogin();
            },
            '#carBuy':function (){
              //SE manda a llamar la Funcion que muestra la Funcion para Mostrar el carrito. 
                showCarBuy();
            }

        };

        // Se ejecuta la funcion necesaria dependiendo de la palabra que contenga la url que se almacena 
        //en la variable map. 
        if (map[temp]) {
            map[temp]();
        }
        // Si la palabra que contenga lam url no la encuentra ejecutara una funcion que mande un error. 
        else {
            renderErrorPage();
        }
    }
function homePage(){
  $(".show-home").show();
  $(".show-home2").show();
  $( ".show-Products" ).hide();
  $( ".login" ).hide();
  $( ".car-Buy" ).hide();
  $(".show-AllProducts").hide();
  $( "#product-single-description" ).hide();
}

function pageAllArticules(option){
 $(".show-home").show();
 $(".show-home2").hide();
  $(".show-AllProducts").show();
  $( ".show-Products" ).hide();
  $( ".login" ).hide();
  $( ".car-Buy" ).hide();
  $( "#product-single-description" ).hide();

   ajaxEarrings(option);
}
 function pageSingleArticuleEarrings(ageIdSingleArticule){
    $(".show-home").show();
    $(".show-home2").hide();
    $( ".show-AllProducts" ).hide();
    $( ".login" ).hide();
    $( ".car-Buy" ).hide();
    $( "#product-single-description" ).show();
     ajaxSingleProducts(ageIdSingleArticule);
      console.log('renderSingleProductPage');
  }

  function showUserLogin(){
    $(".show-home").show();
    $(".show-home2").hide();
    $( ".show-AllProducts" ).hide();
    $( ".login" ).show();
    $( ".car-Buy" ).hide();
    $( "#product-single-description" ).hide();
  }

  function showCarBuy(){
    $(".show-home").show();
    $(".show-home2").hide();
    $( ".show-AllProducts" ).hide();
    $( ".login" ).hide();
    $( ".car-Buy" ).show();
    $( "#product-single-description" ).hide();
  }

  function renderErrorPage(data){
      console.log('renderErrorPage');

  }


  //SE EJECUTARA CUNADO SE TENGA UN BOTON DE REGRESAR. 
  /*$(document).on('click', '#go-back', function(){
      window.location.href='';
  })*/

});

//BOTON PARA PAGAR CON PAYPAL
paypal.Button.render({
    env: 'sandbox',
    client: {
      sandbox: 'demo_sandbox_client_id'
    },
    payment: function (data, actions) {
      return actions.payment.create({
        transactions: [{
          amount: {
            total: '20,000.00',
            currency: 'MXN'
          }
        }]
      });
    },
    onAuthorize: function (data, actions) {
      return actions.payment.execute()
        .then(function () {
          window.alert('Thank you for your purchase!');
        });
    }
   }, '#paypal-button');


