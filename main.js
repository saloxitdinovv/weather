let form = document.querySelector('form')
let body = document.body

const getWeather = async (city) => {
  let call = `http://api.weatherapi.com/v1/current.json?key=75cf5535917f4b5287f134705231311&q=${city}&aqi=no`
  fetch(call)
    .then(res => res.json())
    .then(res => {
      let weather = res.current.temp_c
      let day_night = document.querySelector('.day_night')
      let h3 = document.querySelector('h3 span')
      let condition = document.querySelector('.cond')
      let wind = document.querySelector('.wind h3')
      let name = document.querySelector('.countryName')

      if(res.current.is_day === 1) {
        body.style.backgroundImage = 'url("/public/day.jpg")'
        day_night.innerHTML = 'Day'
      } else {
        body.style.backgroundImage = 'url("/public/night.avif")'
        day_night.innerHTML = 'Night'
      }

      let icon = document.querySelector('.cond_icon')

      icon.src = res.current.condition.icon

      let h1 = document.querySelector('h1')
      let h2 = document.querySelector('h2')

      h1.innerHTML = city
      h2.innerHTML = `${weather}&#176;С`
      h3.innerHTML = res.location.localtime
      condition.innerHTML = res.current.condition.text
      wind.innerHTML = `${res.current.wind_kph} kph`
      name.innerHTML = res.location.country
    })


}

form.onsubmit = (e) => {
  e.preventDefault()

  let error = false

  let selectedCity = document.querySelector('.region')


  if (selectedCity.value === "Choose region") {
    selectedCity.classList.add('error')
  } else {
    selectedCity.classList.remove('error')
  }

  if (selectedCity.classList.contains('error')) {
    error = true
  } else {
    submit()
    getWeather(selectedCity.value)
  }

}

function submit() {
  let user = {};

  let fm = new FormData(form);

  fm.forEach((value, key) => {
    user[key] = value;
  });
  let city = user.region
  getWeather(city)
}

let config = {
  cUrl: ' GET https://www.universal-tutorial.com/api/countries',
  ckey: 'Li-G44nk51wRmDkr5knspN-bBzQ19U4-9YMpFYESkIiRYwS-U58O7KLdVjQaJc9enNE'
}


let countrySelect = document.querySelector('.country');
let regions = document.querySelector('.region');
let cities = document.querySelector('.city');

let countries;
fetch('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
  .then(res => res.json())
  .then(res => {
    countries = res;

    let uniqueCountries = [...new Set(res.map(item => item.country))];

    for (let key of uniqueCountries) {
      let opt = new Option(key, key);
      countrySelect.append(opt);
    }



  });


countrySelect.addEventListener('change', function () {
  let selectedCountry = countrySelect.value;
  let citiesOfSelectedCountry = countries.filter(item => item.country === selectedCountry);

  let uniqueRegions = new Set(citiesOfSelectedCountry.map(item => item.subcountry));

  regions.innerHTML = '';

  for (let region of uniqueRegions) {
    let opt = new Option(region, region);
    regions.append(opt);
  }
});

