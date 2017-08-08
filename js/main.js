$(document).ready(function() {
  let bool = false;
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


    function success(position){
      toggleWeather();

      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long, function(json) {
        const jsonW = json.weather[0];

        $('#icon').attr("src", jsonW.icon);
        colorChanger(getColor(jsonW.id));
        $('#weather').html(jsonW.description.toLowerCase() + ", ");
        $('#temp').html(convert(json.main.temp,bool));
        $('#location').html("You are currently in " + json.name);
    });
          toggleWeather(3000);
  }

  function error(){
    output.html("Locating...");
  }

  navigator.geolocation.getCurrentPosition(success,error);
}

function convert(temp, bool){
  if(bool){
    $('#convert').html("Change to celsius");
    return Math.round((temp * (9 / 5) + 32)*100)/100 + " &#X2109;";
  }
  else{
    $('#convert').html("Change to fahrenheit");
    return Math.round(temp*100)/100 + " &#X2103;";
  }
}

function toggleWeather(int){
  $('.weatherInfo').fadeToggle(int);
  $('#location').fadeToggle(int);
}


function colorChanger(hexCode){
  $('body').css("background-color", hexCode);
}

function getColor(id){
  const amber = "#ffc107";
  const blueGrey = "#607d8b";
  const grey = "#9e9e9e";
  const lightBlue = "#03a9f4";
  const yellow = "#fdd835";
  const blue = "#2196f3";
  const grey50 = "#fafafa";

  if(id<300){
    return yellow;
  }
  else if(id<400){
    return blueGrey;
  }
  else if(id<600){
    return blue;
  }
  else if(id<700){
    return grey50;
  }
  else if(id<800){
    return lightBlue;
  }
  else if(id == 800){
    return amber;
  }
  else if(id<900){
    return grey;
  }
}
