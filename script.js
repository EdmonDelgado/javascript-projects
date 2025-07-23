// http://api.weatherapi.com/v1/current.json?key=0562862d302444aa99a01718250807&q=santo domingo&aqi=no

let cityName;
let tempText = document.querySelector('.js-temperature-text');
let regionText = document.querySelector('.js-region-name-text');
let cityText = document.querySelector('.js-city-name-text');
let countryText = document.querySelector('.js-country-name-text');
let timeDate = document.querySelector('.js-time-date');
let iconElement = document.querySelector('.js-condition-icon');
let conditionText = document.querySelector('.js-condition');

document.querySelector('.js-search-button')
  .addEventListener('click', async ()=> {
    cityName = getCityName();
    const result = await fetchResults(cityName);
    updateHTML(result);

  }
);
function getCityName () {
  let city = document.querySelector('.js-search-area').value;
  document.querySelector('.js-search-area').value = '';
  return city;
};

const fetchResults = async (targetLocation) => {
  let url = `https://api.weatherapi.com/v1/current.json?key=0562862d302444aa99a01718250807&q=${targetLocation}&aqi=no`;

  const res = await fetch(url);

  const data = await res.json();
  console.log(data);
  
  let region = data.location.region;
  let city = data.location.name;
  let country = data.location.country;
  let {temp_c} = data.current;
  let {localtime} = data.location;
  let {condition} = data.current;

  return {region, city, country, localtime, temp_c, condition};
};

function updateHTML(result) {

  let splitDate = (result.localtime).split(' ')[0];
  let splitTime = (result.localtime).split(' ')[1];
  let currentDay = new Date(splitDate).toLocaleDateString('en-US', { weekday: 'long' });

  tempText.innerText = `${result.temp_c} °c`;
  regionText.innerText = result.region;
  countryText.innerText = result.country;
  cityText.innerText = result.city;
  timeDate.innerText = `${splitTime} ${currentDay}  ${splitDate}`;
  iconElement.src = result.condition.icon;
  conditionText.innerText = result.condition.text;
};

function getDayName (number) {

};