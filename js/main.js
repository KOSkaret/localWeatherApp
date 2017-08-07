$(document).ready(function() {
  var bool = false;
    geoFind(bool);

  $("#convert").click(function(){
    $('#convert').html("Converting temp...");
    bool = !bool;
    geoFind(bool);
  });
});


function geoFind(bool){
  var output = $('#location');
  if(!navigator.geolocation){
      output.html("Geolocation is not supported by your browser");
    };
    function convert(temp){
      if(bool){
        $('#convert').html("Change to celsius");
        return Math.round((temp * (9 / 5) + 32)*100)/100 + " &#X2109;";
      }
      else{
        $('#convert').html("Change to fahrenheit");
        return Math.round(temp*100)/100 + " &#X2103;";
      }
    }

    function success(position){
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long, function(json) {
        $('#icon').attr("src", json.weather[0].icon);
        $('#weather').html(json.weather[0].description.toLowerCase() + ", ");
        $('#temp').html(convert(json.main.temp));
        $('#location').html("You are currently in " + json.name);
    });
  }

  function error(){
    output.html("Locating...");
  }

  navigator.geolocation.getCurrentPosition(success,error);
}
