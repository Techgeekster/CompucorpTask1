angular.module('task1')
.controller('WeatherController', function($timeout, WeatherService) {
    var controller = this;

    controller.permission = askPermission();
    this.permission = controller.permission;

    //Geolocation
    if(controller.permission)
    {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                $timeout(function(){
                    controller.weather = WeatherService.Geolocation.get({latitude:  position.coords.latitude, longitude: position.coords.longitude}, 
                    function(data) {
                        controller.weather = mapWeatherData(data);
                    });
                });
            });
        }
    }

    //No access to geolocation  
    this.postCode = '';
    this.country = '';

    this.update = function() {
        if(this.postCode || this.country)
        {
            controller.weather = WeatherService.ZipcodeCountry.get({zipCode: this.postCode, countryCode: this.country}, function(data) {
                controller.weather = mapWeatherData(data);
            });
        }
    };


    this.weather = controller.weather;
});

var mapWeatherData = function(data) {
        var weather = { name: null, main: {}, weather: {}, wind: {}, clouds: null};
        weather.name = data.name;
        if (data.main) 
        {
            weather.main.current = data.main.temp;
            weather.main.humidity = data.main.humidity;
            weather.main.min = data.main.temp_min;
            weather.main.max = data.main.temp_max;
        }
        if (data.weather)
        {
            weather.weather.description = data.weather[0].description.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
            weather.weather.icon = data.weather[0].icon;
            weather.iconUrl = 'http://openweathermap.org/img/w/' + weather.weather.icon  + '.png';
        }
        if (data.wind) 
        {
            weather.wind.speed = data.wind.speed;
        }
        weather.dateTimeFormatted = function() {
            var date = new Date();
            var dateTime = '';
            switch(date.getDay())
            {
                case 0:
                    dateTime = "Sunday, ";
                    break;
                case 1:
                    dateTime = "Monday, ";
                    break;
                case 2:
                    dateTime = "Tuesday, ";
                    break;
                case 3:
                    dateTime = "Wednesday, ";
                    break;
                case 4:
                    dateTime = "Thursday, ";
                    break;
                case 5:
                    dateTime = "Friday, ";
                    break;
                case 6:
                    dateTime= "Saturday, ";
                    break;
            }
            switch(date.getMonth())
            {
                case 0:
                    dateTime += "January ";
                    break;
                case 1:
                    dateTime += "February ";
                    break;
                case 2:
                    dateTime += "March ";
                    break;
                case 3:
                    dateTime += "April ";
                    break;
                case 4:
                    dateTime += "May ";
                    break;
                case 5:
                    dateTime += "June ";
                    break;
                case 6:
                    dateTime += "July ";
                    break;
                case 7:
                    dateTime += "August ";
                    break;
                case 8:
                    dateTime += "September ";
                    break;
                case 9:
                    dateTime += "October ";
                    break;
                case 10:
                    dateTime += "November ";
                    break;
                case 11:
                    dateTime += "December ";
                    break;
            }
            dateTime += date.getDate() + " ";
            dateTime += date.getFullYear() + ", ";
            if(date.getHours() < 12)
            {
                if(date.getHours() === 0)
                {
                    dateTime += 12 + ":";
                }
                else
                {
                    dateTime += date.getHours() + ":";
                }
                if(date.getMinutes() < 10)
                {
                    dateTime += "0" + date.getMinutes() + " AM";
                }
                else
                {
                    dateTime += date.getMinutes() + " AM";
                }
            }
            else
            {
                dateTime += (date.getHours()-12).toString() + ":";
                if(date.getMinutes() < 10)
                {
                    dateTime += "0" + date.getMinutes() + " PM";
                }
                else
                {
                    dateTime += date.getMinutes() + " PM";
                }
            }
            
            return dateTime;
        };
            
        return weather;
    };
    
    var askPermission = function() {
        return confirm("We would like to use your location to get the current weather");
    };