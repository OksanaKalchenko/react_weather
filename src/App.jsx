import "./App.css";
import Header from "./components/Header";
import CitySearch from "./components/CitySearch";
import CityList from "./components/CityList";
import { useState, useEffect, useCallback, useRef } from "react";

async function findCity(city) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city.trim())}&count=1&language=ru&format=json`,
  );

  if (!response.ok) {
    throw new Error("Не удалось найти город");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    return null;
  }

  return data.results[0];
}

async function fetchWeather(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`,
  );

  if (!response.ok) {
    throw new Error("Не удалось загрузить погоду");
  }

  const data = await response.json();

  return {
    temperature: data.current.temperature_2m,
    weatherCode: data.current.weather_code,
  };
}

function App() {
  const [cities, setCities] = useState([]);
  const citiesRef = useRef(cities);

  useEffect(() => {
    citiesRef.current = cities;
  }, [cities]);

  async function handleAddCity(city) {
    let result;
    try {
      result = await findCity(city);

      if (!result) {
        alert("Город не найден");
        return;
      }

      const alreadyExists = cities.some((city) => city.id === result.id);

      if (alreadyExists) {
        alert("Этот город уже добавлен");
        return;
      }

      const newCity = {
        id: result.id,
        name: result.name,
        latitude: result.latitude,
        longitude: result.longitude,
        loading: true,
      };

      setCities((prev) => [...prev, newCity]);

      const weather = await fetchWeather(result.latitude, result.longitude);

      setCities((prevCities) =>
        prevCities.map((city) =>
          city.id === result.id
            ? {
                ...city,
                temperature: weather.temperature,
                weatherCode: weather.weatherCode,
                loading: false,
              }
            : city,
        ),
      );
    } catch (error) {
      console.error(error);

      setCities((prevCities) =>
        prevCities.filter((city) => city.id !== result?.id),
      );

      alert("Произошла ошибка при загрузке данных");
    }
  }

  function handleDeleteCity(cityId) {
    setCities((prevCities) => prevCities.filter((city) => cityId !== city.id));
  }

  const updateCityWeather = useCallback(async (city) => {
    setCities((prevCities) =>
      prevCities.map((item) =>
        item.id === city.id ? { ...item, loading: true } : item,
      ),
    );

    try {
      const weather = await fetchWeather(city.latitude, city.longitude);

      setCities((prevCities) =>
        prevCities.map((item) =>
          item.id === city.id
            ? {
                ...item,
                temperature: weather.temperature,
                weatherCode: weather.weatherCode,
                loading: false,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("Ошибка обновления погоды:", error);

      setCities((prevCities) =>
        prevCities.map((item) =>
          item.id === city.id ? { ...item, loading: false } : item,
        ),
      );
    }
  }, []);

  const handleUpdateAll = useCallback(async () => {
    await Promise.all(citiesRef.current.map((city) => updateCityWeather(city)));
  }, [updateCityWeather]);

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        handleUpdateAll();
      },
      5 * 60 * 1000,
    );

    return () => clearInterval(intervalId);
  }, [handleUpdateAll]);

  return (
    <div className="content">
      <Header></Header>
      <CitySearch onAddCity={handleAddCity}></CitySearch>
      {cities.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state__paragraph">
            Добавьте первый город, чтобы начать отслеживание погоды
          </p>
        </div>
      ) : (
        <>
          <button className="update-btn" onClick={handleUpdateAll}>
            Обновить всё
          </button>
          <CityList cities={cities} onDeleteCity={handleDeleteCity}></CityList>
        </>
      )}
    </div>
  );
}

export default App;
