$(document).ready(intitializeApp);

function intitializeApp(){
   $(".cards").on("click", handleCardClick)
}

function handleCardClick(event){
   console.log(event);
   $(event.currentTarget).find(".cardBack").addClass("hidden");
}

