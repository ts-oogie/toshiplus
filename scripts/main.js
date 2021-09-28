let currURL = window.location.href; 
var length = currURL.length; 
var winWidth = $(window).width();

$('.containerMain').css({"width" : winWidth}); 

//API URLs
var jsUrl = "https://api.flickr.com/services/rest/?format=json&method=fli…tion+&api_key=814796ef7eee08b0534ae009b71b62aa&jsoncallback=?";
var allUrl = "https://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id=72157645079323413&+description+&api_key=814796ef7eee08b0534ae009b71b62aa&jsoncallback=?";
var bldgUrl = "https://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id=72157691750682445&+description+&api_key=814796ef7eee08b0534ae009b71b62aa&jsoncallback=?";
var peopleUrl = "https://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id=72157690113942221&+description+&api_key=814796ef7eee08b0534ae009b71b62aa&jsoncallback=?";

var toggle = 0; 
var targetLink = ''; 
var order = {};
var items = ''; 
var currFolio; 

var apiSuccess = false;

//HTML templates
var homeBio = '<img id="toshiLogo" src="images/toshiLogo.png" />' + 
                  '<h1 id="occupation">Data Programming</h1>' +
                  '<h2>Toshi++ is a site for Gregory Sugano</h2>' +
                  '<div id="bio" class="container2"> ' +
                  '</div>' +
                  '<div id="more">' +
                    '<a href="">' +
                        '<h3 id="moreLink">More</h3>' +
                    '</a>' +
                  '</div>';

var moreBio = '<div id="biowrapper">' +
                    '<img id="portrait" src="images/toshi.png">' + 
                    '<br/>' +
                    '<a href="mailto:gsugano4328@student.gwinnetttech.edu">Email Me</a>' +  
                    '<br/>' +
                    '<a href="contact.html">Contact Page</a>' + 
                    '<br/>' +
                    '<a href="https://www.instagram.com" target="_blank"><i class="fab fa-2x fa-instagram"></i></a>'+
                    '<a href="https://www.facebook.com" target="_blank"><i class="fab fa-2x fa-facebook"></i></a>'+ 
                '</div>';

var moreCProjects = '<div id="biowrapper">' +  
                    '<div class="projectButton"><a id="buttonCist1305" href=""><h2>CIST 1305</h2></a></div>' +
                    '<div class="projectButton"><a id="buttonCPlusPlus" href=""><h2>C++</h2></a></div>' +
                    '<div class="projectButton"><a id="buttonJavascript" href=""><h2>Javascript</h2></a></div>' +
                    '<br/>' +
                    '</div>';

var moreCBio = '<img id="cLogo" src="images/c.png" />' +
                  '<h2>Computer Coding Projects</h2>' +
                  '<div id="bio" class="container2">' +
                  '</div>' + 
                    '<a id="moreCProjects">' + 
                        '<div id="more">' +
                            '<h2 id="moreCLink">More</h2>' + 
                        '</div>' +
                    '</a>';

var moreJBio = '<img id="cLogo" src="images/c.png" />' +
                  '<h2>Computer Coding Projects</h2>' +
                  '<div id="bio" class="container2">' +
                  '</div>' + 
                    '<a id="moreCProjects">' + 
                        '<div id="more">' +
                            '<h2 id="moreCLink">Back</h2>' + 
                        '</div>' +
                    '</a>';


