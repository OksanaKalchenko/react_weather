function getWeatherDescription(code) {
  if (code === 0) {
    return {
      icon: "☀️",
      description: "Ясно",
    };
  }

  if (code === 1 || code === 2) {
    return {
      icon: "🌤️",
      description: "Переменная облачность",
    };
  }

  if (code === 3) {
    return {
      icon: "☁️",
      description: "Пасмурно",
    };
  }

  if (code === 45 || code === 48) {
    return {
      icon: "🌫️",
      description: "Туман",
    };
  }

  if (code >= 51 && code <= 67) {
    return {
      icon: "🌧️",
      description: "Дождь",
    };
  }

  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return {
      icon: "🌨️",
      description: "Снег",
    };
  }

  if (code >= 80 && code <= 82) {
    return {
      icon: " 🌧️",
      description: "Ливень",
    };
  }

  if (code >= 95) {
    return {
      icon: "⛈️",
      description: "Гроза",
    };
  }
}

export default function CityCard({ city, onDelete }) {
  const weather = getWeatherDescription(city.weatherCode);

  return (
    <div className="card">
      <div className="card__container">
        <h2 className="card__name">{city.name}</h2>
        <button className="card__btn" onClick={() => onDelete(city.id)}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.66669 7.33337V11.3334"
              stroke="#90A1B9"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.33331 7.33337V11.3334"
              stroke="#90A1B9"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.6666 4V13.3333C12.6666 13.687 12.5262 14.0261 12.2761 14.2761C12.0261 14.5262 11.6869 14.6667 11.3333 14.6667H4.66665C4.31302 14.6667 3.97389 14.5262 3.72384 14.2761C3.47379 14.0261 3.33331 13.687 3.33331 13.3333V4"
              stroke="#90A1B9"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 4H14"
              stroke="#90A1B9"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.33331 4.00004V2.66671C5.33331 2.31309 5.47379 1.97395 5.72384 1.7239C5.97389 1.47385 6.31302 1.33337 6.66665 1.33337H9.33331C9.68694 1.33337 10.0261 1.47385 10.2761 1.7239C10.5262 1.97395 10.6666 2.31309 10.6666 2.66671V4.00004"
              stroke="#90A1B9"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="card__weather">
        {city.loading ? (
          <p className="loading">Загружаем...</p>
        ) : (
          <>
            <div className="card__icon">{weather.icon}</div>
            <div className="card__text">
              <p className="card__text-temp">{city.temperature}°C</p>
              <p className="card__text-descr">{weather.description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
