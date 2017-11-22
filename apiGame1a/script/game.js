var Game = function(){
  var strikes = 0;
  var correctAnswers = 0;

  this.setStatus = function(status){
    setStatus(status);
  }

  this.loadRandomQuestion = function(){
    getRandomQuestion();
  }

  function setStatus(status){
    $("#status").text(status);
  }

  function getRandomQuestion(){
    setStatus("Getting card data.");
    $.ajax( "http://jservice.io/api/random" )
      .done(function(data) {
        setStatus( "Ready" );
        displayQuestion(data[0]);
      }.bind(this))
      .fail(function() {
        setStatus( "Error!" );
      });
  }

  function displayQuestion(data){
    $("#game .question .title").text(data.question);
    $("#game .question .category").text("Category: " + data.category.title)
    console.log(data)
  }


}


$(document).ready(function(){
  var G = new Game();
  G.setStatus("Ready!");
  $(".controls").find("#load").on('click', function(){
    G.loadRandomQuestion();
  }.bind(this));


});
