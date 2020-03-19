function getCookie(name) { //retorna una cookie
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function setCookie(name,value,days) { //crea una cookie facilmente
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function setBlackTheme(){
    setCookie("tema", "black");
    document.body.style.backgroundImage = "url('./img/blackcity.jpg')";
    document.getElementsByClassName("cuerpoPagina")[0].style.backgroundColor = "black"
    countTag=document.getElementsByTagName("p").length
    for (var i=0;i<countTag;i++){
        document.getElementsByTagName("p")[i].style.color = "white"
    }
    countTag=document.getElementsByTagName("h1").length
    for (var i=0;i<countTag;i++){
        document.getElementsByTagName("h1")[i].style.color = "white"
    }
}
function setWhiteTheme(){
    setCookie("tema", "white");
    document.body.style.backgroundImage = "url('./img/back.jpg')";
    document.getElementsByClassName("cuerpoPagina")[0].style.backgroundColor = "white"
    countTag=document.getElementsByTagName("p").length
    for (var i=0;i<countTag;i++){
        document.getElementsByTagName("p")[i].style.color = "black"
    }
    countTag=document.getElementsByTagName("h1").length
    for (var i=0;i<countTag;i++){
        document.getElementsByTagName("h1")[i].style.color = "black"
    }
    document.getElementsByTagName("h1")[0].style.color = "white"
}
function login(){
    localStorage.setItem("usuario", document.getElementById("loginName").value); 
}

function checkForm() {
    var nombre = document.forms["contactoForm"]["contactoNombre"].value;
    var email = document.forms["contactoForm"]["contactoEmail"].value;
    var texto = document.forms["contactoForm"]["contactoTexto"].value;
    if (nombre == "" || email == "" || texto == "") {
      alert("Todos los campos tienen que estar completos.");
      return false;
    }
  }

    //load clock
    function startTime() {
        var hoy = new Date();
        var h = hoy.getHours();
        var m = hoy.getMinutes();
        var s = hoy.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        document.getElementById('clock').innerHTML =
        h + ":" + m + ":" + s;
        var t = setTimeout(startTime, 500);
      }
    function checkTime(i) {
        if (i < 10) {i = "0" + i}; 
        return i;
    }

window.onload = function(){
    //slider
    function hexFromRGB(r, g, b) {
        var hex = [
            r.toString( 16 ),
            g.toString( 16 ),
            b.toString( 16 )
        ];
        $.each( hex, function( nr, val ) {
            if ( val.length === 1 ) {
            hex[ nr ] = "0" + val;
            }
        });
        return hex.join( "" ).toUpperCase();
        }
        function refreshSwatch() {
        var red = $( "#red" ).slider( "value" ),
            green = $( "#green" ).slider( "value" ),
            blue = $( "#blue" ).slider( "value" ),
            hex = hexFromRGB( red, green, blue );
        $( "#swatch" ).css( "background-color", "#" + hex );
        }
    
        $( "#red, #green, #blue" ).slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        value: 127,
        slide: refreshSwatch,
        change: refreshSwatch
        });
        $( "#red" ).slider( "value", 255 );
        $( "#green" ).slider( "value", 140 );
        $( "#blue" ).slider( "value", 60 );
    //load posts
    $.getJSON( "./post.json", function( data ) {
        //var count = Object.keys(data.posts).length;
        $.each( data.posts, function( key, val ) {
            var postTitle=data.posts[key]["title"];
            var postDate=data.posts[key]["fecha"];
            var postText=data.posts[key]["cuerpo"];
            var title = document.createElement("h1");
            var date = document.createElement("p");
            var text = document.createElement("p");
            var commentButton = document.createElement("button")

            title.innerHTML=postTitle;
            title.style.display = "inline-block"
            commentButton.setAttribute("class", "w3-button w3-green")
            commentButton.style.display = "inline-block"
            commentButton.style.color = "white"
            commentButton.style.marginLeft = "50%"
            commentButton.innerHTML = " X comentarios"


            date.innerHTML="Publicado el "+postDate;
            text.innerHTML=postText;
            cuerpoPosts=document.getElementsByClassName("containerPost");
            if (cuerpoPosts[0]!=null){
                cuerpoPosts[0].appendChild(title)
                cuerpoPosts[0].appendChild(commentButton)
                cuerpoPosts[0].appendChild(date)
                cuerpoPosts[0].appendChild(text)
            }
        });
    });
    //load scroll up
        $(function(){
            $('#btnscroll').click(function() {
                $('html, body').animate({ scrollTop: 0 }, 'fast');
            });
        });
    //load theme
    if (getCookie("tema")=="black"){
        setBlackTheme();
    }else{
        setWhiteTheme();
    }
    //load sesion local storage
    if (localStorage.getItem("usuario")!=null){
        document.getElementById("showLogin").innerHTML="Actualmente, estás logeado como "+this.localStorage.getItem("usuario")
    }
    $( function() {
        $( "#accordion" ).accordion();
    } );
}

