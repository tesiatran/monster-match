$(document).ready(intitializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var firstCardBack = null;
var secondCardBack = null;
var matches = null;
var maxMatches = 1;
var firstImage = null;
var secondImage = null;
var accuracy = null;
var attempts = null;
var gamesPlayed = null;

function intitializeApp(){
   $(".cards").on("click", handleCardClick);
   $(".closeModal").on("click", resetStats);
}

function handleCardClick(event){
   console.log(event);

   console.log(event.target);

   var stopCheating = (event.target);

   if($(stopCheating).hasClass("cardFront")){
      return;
   }

   if(firstCardClicked === null){
      firstCardBack = $(event.currentTarget.lastElementChild).addClass("hidden");

      firstCardClicked = $(event.currentTarget.firstElementChild);
      firstImage = firstCardClicked.css("background-image");

   } else{
      secondCardBack = $(event.currentTarget.lastElementChild).addClass("hidden");

      secondCardClicked = $(event.currentTarget.firstElementChild);
      secondImage = secondCardClicked.css("background-image");

      if(firstImage === secondImage){

         console.log("cards match");
         firstCardClicked = null;
         secondCardClicked = null;
         firstImage = null;
         secondImage = null;
         matches++;
         attempts++;
         calculateAccuracy();

      } else{
         console.log("flip card back");
         setTimeout(flipCardBack, 800);
         attempts++;
         calculateAccuracy();

      }

      displayStats();

   }

   if(matches === maxMatches){
      $(".modalContainer").removeClass("hidden");
   }

}

function flipCardBack(){
   firstCardBack.removeClass("hidden");
   secondCardBack.removeClass("hidden");
   firstCardBack = null;
   secondCardBack = null;
   firstCardClicked = null;
   secondCardClicked = null;
   firstImage = null;
   secondImage = null;
}

function resetStats(){
   $(".modalContainer").addClass("hidden");
   $(".cardBack").removeClass("hidden");
   firstCardBack = null;
   secondCardBack = null;
   firstCardClicked = null;
   secondCardClicked = null;
   firstImage = null;
   secondImage = null;
   matches = null;
   gamesPlayed++;
   $(".gamesPlayed").text(gamesPlayed);
   matches = null;
   accuracy = null;
   attempts = null;
   $(".accuracy").text(accuracy);
   $(".attempts").text(attempts);
}

function calculateAccuracy(){
   accuracy = (matches / attempts) * 100;
   return;
}

function displayStats(){
      calculateAccuracy();
      $(".accuracy").text(accuracy.toFixed(2) + "%");
      $(".attempts").text(attempts);
      // $(".gamesPlayed").text(gamesPlayed);
}
