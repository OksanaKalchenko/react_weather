import { useState } from "react";

export default function CitySearch({ onAddCity }) {
  const [city, setCity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!city.trim()) {
      return;
    }
    onAddCity(city);
    setCity("");
  }
  return (
    <form className="search__form" onSubmit={handleSubmit}>
      <input
        className="search__input"
        type="text"
        placeholder="Введите название города..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="search__btn">+ Добавить</button>
    </form>
  );
}
