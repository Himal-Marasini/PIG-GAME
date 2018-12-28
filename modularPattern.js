// FIRST MODULE FOR UIELEMENT VARIABLES

var UIElement = (function() {
  var DOMElement;

  DOMElement = {
    newGame: document.querySelector(".newGame"),
    rollDice: document.querySelector(".rollDice"),
    hold: document.querySelector(".hold"),
    dice: document.querySelector(".dice"),
    player_1_panel: document.querySelector(".Player-1-panel"),
    player_2_panel: document.querySelector(".Player-2-panel"),
    current_0_score: document.querySelector(".Current-score-0"),
    current_1_score: document.querySelector(".Current-score-1"),
    global_0_score: document.querySelector(".Global-score-0"),
    global_1_score: document.querySelector(".Global-score-1"),
    player_0: document.querySelector(".Player-0"),
    player_1: document.querySelector(".Player-1")

  };
  return {
    DomVar: function() {
      return DOMElement;
    }
  };
})();


// SECOND MODULE

var init = (function(UIVariable) {

    var uiVar;

  // UIVar declared here
  uiVar = UIVariable.DomVar();

  // Initialization function (when function get started)
  
  function initialization() {
    score = [0, 0];
    roundscore = 0;
    activecontent = 0;
    gamePlaying = true;
    uiVar.dice.style.display = "none";
    uiVar.current_0_score.textContent = "0";
    uiVar.current_1_score.textContent = "0";
    uiVar.global_0_score.textContent = "0";
    uiVar.global_1_score.textContent = "0";
    uiVar.player_1_panel.classList.remove("active");
    uiVar.player_2_panel.classList.remove("active");
    uiVar.player_1_panel.classList.add("active");
    uiVar.player_0.classList.remove("winner");
    uiVar.player_1.classList.remove("winner");
    uiVar.player_0.textContent = "Player 1";
    uiVar.player_1.textContent = "Player 2";
  }

  // ROLL BUTTON FUNCTION 

  function data() {
    if (gamePlaying) {
      // Create a random number
      
      var dice = Math.floor(Math.random() * 6 + 1);

      // Update the UI
      uiVar.dice.style.display = "block";
      uiVar.dice.src = "dice-" + dice + ".png";

      // Changing the current score and player
      if (dice !== 1) {
        roundscore += dice;
        document.querySelector(".Current-score-" + activecontent).textContent = roundscore;
      } else {
        nextPlayer();
      }
    }
  }

  // HOLD BUTTON FUNCTION

  function hold() {
    if (gamePlaying) {
      // Store the current score into global score
      score[activecontent] += roundscore;
      document.querySelector(".Global-score-" + activecontent).textContent =
        score[activecontent];

      // Winner
      if (score[activecontent] >= 20) {
        document.querySelector(".Player-" + activecontent).textContent = "WINNER!!!";
        uiVar.dice.style.display = "none";
        document.querySelector(".Player-" + activecontent).classList.add("winner");
        uiVar.player_1_panel.classList.remove("active");
        uiVar.player_2_panel.classList.remove("active");
        gamePlaying = false;
      } else {
        // Change the Player Turn
        nextPlayer();
      }
    }
  }

  // NEXT PLAYER FUNCTION

  function nextPlayer(){
    activecontent === 0 ? (activecontent = 1) : (activecontent = 0);
    roundscore = 0;
    uiVar.dice.style.display = "none";
  
    uiVar.current_0_score.textContent = "0";
    uiVar.current_1_score.textContent = "0";
  
    uiVar.player_1_panel.classList.toggle("active");
    uiVar.player_2_panel.classList.toggle("active");
  }

  // MAKING FUNCTION AS PUBLIC 

  return {
    reset: initialization , 
    playing:data,
    hold:hold
    }
})(UIElement);


// THIRD CONTROLLER

var controller = (function(a) {

    
   // Defining variables
  var DOMVar, game , score, roundscore, activecontent, gamePlaying ;;

  // Accessing module
  DOMVar = UIElement.DomVar();
  a.reset();

  // Adding event listener
  DOMVar.rollDice.addEventListener("click", roll);
  DOMVar.hold.addEventListener("click", hold);
  DOMVar.newGame.addEventListener("click", newGamee);

  // Function of event
  function roll() {
    a.playing();
  }

  function hold() {
   a.hold();
  }

  function newGamee() {
    a.reset();
  }
})(init);
