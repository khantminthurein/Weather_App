class Forecast{
    constructor(){
        this.key="JCy2aJc24dE8SOOM9U2WGKemcjJ2cvAs";
        this.weatherURI ="http://dataservice.accuweather.com/currentconditions/v1/";
        this.cityURI = "http://dataservice.accuweather.com/locations/v1/cities/search";
    }
    async updateCity(city){
        let cityDets = await getCity(city);
        let weather = await getWeather(cityDets.Key);

        return {cityDets, weather }
    }
    async getCity(city){
        const query = `?apikey=${key}&q=${city}`;
        const response = await fetch(this.cityURI+query);
        let data = await response.json();
        return data[0];
    }
    async getWeather(id){
        const query = `${id}?&apikey=${key}`;
        const response = await fetch(this.weatherURI+query);
        const data = await response.json();
        return data[0];
    }
}