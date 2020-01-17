const cityForm = document.querySelector(".change-location");
const card = document.querySelector(".card");
let details = document.querySelector(".detials");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();
const updateUI = async (data) =>{
        //distruption 
        const {cityDets,weather} = data;

        //update UI template
        details.innerHTML = `
            <h5 class="my-3">${cityDets.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>
         `;

         //remove d-none class if present
         if(card.classList.contains("d-none")){
             card.classList.remove("d-none");
         }

         //update day/night & weather icon
         let timeSrc = null;
         if(weather.IsDayTime){
           timeSrc = "img/day.svg";
         }else{
           timeSrc = "img/night.svg";
         }
         time.setAttribute("src",timeSrc);

         const weatherSrc = `img/icons/${weather.WeatherIcon}.svg`;
         icon.setAttribute("src",weatherSrc);
}
cityForm.addEventListener("submit",e=>{
    e.preventDefault();

    //get city name from ui
    let city = cityForm.city.value.trim();

    //form reset
    cityForm.reset();

    //get data from api
    forecast.updateCity(city)
    .then(data=>{updateUI(data); console.log(data);})
    .catch(err=>console.log(err));

    //set localStorage 
    localStorage.setItem("city",city);
});

if(localStorage.getItem(city)){
    forecast.updateCity(localStorage.getItem(city))
    .then(data=>updateUI(data))
    .catch(err=>console.log(err));
}