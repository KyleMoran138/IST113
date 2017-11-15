function WeatherWidget($widget){
  this.update = function(lat, lon){
    $(".results", $widget).hide();
    $(".loading", $widget).show();
    getWeatherReport(lat,lon);
  }

  this.getLocaton = function(){
  	if(navigator.geolocation){
  		navigator.geolocation.getCurrentPosition(function(position){
  			$("#latitude").val(position.coords.latitude);
  			$("#longitude").val(position.coords.longitude);
  		},function(error){
  			$("#controls .error").text("ERROR: " + error.message).slideDown();
  		})
  	}
	}

  this.getWeather = function(){
    getCurrentWeather();
  };

  function getWeatherReport(lat, lon){
    var coords = lat + "," + lon;

    $.ajax({
      url: "https://api.weather.gov/points/" + coords + "/forecast",
      dataType: "json"
    }).done(function(data){
      console.log(data);
      populateWeather(data);
    }).fail(function(jqXHR, textStatus, errorThrown){
      showError(errorThrown);
    });
  };

  function populateWeather(data){
    var observation = data.properties.periods[0];

    $(".results header img", $widget).attr('src', observation.icon);
    $(".location>span", $widget).text(data.geometry.coordinates[1] + "," + data.geometry.coordinates[0]);

    $(".conditions>span").each(function(i, e){
      var $span = $(this);
      var field = $span.data("field");
      $(this).text(observation[field]);
    });

    //$(".results footer img", $widget).attr('src', observation.image.url);

    $(".loading", $widget).fadeOut(function(){
      $(".results", $widget).fadeIn();
    });

  }

  function getCurrentWeather(){
    var lat = $("#latitude").val();
    var lon = $("#longitude").val();

    if(lat && lon){
      $("#weather-widget").fadeIn();
      new WeatherWidget($widget).update(lat, lon);
    }

  };

}
