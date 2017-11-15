// using a function contructor form to create an object
function MyApp(){
	var version = "v1.0";
	var weatherObj = null;
	// creating a private function
	function setStatus(message){
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function(){
		$("#app>header").append(version);
		weatherObj = new WeatherWidget($("#weather-widget"));
		$("#getWeather").on('click', weatherObj.update);
		setStatus("ready");
	};
} // end MyApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(function() {
	window.app = new MyApp();
	window.app.start();
});
