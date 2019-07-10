$(document).ready(intitializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var firstCardBack = null;
var secondCardBack = null;
var matches = null;
var maxMatches = 2;
var firstImage = null;
var secondImage = null;
// var attempts = null;
// var gamesPlayed = null;

function intitializeApp(){
   $(".cards").on("click", handleCardClick);
}

function handleCardClick(event){
   console.log(event);

   if(firstCardClicked === null){
      firstCardBack = $(event.target).addClass("hidden");

      firstCardClicked = $(event.currentTarget.firstElementChild);
      firstImage = firstCardClicked.css("background-image");

   } else{
      secondCardBack = $(event.target).addClass("hidden");

      secondCardClicked = $(event.currentTarget.firstElementChild);
      secondImage = secondCardClicked.css("background-image");

      if(firstImage === secondImage){

         console.log("cards match");
         firstCardClicked = null;
         secondCardClicked = null;
         firstImage = null;
         secondImage = null;
         matches++;
         // attempts++;

      } else{
         console.log("flip card back");
         setTimeout(flipCardBack, 800);
         // attempts++;

      }
   }

   // displayStats();

   if(matches === maxMatches){
      $(".modalContainer").removeClass("hidden");
      // gamesPlayed++;
   }

   $(".closeModal").on("click", closeModal);

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

function closeModal(){
   $(".modalContainer").addClass("hidden");
}

// function calculateAccuracy(){
//    var accuracyPercentage = (matches / attempts) * 100;
//    return accuracyPercentage + "%";
// }

// function displayStats(){
      // var accuracy = calculateAccuracy();
      // $(".accuracyPercentage").text(accuracy);
      // $(".gamesAttempted").text(attempts);
// }
