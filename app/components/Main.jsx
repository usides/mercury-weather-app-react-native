import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Ubuntu_700Bold,
  Ubuntu_400Regular,
} from '@expo-google-fonts/ubuntu';

import {
  getSevenDaysForecastFromApi,
  getGoneDayWeatherFromApi,
} from '../api/weather_api';
import Pane from './Pane';
import CitySelect from './CitySelect';
import CardsRow from './CardsRow';
import DateSelect from './DateSelect';
import WeatherCard from './WeatherCard';

function Main() {
  let [fontsLoaded] = useFonts({
    Ubuntu_700Bold,
    Ubuntu_400Regular,
  });

  const [sevenDaysForecastCache, setSevenDaysForecastCache] = useState({});
  const [currentForecastData, setCurrentForecastData] = useState({
    days: [],
    head: 0,
  });
  const [forecastToShow, setForecastToShow] = useState([]);

  const [currentGoneDayFields, setCurrentGoneDayFields] = useState({
    dt: '',
    city: '',
  });
  const [goneDayWeatherCache, setGoneDayWeatherCache] = useState({});
  const [currentGoneDayWeatherData, setCurrentGoneDayWeatherData] = useState(
    {},
  );

  const selectCityForForecast = async (city) => {
    try {
      const forecast = await getSevenDaysForecast(city);
      setCurrentForecastData({ days: forecast, head: 0 });
    } catch {
      setForecastToShow([]);
    }
  };

  const getSevenDaysForecast = async (city) => {
    if (sevenDaysForecastCache.hasOwnProperty(city)) {
      return sevenDaysForecastCache[city];
    } else {
      const apiData = await getSevenDaysForecastFromApi(city);
      setSevenDaysForecastCache((sevenDaysForecastCache) => ({
        ...sevenDaysForecastCache,
        [city]: apiData,
      }));
      return apiData;
    }
  };

  useEffect(() => {
    if (currentForecastData.days.length === 0) return;
    const { days, head } = currentForecastData;
    const daysToShow = days.slice(head, head + 1);
    setForecastToShow(daysToShow);
  }, [currentForecastData]);

  const changeForecastToShow = (direction) => {
    if (forecastToShow.length === 0) return;
    if (direction === 'right') {
      if (currentForecastData.head + 1 >= currentForecastData.days.length) {
        return;
      }
      setCurrentForecastData((state) => ({ ...state, head: state.head + 1 }));
    } else if (direction === 'left') {
      if (currentForecastData.head === 0) return;
      setCurrentForecastData((state) => ({
        ...state,
        head: state.head + -1,
      }));
    }
  };

  const selectGoneDayCity = (city) => {
    setCurrentGoneDayFields((state) => ({ ...state, city }));
  };

  const selectGoneDayDate = (dt) => {
    setCurrentGoneDayFields((state) => ({ ...state, dt }));
  };

  useEffect(() => {
    const { dt, city } = currentGoneDayFields;
    if (dt && city) {
      getGoneDayWeather(city, dt);
    }

    async function getGoneDayWeather(city, dt) {
      const cacheKey = `${city}-${dt}`;

      if (goneDayWeatherCache.hasOwnProperty(cacheKey)) {
        setCurrentGoneDayWeatherData(goneDayWeatherCache[cacheKey]);
      } else {
        const apiData = await getGoneDayWeatherFromApi(city, dt);
        setGoneDayWeatherCache((state) => ({
          ...state,
          [cacheKey]: apiData,
        }));
        setCurrentGoneDayWeatherData(apiData);
      }
    }
  }, [currentGoneDayFields]);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView style={styles.app}>
        <ImageBackground
          source={require('../../assets/Bg-up.png')}
          style={styles.image}
          resizeMode='stretch'
          imageStyle={{ height: 300 }}
        >
          <View style={styles.header}>
            <View style={styles.heading}>
              <Text style={styles.headingText}>Weather</Text>
              <Text style={[styles.headingText, styles.headingTextRight]}>
                forecast
              </Text>
            </View>
          </View>
        </ImageBackground>
        <Pane
          isPlaceholder={forecastToShow.length === 0}
          headerText='7 Days Forecast'
        >
          <CitySelect selectCity={selectCityForForecast} />
          {Boolean(forecastToShow.length) && (
            <CardsRow
              cardsData={forecastToShow}
              changeForecastToShow={changeForecastToShow}
            />
          )}
        </Pane>

        <ImageBackground
          source={require('../../assets/Bg-buttom.png')}
          style={styles.image}
          resizeMode='stretch'
        >
          <Pane
            isPlaceholder={Object.keys(currentGoneDayWeatherData).length === 0}
            headerText='Forecast for a Date in the Past'
          >
            <CitySelect selectCity={selectGoneDayCity} />
            <DateSelect selectDate={selectGoneDayDate} />

            {Boolean(Object.keys(currentGoneDayWeatherData).length) && (
              <WeatherCard
                date={currentGoneDayWeatherData.date}
                icon={currentGoneDayWeatherData.icon}
                temp={currentGoneDayWeatherData.temp}
              />
            )}
          </Pane>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              C ЛЮБОВЬЮ ОТ MERCURY DEVELOPMENT & USIDES
            </Text>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: '#373af5',
    flexDirection: 'column',
  },
  image: {
    flex: 1,
  },
  header: {
    paddingTop: 36,
    paddingBottom: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  heading: {
    width: 310,
  },
  headingText: {
    fontSize: 40,
    color: '#fff',
    fontFamily: 'Ubuntu_700Bold',
  },
  headingTextRight: {
    marginTop: -5,
    alignSelf: 'flex-end',
  },
  footer: {
    flexShrink: 0,
    paddingTop: 20,
    paddingBottom: 10,
  },
  footerText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: `#fff`,
    fontFamily: 'Ubuntu_400Regular',
  },
});

export default Main;
