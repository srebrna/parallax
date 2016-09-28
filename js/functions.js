var postsTop;
var winHeight;

$(document).ready(function() {

  postsTop = $('.blog-posts').offset().top;
  winHeight = $(window).height();

});

//Quadratic Easing
//nasz posty boczne wlatuja z coraz mniejsza szybkoscia a nie liniowo
//super super efekt
function posts(x) {

  var goal = postsTop - winHeight / 8;
  var offset;

  if(x < goal) {

    offset = Math.min(0.005*Math.pow(x - goal, 2), winHeight);

  } else{

    offset = 0;

  }

  $('.post-1').css({'transform': 'translate(' + -offset + 'px, ' + offset * 0.2 + 'px)'});
  
  $('.post-3').css({'transform': 'translate(' + offset + 'px, ' + offset * 0.2 + 'px)'});

}

$(window).scroll(function() {
// o ile sie przesuwamy od poczatku okna
  var wScroll = $(this).scrollTop();

//paralax w headerze, glebia dzieki innej predkosci przesuwania
//przy background fixed
  $('.image1').css({
    'transform' : 'translate(0px, '+ wScroll /2 +'%)'
  });

  $('..image2').css({
    'transform' : 'translate(0px, '+ wScroll /4 +'%)'
  });

  $('.image3').css({
    'transform' : 'translate(0px, -'+ wScroll /40 +'%)'
  });

//nasze foty fadeIn robia jak dojedziemy do ich sekcji
  if(wScroll > $('.clothes-pics').offset().top - (winHeight / 1.2)) {
    $('.clothes-pics figure').each(function(i) {


//tutaj dodajemy funkcje setTimeout zeby nie wszystkie na raz
//tylko zeby pojedynczo robily fadeIn
//nie rob tego dopoki odpowiedni czas nie nadejdzie
//tym czasem jest i

      setTimeout(function() {
              $('.clothes-pics figure').eq(i).addClass('is-showing');
      }, 150 * (i+1));    
    });
  }
//i wszystko si tylko ze za pozno
//sie to trigeruje
//wiec wracamy do warunku z wSrolll i
//sprawdzamy wysokosc okna i po podzieleniu jej
//mozemy ja odjac od naszego offsetu
//wiec nasze foty zaczna fadeinowac wczesniej o 20% 

//promoscope
  if(wScroll > $('.large-window').offset().top - winHeight){
   
       $('.large-window').css({'background-position':'center '+ (wScroll - $('.large-window').offset().top) +'px'});

       var opacity = (wScroll - $('.large-window').offset().top + 400) / (wScroll / 5);

       $('.window-tint').css({'opacity': opacity});

  }


//floating elements
/*  if(wScroll > $('.blog-posts').offset().top - winHeight){

    var offset = Math.min(0, wScroll - $('.blog-posts').offset().top + winHeight - 350);

    $('.post-1').css({'transform': 'translate(' + offset + 'px, ' + Math.abs(offset * .5) + 'px)'

    });

    $('.post-3').css({'transform': 'translate(' + Math.abs(offset) + 'px, ' + Math.abs(offset * .5) + 'px)'

    });

  }*/

  posts(wScroll);
});