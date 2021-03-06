$(document).ready(intitializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var maxMatches = 16;
var firstImage = null;
var secondImage = null;
var accuracy = null;
var attempts = null;
var games = sessionStorage.getItem("savedGames");
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
   var shuffledMonsters = shuffleCards(monsterArray);
   createCards(shuffledMonsters);
   $(".cardBack").on("click", handleCardClick);
   $(".closeWinModal").on("click", submitScore);
   $(".closeScoresModal").on("click", playAgain);
   $(".resetButton").on("click", resetGame);

   var gameStorage = sessionStorage.getItem("savedGames");
   var accuracyStorage = sessionStorage.getItem("savedAccuracy");
   var attemptStorage = sessionStorage.getItem("savedAttempts");

   if (sessionStorage.length === 0) {
      return;
   } else if (sessionStorage.length > 0) {
      accuracy = parseInt(accuracyStorage, 10);
      $(".games").text(gameStorage);
      $(".accuracy").text(accuracy.toFixed(0) + "%");
      $(".attempts").text(attemptStorage);
   }
}

function createCards(arrayOfMonsters) {
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
            .attr("style", "background-image: url('" + arrayOfMonsters[monsterIndex] + "')");
         var cardBack = $("<div>")
            .addClass("card cardBack")
            .attr("style", "background-image: url('./assets/images/boo-door-only.jpg')");

         newCard.append(cardFront);
         newCard.append(cardBack);
         newRow.append(newCard);

         monsterIndex++;
      }
      cardContainer.append(newRow);
   }
 }

function handleCardClick(event) {
   if($((event.target)).hasClass("cardFront")) {
      return;
   }

   if(secondCardClicked) {
      firstCardClicked.removeClass("hidden");
      secondCardClicked.removeClass("hidden");
      return;
   }

   $(event.currentTarget).addClass("flip");

   if(firstCardClicked === null) {
      firstCardClicked = $(event.currentTarget);
   } else {
      secondCardClicked = $(event.currentTarget);

      firstImage = firstCardClicked.siblings().css("background-image");
      secondImage = secondCardClicked.siblings().css("background-image");

      if(firstImage === secondImage) {
         firstCardClicked = null;
         secondCardClicked = null;
         firstImage = null;
         secondImage = null;
         matches++;
         attempts++;
         calculateAccuracy();
      } else {
         setTimeout(flipCardBack, 800);
         attempts++;
         calculateAccuracy();
      }
      displayStats();
   }
   if(matches === maxMatches) {
      $(".winModalContainer").removeClass("hidden");
      games++;
      attempts = 0;
   }
}

function flipCardBack() {
   firstCardClicked.removeClass("flip");
   secondCardClicked.removeClass("flip");
   firstCardClicked = null;
   secondCardClicked = null;
   firstImage = null;
   secondImage = null;
}

function playAgain() {
   $(".scoresModalContainer").addClass("hidden");
   $(".cardBack").removeClass("flip");
   firstCardClicked = null;
   secondCardClicked = null;
   firstImage = null;
   secondImage = null;
   matches = null;

   sessionStorage.setItem("savedGames", games);
   $(".games").text(sessionStorage.getItem("savedGames"));

   $(".cardContainer").empty();
   var reshuffledMonsters = shuffleCards(monsterArray);
   createCards(reshuffledMonsters);
   $(".cardBack").on("click", handleCardClick);
}

function calculateAccuracy() {
   accuracy = (matches / attempts) * 100;
   return;
}

function displayStats() {
   calculateAccuracy();

   sessionStorage.setItem("savedAccuracy", accuracy);
   sessionStorage.setItem("savedAttempts", attempts);
   $(".accuracy").text(accuracy.toFixed(0) + "%");
   $(".attempts").text(attempts);
}

function shuffleCards(shuffledMonsterArray) {
   var currentIndex = shuffledMonsterArray.length;
   while(0 !== currentIndex) {
      var randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      var randomMonster = shuffledMonsterArray[currentIndex];
      shuffledMonsterArray[currentIndex] = shuffledMonsterArray[randomIndex];
      shuffledMonsterArray[randomIndex] = randomMonster;
   }
   return shuffledMonsterArray;
}

function submitScore(user) {
   var name = $(".nameInput").val();
   var highScore = {
      name: name,
      score: attempts
   };
   var highScoreJson = JSON.stringify(highScore);

   var submitScoreConfig = {
      type: "POST",
      dataType: "json",
      data: highScoreJson,
      url: "api/submit-score.php",
   };
   $.ajax(submitScoreConfig)

   $(".winModalContainer").addClass("hidden");
   $(".scoresModalContainer").removeClass("hidden");
   $(".nameInput").val("");
   retrieveScores();
}

function retrieveScores() {
   var retrieveScoresConfig = {
      type: "GET",
      dataType: "jsonp",
      url: "api/retrieve-scores.php",
      success: function(response) {
         displayScores(response);
      },
      error: function() {
         console.log(false);
      }
   }
   $.ajax(retrieveScoresConfig);
}

function displayScores(response) {
   $(".scoresData").remove();
   var rankNumber = 1;
   var highScoreEntry = null;

   for (var entryIndex = 0; entryIndex < response.length; entryIndex++) {
      if (rankNumber < 6) {
         var rank = $("<td>").text(rankNumber).addClass("scoresData");
         var name = $("<td>").text(response[entryIndex].name).addClass("scoresData");
         var score = $("<td>").text(response[entryIndex].score).addClass("scoresData");

         highScoreEntry = $("<tr>").append(rank, name, score);
         rankNumber++;
         $(".scoresTable").append(highScoreEntry);
      }
   }
}

function resetGame() {
   $(".cardBack").removeClass("flip");
   firstCardClicked = null;
   secondCardClicked = null;
   firstImage = null;
   secondImage = null;
   matches = null;
   games = 0;
   attempts = 0;
   accuracy = 0;
   $(".games").text(games);
   $(".attempts").text(attempts);
   $(".accuracy").text(accuracy + "%");
   $(".cardContainer").empty();
   var reshuffledMonsters = shuffleCards(monsterArray);
   createCards(reshuffledMonsters);
   $(".cardBack").on("click", handleCardClick);
}
