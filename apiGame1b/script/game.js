var Game = function(){
  var categories = [];
  var players = [];
  var chosenCategories = {};
  var questions = [];
  var gameRunning = true;
  var currentPlayerTurn = 0;
  getCategories();

  this.setStatus = function(status){
    setStatus(status);
  }

  this.startGame = function(){
    initGameData();
    runTurn();
  };

  function runTurn(){
    $("#userPrompt").text("It's " + players[currentPlayerTurn].name +"'s turn!");
    $("td").on('click', function(){
      category = $(this).attr('category');
      question = $(this).parent().attr('question');
      promptQuestion(questions[category-1][question], category, question);

    });
  }

  function initGameData(){
    players = [];
    questions = [];
    chosenCategories = [];
    for(i =0; i < $('.categorySelect').length; i++){
      if($(".categorySelect:eq("+(i)+")").val() == 'NONE'){
        chosenCategories[i] = null;
      }else{
        chosenCategories[i] = categories[$(".categorySelect:eq("+(i)+")").val()];
      }
    }
    for(i = 0; i < $("#playerNumber").val(); i++){
      players[i] = new Player();
      players[i].name = $("#playerNameContainer .name:nth-child("+(i+1)+")").val();
    };
    getQuestions();

    $("#controls").hide();
    $("#inGameView").show();
    $("#introText").hide();
    $("#questionTable").show();
    refreshPlayerView();
  }

  function setStatus(status){
    $("#status").text(status);
  }

  function getQuestions(){
    setStatus("Getting questions.");

    if(chosenCategories != []){
      for(i = 0; i < chosenCategories.length; i++){
        dataToSend = {};
        setStatus("Getting question set "+(i+1)+".");
        dataToSend.category = chosenCategories[i].id;
        $.ajax({url: "http://jservice.io/api/clues", data: dataToSend })
          .done(function(data) {
            questions.push(data);
          }.bind(this))
          .fail(function() {
            setStatus( "Error!" );
          });
      }
      displayQuestions();
      setStatus( "Ready dude!" );
    }

  }

  function refreshPlayerView(){
    $("#inGameView").empty();
    for(i=0; i < players.length && i < 4; i++){
      $playerView = $("#templatePlayerView").clone();
      $('.playerName', $playerView).text(players[i].name);
      $('.score', $playerView).text(players[i].score);
      $('.strikes', $playerView).text(players[i].strikes);
      $('.questionsRight', $playerView).text(players[i].questionsRight);
      $playerView.show();
      $("#inGameView").append($playerView);
    }
  }

  function getCategories(){
    setStatus("Getting Categories data.");
    $.ajax({url: "http://jservice.io/api/categories", data: {count: 100} })
      .done(function(data) {
        setStatus( "Ready dood" );
        populateCategories(data);
      }.bind(this))
      .fail(function() {
        setStatus( "Error!" );
      });
  }

  function populateCategories(data){
    $(".categorySelect").empty();
    for(i = 0; i < data.length; i++){
      $(".categorySelect").append("<option value='" + i + "'>" + data[i].title + "</option>")
    }
    $('.categorySelect').each(function(index, element){
      $(element).val(Math.floor((Math.random() * data.length-1) + 1));
    })
    categories = data;
  }

  function displayQuestions(){
    for(i = 0; i < chosenCategories.length; i++){
      $("#questionNames .questionTitle:eq("+i+")").text(chosenCategories[i].title);
    }
  }

  function promptQuestion(question, category, questionNumber){
    $("#questionTable").hide();
    $("#questionView .question").text(question.question);
    $("#questionView .value").text(question.value);
    $("#questionView").show();
    console.log(question.answer);
    $("#questionView .submit").off('click').on('click', function(){
      if($('#questionView .answer').val() == question.answer){
        players[currentPlayerTurn].score += parseInt(question.value);
        players[currentPlayerTurn].questionsRight++;
        blurOption(category, questionNumber);
      }else{
        players[currentPlayerTurn].strikes++;
      }
      currentPlayerTurn++;
      if(currentPlayerTurn >= players.length){
        currentPlayerTurn = 0;
      }
      $('#questionView .answer').val("");
      refreshPlayerView();
      $("#questionView").hide();
      $("#questionTable").show();
    }.bind(this));

  }

  function blurOption(category, question){

  }
}

var Player = function(){
  this.score = 0;
  this.strikes = 0;
  this.questionsRight = 0;
  this.name = "Player";
}

var updatePlayerNumber = function(){
  playerNameFields = $("#playerNumber").val();
  if(playerNameFields < 1) playerNameFields = 1;
  if(playerNameFields > 4) playerNameFields = 4;
  currentAmmount = $('#playerNameContainer .name').length;
  if(playerNameFields > currentAmmount){
    $("#playerNameContainer").append('<input type="text" class="name" value="Player ' + (currentAmmount + 1) +'"/> ');
  }
  if(playerNameFields < currentAmmount){
    $("#playerNameContainer .name").last().remove();
  }
}

$(document).ready(function(){
  var G = new Game();
  var playerNameFields = 1;

  G.setStatus("Ready!");

  $("#startGameButton").on("click", G.startGame);

  $("#playerNumber").on("click", updatePlayerNumber);

  $("#playerNumber").on("change", updatePlayerNumber);


});
