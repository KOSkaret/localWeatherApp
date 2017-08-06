$(document).ready(function(){
  requestString();
  });



function requestString(){
    navigator.geolocation.getCurrentPosition(function(position){
    $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude+ "&lon=" + position.coords.longitude,function(json){
      console.log(JSON.stringify(json));
    })});
};