function flickrAPI(url, id){  

    var div = id; 
    var getIMG = url;//pass the getIMG var through the getJSON function

    $.getJSON(getIMG, function(data){
        if (data){
            apiSuccess = true;
        }
        //Loop through each of the photos
        $.each(data.photoset.photo, function(index, photo){ 
        //Create a variable that creates an img src tag for each photo returned
        var img_src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "c.jpg";
        //Create a variable that creates an href tag for each photo returned
        var a_href = "http://www.flickr.com/photos/" + data.photoset.owner + "/" + photo.id + "/";  
        var folio = $("<div></div>", {"class": "folioDiv20"}).appendTo(div);
        //Create a container for the image and then append to folio
        var img_box = $("<div></div>", {"class": "folioImage20"}).appendTo(folio);
        //Create an image tag and append to each img_box
        $("<img/>").attr("src", img_src).appendTo(img_box); 
            //Create a variable that looks up each individual photo and stores the description from each photo 
            var getPhotoInfo = "https://api.flickr.com/services/rest/?format=json&method=flickr.photos.getInfo&photo_id=" + photo.id + "&api_key=814796ef7eee08b0534ae009b71b62aa&jsoncallback=?";
            //Create a function that parses the info
            $.getJSON(getPhotoInfo, function(data){
                //Loop through the info and sort through key-value pairs
                $.each(data.photo.title, function(key, title){
                    //create a div that stores each title for each photo
                    $("<div/>", {"class": "folioTitle", "text": title }).appendTo(folio);
                     //Create a horizontal orange line
                    $("<hr></hr>", {"background": "black", "border": "0", "height": "5px", "width": "90%"}).appendTo(folio);
                }); 

                $.each(data.photo.description, function(key, desc){
                    //create a variable that stores each description for each photo
                    $("<div></div>", {"class": "folioDescription20", "text": desc, "width": "90%"}).appendTo(folio);
                });

                $.each(data.photo.tags.tag, function(index, object){
                    //Create a variable that stores each of the tags
                    var tagString = object.raw;  

                    var regex = /www/i;   
                    var testregex = regex.test(tagString); 

                    if (!testregex) {
                        var a_href = currURL + tagString;  
                        currFolio = a_href;
                        var folioFooter = $("<div></div>", {"class": "folioTag"}).appendTo(folio);
                        $('<a/>', {
                            href : a_href,
                            text : "Open",
                            target : targetLink
                        }).appendTo(folioFooter);  
                    }

                    if (testregex) { 
                        if(tagString == 'www.lsfilm.herokuapp.com'){
                            tagString = 'lsfilm.herokuapp.com';
                        }
                        if(tagString == 'www.tvapocalypse.herokuapp.com'){
                            tagString = 'tvapocalypse.herokuapp.com';
                        }
                        var linkURL = "http://" + tagString;   
                        var alink = $("<a/>", {"id": tagString, "class" : "centered", href : linkURL, target : "_blank",}).appendTo(folio);
                        $('<i/>', { 
                            class : "fas fa-external-link-square-alt fa-2x "
                        }).appendTo(alink); 
                    }  
                    
                 }); 

                var folioCodeContainer = $("<div></div", {"class": "folioCode"}).appendTo(folio);

            }); 
        }); 
    });//end

}  

function checkVerticalOffset() {
	var mediaQuery = window.matchMedia( "(min-width: 640px)" );
	if (mediaQuery.matches) {
		return -70; 
	}
	else {
		return -70;
	}
}  
 
