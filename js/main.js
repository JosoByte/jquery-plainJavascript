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
function x2(n,i,x1,r) {return x1 + r*Math.sin(2*Math.PI*n/i);};
function y2(n,i,y1,r) {return y1 - r*Math.cos(2*Math.PI*n/i);};

$(function(){
    function check_hour( ) {
      var d = new Date();
      var h = d.getHours();
      var m = d.getMinutes();
      var s = d.getSeconds();
      var ds = Math.floor(d.getMilliseconds()/100);
      if (h < 10) h = "0" + h;
      if (m < 10) m = "0" + m;
      if (s < 10) s = "0" + s;
      $('#tex').html(h + ":" + m + ":" + s);
      $('#ds').attr('x2', x2(ds,10,120,8)).attr('y2', y2(ds,10,100,8))
      $('#seg').attr('x2', x2(s,60,100,50)).attr('y2', y2(s,60,70,50));
      $('#min').attr('x2', x2(m,60,100,40)).attr('y2', y2(m,60,70,40));
      $('#hor').attr('x2', x2(h,12,100,30)).attr('y2', y2(h,12,70,30));
    }
    setInterval(function(){check_hour();}, 100);
    check_hour();
  })