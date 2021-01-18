const countries = document.querySelector('#countries');
const locale = document.querySelector('.location');
const updated = document.querySelector('.updated');
const confirmed = document.querySelector('.confirmed');
const recovered = document.querySelector('.recovered');
const deaths = document.querySelector('.deaths');
const cityStates = document.querySelector('#city-state');
let covidData;
let current = 'Global Totals';

function displaySubData(location, name) {
  locale.textContent = name;
  confirmed.textContent = location.confirmed.toLocaleString();
  recovered.textContent = location.recovered.toLocaleString();
  deaths.textContent = location.deaths.toLocaleString();
  updated.textContent = location.updated ? location.updated : 'N/A' ;
}

function findSubData(e) {
  const selection = e.target.value;
  
  displaySubData(covidData[current][selection], selection);
}

function displaySubLocations(location) {
    const subLocations = Object.keys(location);
  
    let places = [];
    subLocations.forEach(place => {
      if(place === 'All') { return; }
      places.push(place);
    }); 

    places.sort();
    places.forEach(place => {
      const option = document.createElement('option');
      option.textContent = `${place}`;
      cityStates.appendChild(option);
      cityStates.classList.remove('hide');
    });  

    cityStates.addEventListener('click', findSubData);
  }

function displayData(location) {
  locale.textContent = current;
  confirmed.textContent = location.All.confirmed.toLocaleString();
  recovered.textContent = location.All.recovered.toLocaleString();
  deaths.textContent = location.All.deaths.toLocaleString();
  updated.textContent = location.All.updated ? location.All.updated : 'N/A' ;

  displaySubLocations(location);
}

async function getCovidData() {
  const response = await fetch(`https://covid-api.mmediagroup.fr/v1/cases`, {mode: 'cors'});
  const data = await response.json();

  return data;
}

getCovidData().then((data) => {
  covidData = data;
  const location = Object.keys(covidData);

  location.forEach(place => {
    const option = document.createElement('option');
    option.textContent = `${place}`;
    countries.appendChild(option);
  });

  displayData(covidData.Global);
});

function changeLocation(e) {
  cityStates.innerHTML = '';
  cityStates.classList.add('hide');
  current = e.target.value;
  const countryInfo = covidData[current];

  if(countryInfo) {
    displayData(covidData[current]);
  } 
}

countries.addEventListener('click', changeLocation);