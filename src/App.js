import React, { Component } from 'react'
import Weather from './Components/weatherComponents'
import "bootstrap/dist/css/bootstrap.min.css"
import "weather-icons/css/weather-icons.css"
import Form from "./Components/fromComponent"

//api.openweathermap.org/data/2.5/weather?q=London,uk
const API_key = "32a5d32caa8f077f76c74158260313df";



class App extends Component {
    constructor(){
        super();
        this.state = {
            city: undefined,
            country: undefined,
            icon: undefined,
            temp: undefined,
            minTemp: undefined,
            maxTemp: undefined,
            status: "",
            error: false,
            main: undefined,
            celsius: undefined
        };

        this.weatherIcon = {
            Thunderstorm: "wi-thunderstorm",
            snow: "wi-snow",
            rain: "wi-storm-showers",
        }
    }
    getWeatherIcon(icons,rangeid){
        switch(true){
            case rangeid>= 200 && rangeid <=232:
                this.setState({icon:this.weatherIcon.Thunderstorm})
                break;
            case rangeid>= 500 && rangeid <=531:
                this.setState({icon:this.weatherIcon.rain})
                break;
            case rangeid>= 600 && rangeid <=622:
                this.setState({icon:this.weatherIcon.snow})
                break;
            default:
                this.setState({icon:this.weatherIcon.snow})
                break;

        }
    }
    celsiusConvert(temp){
        let cel = Math.floor(temp-273.15);
        return cel;
    }
    getWeather = async (e) =>{
        e.preventDefault();

        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        if(city && country){
            const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

            const response = await api_call.json();

            console.log(response);

            this.setState({
                city: `${response.name},${response.sys.country}`,
                celsius: this.celsiusConvert(response.main.temp),
                minTemp: this.celsiusConvert(response.main.temp_min),
                maxTemp: this.celsiusConvert(response.main.temp_max),
                status: response.weather[0].description,

            });
            this.getWeatherIcon(this.weatherIcon,response.weather[0].id)
        }else{
            this.setState({error:true});
        }
    }
    render() {
        return (
            <div className="container text-center">
                <Form loadWeather={this.getWeather} error={this.state.error} />
                <Weather 
                city={this.state.city} 
                country={this.state.country} 
                temp_celsius = {this.state.celsius}
                temp_max = {this.state.maxTemp}
                temp_min = {this.state.minTemp}
                description = {this.state.status}
                weatherIcon = {this.state.icon}
                />
            </div>
        )
    }
}

export default App;