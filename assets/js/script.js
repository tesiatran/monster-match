$(document).ready(intitializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var firstCardBack = null;
var secondCardBack = null;
var matches = null;
var maxMatches = 9;
var firstImage = null;
var secondImage = null;
var accuracy = null;
var attempts = null;
var gamesPlayed = null;
var monsterArray = [
   "./assets/images/celia-mae.png",
   "./assets/images/charlie-proctor.png",
   "./assets/images/fungus.jpg",
   "./assets/images/george-sanderson.jpg",
   "./assets/images/henry-waternoose.jpg",
   "./assets/images/jerry.jpg",
   "./assets/images/needleman-and-smitty.png",
   "./assets/images/randall-boggs.jpg",
   "./assets/images/roz.jpg",
   "./assets/images/thaddeus-bile.png",
   "./assets/images/celia-mae.png",
   "./assets/images/charlie-proctor.png",
   "./assets/images/fungus.jpg",
   "./assets/images/george-sanderson.jpg",
   "./assets/images/henry-waternoose.jpg",
   "./assets/images/jerry.jpg",
   "./assets/images/needleman-and-smitty.png",
   "./assets/images/randall-boggs.jpg",
   "./assets/images/roz.jpg",
   "./assets/images/thaddeus-bile.png"
];

function intitializeApp(){
   createCards();
   $(".card").on("click", handleCardClick);
   $(".closeModal").on("click", resetStats);
}

function createCards(){
   var totalCards = {
      rows: 4,
      cards: 5
   };
   var cardContainer = $(".cardContainer");
   var monsterIndex = 0;

   for(var rowIndex = 0; rowIndex < totalCards.rows; rowIndex++){
      var newRow = $("<div>")
         .addClass("row");

      for(var cardIndex = 0; cardIndex < totalCards.cards; cardIndex++){
         var newCard = $("<div>")
            .addClass("card");
         var cardFront = $("<div>")
            .addClass("card cardFront hidden")
            .attr("style", "background-image: url('" + monsterArray[monsterIndex] + "'");
         var cardBack = $("<div>")
            .addClass("card cardBack")
            .attr("style", "background-image: url('./assets/images/doors-only.png'");

         newCard.append(cardFront);
         newCard.append(cardBack);
         newRow.append(newCard);

         monsterIndex++;
      }
      cardContainer.append(newRow);
   }
 }

function handleCardClick(event){
   console.log(event);

   console.log(event.target);

   var stopCheating = (event.target);

   if($(stopCheating).hasClass("cardFront")){
      return;
   }

   $(event.currentTarget).addClass('hidden');

   // if(firstCardClicked === null){
   //    firstCardBack = $(event.currentTarget.lastElementChild).addClass("hidden");

   //    firstCardClicked = $(event.currentTarget);
   //    firstImage = firstCardClicked.removeClass("hidden");

   // } else{
   //    secondCardBack = $(event.currentTarget.lastElementChild).addClass("hidden");

   //    secondCardClicked = $(event.currentTarget);
   //    secondImage = secondCardClicked.removeClass("hidden");

   //    firstImage = firstCardClicked.next().css("background-image");
   //    secondImage = secondCardClicked.next().css("background-image");

      // var firstImage = firstCardClicked.next().css("background-image");
      // var secondImage = secondCardClicked.next().css("background-image");

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

function shuffleCards(cardArray) {
   var counter = cardArray.length;
   while (counter > 0) {
      var cardIndex = Math.floor(Math.random() * counter);
      counter--;
      var newIndex = cardArray[counter];
      cardArray[counter] = cardArray[cardIndex];
      cardArray[cardIndex] = newIndex;
   }
   return cardArray;
}
