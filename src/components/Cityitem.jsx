import React from 'react';
import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';
import { useCities } from './context/CitiesContext';
const formatDate = (date) => {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
};

export default function CityItem({ city }) {
  const {currentCity,deletecity,isLoading}=useCities();
  const { cityName, emoji, date, id, position } = city;
function handleClick(e){e.preventDefault();deletecity({id});}
  return (
    <li className={`styles.cityListItem ${id===currentCity.id?styles['cityItem--active']:""}`}>
      <Link
        className={styles.cityItem}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
      </Link>
    </li>
  );
}