function toggleMoreLess(link, data){

    switch(toggle) {
      case 0:
        $(link).text("Less");
        toggle++;
        $('#bio').animate({height: '400px'}, "slow").promise().done(function(){
            $(this).animate({height : '100%'});
            $(this).html(data);
        });
        break;
      case 1:
        $(link).text("More");
        toggle--;
        $('#bio').animate({height: '0px'}, "slow").promise().done(function(){ 
            $(this).empty();
        });
        break; 
    }  

    $('#folioCenter').empty();
} 
 
 
$(document).ready(function() {  
     // Home Bio window 
    $('body').on('click', '#moreLink', function(e){
        e.preventDefault();  
        console.log("worked");
        toggleMoreLess('moreLink', moreBio); 
    });

    //C projects bio swindow
    $('body').on('click', '#moreCProjects', function(e){ 
        console.log('worked');
        toggleMoreLess('moreCLink', moreCProjects);
    });   

    $('body').on('click', '#buttonCist1305', function(e){

        e.preventDefault(); 

        $('#folioCenter').empty();

        var thisEl = $(this); 
        var index = 0;
        var innerText = [];
        var pushCount = 0;
        
        //create new flickr album
        flickrAPI(peopleUrl, folioCenter); 
        //$('.projectButton').siblings().removeClass('notactive');
        //thisEl.addClass('notactive');
        
        thisEl[0].firstChild.innerText = ''; 
 
        setInterval(function(){  
            if (index < 9) {  
                index++;
                innerText.push('+');
                thisEl[0].firstChild.innerText = innerText.join("");
            }
            else if (apiSuccess == true) {
                thisEl[0].firstChild.innerText = 'C++'; 
            }
            else {
                index = 0;
                innerText = [];
                thisEl[0].firstChild.innerText = ''; 
            }
        }, 100);   
    });   

    $('body').on('click', '#buttonCPlusPlus', function(e){

        e.preventDefault(); 

        $('#folioCenter').empty();

        var thisEl = $(this); 
        var index = 0;
        var innerText = [];
        var pushCount = 0;
        
        flickrAPI(peopleUrl, folioCenter); 
        //$('.projectButton').siblings().removeClass('notactive');
        //thisEl.addClass('notactive');
        
        thisEl[0].firstChild.innerText = ''; 
 
        setInterval(function(){  
            if (index < 9) {  
                index++;
                innerText.push('+');
                thisEl[0].firstChild.innerText = innerText.join("");
            }
            else if (apiSuccess == true) {
                thisEl[0].firstChild.innerText = 'C++';  
            }
            else {
                index = 0;
                innerText = [];
                thisEl[0].firstChild.innerText = ''; 
            }
        }, 100);   
    });  


    $('body').on('click', '#buttonJavascript', function(e){

        e.preventDefault(); 

        $('#folioCenter').empty();

        var thisEl = $(this);
        var index = 0;
        var innerText = [];
        var pushCount = 0;
        
        flickrAPI(bldgUrl, folioCenter); 
        //$('.projectButton').siblings().removeClass('notactive');
        
        thisEl[0].firstChild.innerText = ''; 
 
        setInterval(function(){  
            if (index < 9) {  
                index++;
                innerText.push('+');
                thisEl[0].firstChild.innerText = innerText.join("");
            }
            else if (apiSuccess == true) {
                thisEl[0].firstChild.innerText = 'Javascript'; 
                
            }
            else {
                index = 0;
                innerText = [];
                thisEl[0].firstChild.innerText = ''; 
            }
        }, 100);  

    });  

    function maxWin(element){ 
        setTimeout(function(){
            element.style.width = '100%';  
        }, 1000);
    }

    function minWin(element){
        setTimeout(function(){
            element.style.width = '33.33%';  
        }, 1000);
    } 

    //folioTag on click :
    $('body').on('click', '.folioTag', function(e){
        e.preventDefault(); 
        //$(this)[0].parentNode.style.width = '100%'; 

        var thisWin = $(this);

        console.log($(this)[0].firstChild.href);

        $(this)[0].parentNode.animate({
                    width: "100%" 
                  }, {
                    duration: 1000,
                    specialEasing: {
                      width: "linear",
                      height: "easeOutBounce"
                    },
                    complete: function() {
                       console.log('100%');
                    }
        });

        maxWin($(this)[0].parentNode); 

        currFolio = $(this)[0].firstChild.href; 

        $.ajax({
          url: $(this)[0].firstChild.href, 
          success: function(result){   
                  console.log(thisWin[0].parentElement.getElementsByClassName('folioCode'));
                 thisWin[0].parentElement.getElementsByClassName('folioCode')[0].innerHTML = result; 
          }
        });
        //set scroll Position 
        //get title
        
        $(this)[0].innerHTML = '<a href="">' + "Close" + '</a>';
        $(this).removeClass('folioTag').addClass("folioTagClose"); 

    });

    $('body').on('click', '.folioTagClose', function(e){
        e.preventDefault();

        var thisWin = $(this);
        var winWidth;

        if (window.winWidth > 640) {

            winWidth = '33.33%'; 
            minWin(thisWin[0].parentNode); 
        }
        else if (window.winWidth < 641){
            winWidth = '100%'; 
            maxWin(thisWin[0].parentNode); 
        }
 
        thisWin[0].parentNode.animate({
            width: winWidth
          }, {
            duration: 1000,
            specialEasing: {
              width: "linear",
              height: "easeOutBounce"
            },
            complete: function() {
            console.log('33.33%');
            }
        }); 

         

        thisWin[0].parentElement.getElementsByClassName('folioCode')[0].innerHTML = '';       

        console.log( thisWin);

        thisWin[0].innerHTML = '<a href=' + currFolio + '>' + "Open" + '</a>';
        thisWin.removeClass('folioTagClose').addClass("folioTag");  

    });

    //Buttons on Nav BAR
    $('#buttonHome').on('click', function(e){
        e.preventDefault(); 

        $('#logoContainer').empty().promise().done(function(){
            //Get html content

            //fill this container with html content
            $(this).html(homeBio).promise().done(function(){
                console.log(" Bio html Rendered");
            });
        }); 
        $('#folioCenter').empty();
    }); 

    $('#buttonJS').on('click', function(e){
        e.preventDefault();   

        //empty logoContainer
        $('#logoContainer').empty().promise().done(function(){ 
            //fill this container with html content
            $(this).html(moreCBio).promise().done(function(){
                console.log("C Bio html Rendered");
            });
        });

        $('#folioCenter').empty();
    }); 
 
    $('#navBars').on('click', function(e){
        e.preventDefault();
        $('#navMenu').css("display", "block");
    });  
    
    if(currURL.slice((length-9), (length)) == 'shop.html'){
        $('#logoContainer').empty(); 
        $('#symbolContainer').empty();
        $('#deviconContainer').empty(); 
        $('#container4').empty();

        setTimeout(function(){   
            $('#desiconContainer').html('<div class="desicon">' + 
                                            '<h1 id="desH1">Shopping Cart</h1>'+
                                            '</div> '
                                            ); 
            $('#container5').html(' <div class="folioWrapper">' + 
                                     '<div class="galleryContainer"> ' +
                                     '<h3>T-Shirt</h3>' + 
                                     '<div class="productContainer">' + 
                                        '<div class="productText">' + 
                                            '<p> T-shirts are 100% cotton and made with the highest quality cotton. Free shipping on all items. Buy two, get the third one for half off! Limited quantities so buy them today.</p> ' + 
                                        '</div>' +
                                        '<div class="productImg">' + 
                                             '<img  src="images/tshirt.jpg" >' + 
                                        '</div>' + 
                                        '<form method="post" action="http://webdevbasics.net/cart.html">' + 
                                            '<input type="submit" value="Add to cart">' + 
                                        '</form>'+
                                     '</div> ' + 
                                    '</div> ' +      
                                    '<div class="galleryContainer"> ' +
                                     '<h3>T-Shirt</h3>' + 
                                     '<div class="productContainer">' + 
                                        '<div class="productText">' + 
                                            '<p> T-shirts are 100% cotton and made with the highest quality cotton. Free shipping on all items. Buy two, get the third one for half off! Limited quantities so buy them today.</p> ' + 
                                        '</div>' +
                                        '<div class="productImg">' + 
                                             '<img  src="images/tshirt.jpg" >' + 
                                        '</div>' + 
                                        '<form method="post" action="http://webdevbasics.net/cart.html">' + 
                                            '<input type="submit" value="Add to cart">' + 
                                        '</form>'+
                                     '</div> ' + 
                                    '</div> ' +       
                                  '</div>').css("height", "100%");  
            window.scrollTo(0, 0); 
        }, 500); 
    }   

    var modDate = document.lastModified;  

    $('#mod').text('last modified : ' + modDate); 
 
});  
