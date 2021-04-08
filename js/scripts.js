// Utility logic
function roll() {
  return Math.floor(Math.random() * 6) + 1;
}
// Business logic

// Game logic
function Game() {
  this.players = [];
  this.currentPlayer = undefined;
}

Game.prototype.addPlayer = function (player) {
  this.players.push(player);
}

Game.prototype.pass = function (player) {
  for (let i = 0; i < this.players.length; i++) {
    const p = this.players[i];
    if (p.name === player.name) {
      this.players[i] = player;
      if (i < this.players.length - 1) {
        this.currentPlayer = this.players[i + 1]
      } else {
        this.currentPlayer = this.players[0]
      }
    }
  }
}

// Player logic
function Player(name) {
  this.name = name
  this.turnScore = 0
  this.score = 0
}

Player.prototype.addScore = function () {
  this.score += this.turnScore;
  this.turnScore = 0;
}

Player.prototype.addRollValue = function (rollValue) {
  this.turnScore += rollValue;
  console.log(this.turnScore)
}

// UI logic
$(document).ready(function () {
  let game = new Game();
  $(".playerForm").submit(function (event) {
    event.preventDefault();
    let name1 = $("input#name1").val();
    if (name1 != "") {
      let player = new Player(name1)
      game.addPlayer(player);
      $("input#name1").val("");
    } else {
      alert("please enter a name")
    }
    showScoreboard();
  });

  function showScoreboard() {
    $(".players").append("<li><strong>Player's name:</strong>" + game.players[game.players.length - 1].name + "<br> <strong>Player's turn score: </strong>" + game.players[game.players.length - 1].turnScore+ "<br> <Strong> Player's total score: </strong> " + game.players[game.players.length - 1].score + "</li>");
  }

  $("#go").click(function () {
    $(".welcome").hide();
    $(".playerForm").hide();
    $("#go").hide();
    game.currentPlayer = game.players[0];
  })
  $("#Pass").click(function(){
    let player = game.currentPlayer;
    player.addScore();
    $(".players li").remove();
    $(".players").append("<li><strong>Player's name:</strong>" + player.name + "<br> <strong>Player's turn score: </strong>" + player.turnScore + "<br> <Strong> Player's total score: </strong> " + player.score + "</li>");
    if(player.score >= 20){
      $(".congrats").show()
    }else{
      game.pass(player);
      player = game.currentPlayer;
      $(".players li").remove();
      $(".players").append("<li><strong>Player's name:</strong>" + player.name + "<br> <strong>Player's turn score: </strong>" + player.turnScore+ "<br> <Strong> Player's total score: </strong> " + player.score + "</li>");
      console.log(player);
    }
    $("#roll").show();
  })
  //it should display the current roll value
  $("#roll").click(function (){
    let rollValue = roll();
    let player = game.currentPlayer;
    $("#rollValue").text(rollValue);
    if(rollValue === 1){
      player.turnScore = 0
      $("#roll").hide()
    }else{
      player.addRollValue(rollValue)
    }
    $(".players li").remove();
    $(".players").append("<li><strong>Player's name:</strong>" + player.name + "<br> <strong>Player's turn score: </strong>" + player.turnScore+ "<br> <Strong> Player's total score: </strong> " + player.score + "</li>");
  });
});



