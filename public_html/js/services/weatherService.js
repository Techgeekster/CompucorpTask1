angular.module('task1')
.factory('WeatherService',  function($resource) { 
    var apiKey = 'defbe4f40449be22d4a2c7ef18af2a32';
    return {
        Geolocation: $resource('http://api.openweathermap.org/data/2.5/weather?lat=:latitude&lon=:longitude&units=imperial&APPID=:key', {
            latitude: "@latitude", longitude: "@longitude", key: apiKey}, {
            'get' : { method: 'GET', params: {}, format: 'json', isArray: false }}),
        ZipcodeCountry: $resource('http://api.openweathermap.org/data/2.5/weather?zip=:zipCode,:countryCode&units=imperial&APPID=:key', {
            zipCode: "@zipCode" , countryCode: "@countryCode", key: apiKey}, {
            'get' : { method: 'GET', params: {}, format: 'json', isArray: false }})
    };
});