import cities from './city_config';

const REACT_APP_OPEN_WEATHER_MAP_API_KEY = '16ecba5f57fc875e3ce05a742582b570';

function getWeatherFormattedDate(dt) {
  const date = new Date(Number(dt) * 1000);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dateString = `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;

  return dateString.toLowerCase();
}

function tempInCelsius(tempK) {
  const temp = Math.round(Number(tempK) - 273.15);
  const sign = temp > 0 ? '+' : '';
  return `${sign}${temp}˚`;
}

const getIconLink = (iconCode) =>
  `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

function adaptWeatherData({ dt, temp, weather: [{ icon }], temp: { day } }) {
  const obj = {
    icon: getIconLink(icon),
    date: getWeatherFormattedDate(dt),
    temp,
  };
  if (day) {
    obj.temp = tempInCelsius(day);
  } else {
    obj.temp = tempInCelsius(temp);
  }
  return obj;
}

export const getSevenDaysForecastFromApi = async (city) => {
  try {
    const { lat, lon } = cities[city];
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${REACT_APP_OPEN_WEATHER_MAP_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json().then((d) => d.daily);
    return data.map((day) => adaptWeatherData(day));
  } catch (error) {
    console.log(error);
  }
};

export const getGoneDayWeatherFromApi = async (city, dt) => {
  const { lat, lon } = cities[city];
  const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt}&appid=${REACT_APP_OPEN_WEATHER_MAP_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json().then((d) => d.hourly[12]);
  return adaptWeatherData(data);
};
