import CityCard from "./CityCard";

export default function CityList({ cities, onDeleteCity }) {
  return (
    <div >
      <ul className="card__list">
        {cities.map((city) => (
          <li key={city.id}>
            <CityCard  city={city} onDelete={onDeleteCity}></CityCard>
          </li>
        ))}
      </ul>
      <p className="card__list-paragraph">Автоматическое обновление каждые 5 минут</p>
    </div>
  );
}
