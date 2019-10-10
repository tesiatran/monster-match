$(document).ready(intitializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var maxMatches = 16;
var firstImage = null;
var secondImage = null;
var accuracy = null;
var attempts = null;
var games = null;
var monsterArray = [
   "./assets/images/cda.jpg",
   "./assets/images/celia-mae.png",
   "./assets/images/charlie-proctor.png",
   "./assets/images/flint.jpg",
   "./assets/images/fungus.jpg",
   "./assets/images/george-sanderson.jpg",
   "./assets/images/henry-waternoose.jpg",
   "./assets/images/james-sullivan.jpg",
   "./assets/images/jerry.jpg",
   "./assets/images/mike-wazowski.jpg",
   "./assets/images/needleman.png",
   "./assets/images/randall-boggs.jpg",
   "./assets/images/roz.jpg",
   "./assets/images/smitty.png",
   "./assets/images/thaddeus-bile.png",
   "./assets/images/yeti.jpg",
   "./assets/images/cda.jpg",
   "./assets/images/celia-mae.png",
   "./assets/images/charlie-proctor.png",
   "./assets/images/flint.jpg",
   "./assets/images/fungus.jpg",
   "./assets/images/george-sanderson.jpg",
   "./assets/images/henry-waternoose.jpg",
   "./assets/images/james-sullivan.jpg",
   "./assets/images/jerry.jpg",
   "./assets/images/mike-wazowski.jpg",
   "./assets/images/needleman.png",
   "./assets/images/randall-boggs.jpg",
   "./assets/images/roz.jpg",
   "./assets/images/smitty.png",
   "./assets/images/thaddeus-bile.png",
   "./assets/images/yeti.jpg",
];

function intitializeApp() {
   createCards();
   $(".cardBack").on("click", handleCardClick);
   $(".closeModal").on("click", resetStats);
}

function createCards() {
   var totalCards = {
      rows: 4,
      cards: 8
   };
   var cardContainer = $(".cardContainer");
   var monsterIndex = 0;

   for(var rowIndex = 0; rowIndex < totalCards.rows; rowIndex++) {
      var newRow = $("<div>")
         .addClass("row");

      for(var cardIndex = 0; cardIndex < totalCards.cards; cardIndex++) {
         var newCard = $("<div>")
            .addClass("card");
         var cardFront = $("<div>")
            .addClass("card cardFront")
            .attr("style", "background-image: url('" + monsterArray[monsterIndex] + "'");
         var cardBack = $("<div>")
            .addClass("card cardBack")
            .attr("style", "background-image: url('./assets/images/boo-door-only.jpg'");

         newCard.append(cardFront);
         newCard.append(cardBack);
         newRow.append(newCard);

         monsterIndex++;
      }
      cardContainer.append(newRow);
   }
 }

function handleCardClick(event) {
   var stopCheating = (event.target);
   if($(stopCheating).hasClass("cardFront")) {
      return;
   }

   if(secondCardClicked) {
      firstCardClicked.removeClass("hidden");
      secondCardClicked.removeClass("hidden");
      return;
   }

   $(event.currentTarget).addClass('hidden');

   if(firstCardClicked === null) {
      firstCardClicked = $(event.currentTarget);
   } else {
      secondCardClicked = $(event.currentTarget);

      firstImage = firstCardClicked.siblings().css("background-image");
      secondImage = secondCardClicked.siblings().css("background-image");

      console.log("first image: ", firstImage);
      console.log("second image: ", secondImage);

      if(firstImage === secondImage) {
         console.log("cards match");
         firstCardClicked = null;
         secondCardClicked = null;
         firstImage = null;
         secondImage = null;
         matches++;
         attempts++;
         calculateAccuracy();
      } else {
         console.log("flip card back");
         setTimeout(flipCardBack, 800);
         attempts++;
         calculateAccuracy();
      }
      displayStats();
   }
   if(matches === maxMatches) {
      $(".modalContainer").removeClass("hidden");
   }
}

function flipCardBack() {
   firstCardClicked.removeClass("hidden");
   secondCardClicked.removeClass("hidden");
   firstCardClicked = null;
   secondCardClicked = null;
   firstImage = null;
   secondImage = null;
}

function resetStats() {
   $(".modalContainer").addClass("hidden");
   $(".cardBack").removeClass("hidden");
   firstCardClicked = null;
   secondCardClicked = null;
   firstImage = null;
   secondImage = null;
   matches = null;
   games++;
   $(".games").text(games);
   matches = null;
   accuracy = null;
   attempts = null;
   $(".accuracy").text(accuracy);
   $(".attempts").text(attempts);
}

function calculateAccuracy() {
   accuracy = (matches / attempts) * 100;
   return;
}

function displayStats() {
      calculateAccuracy();
      $(".accuracy").text(accuracy.toFixed(2) + "%");
      $(".attempts").text(attempts);
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
