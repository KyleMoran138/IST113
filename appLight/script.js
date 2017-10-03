//Var
var on = true;
var onButtonActiveColor = "#00ff00";
var offButtonActiveColor = "#ff0000";
var onButtonDisabledColor = "#5d7e5d";
var offButtonDisabledColor = "#6c4141";



function toggleButton(element){

  var onButton =  document.getElementById("onButton");
  var offButton =  document.getElementById("offButton");
  var body = document.body;

  if(on){
    onButton.style.backgroundColor = onButtonDisabledColor;
    offButton.style.backgroundColor = offButtonActiveColor;
    body.style.backgroundColor = "#000000";
    on = false;
  }else{
    onButton.style.backgroundColor = onButtonActiveColor;
    offButton.style.backgroundColor = offButtonDisabledColor;
    body.style.backgroundColor = "#ffffff";
    on = true;
  }
  if(on){
    alert("Lights on!")
  }else{
    alert("Lights off!");
  }
}
