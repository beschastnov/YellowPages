import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Main({ numbersArr, setNumbersArr }) {
  useEffect(() => {
    fetch('/api/v1/numbers')
      .then((res) => res.json())
      .then((data) => setNumbersArr(data));
  }, []);
  return (
    <div>
      <h2>Все номера</h2>
      {numbersArr[0] ? (
        <ul className="list-group">
          {numbersArr?.map((el) => (
            <li className="list-group-item" key={el.id}>
              <b>Кампания:</b>
              {el.company}
              <p />
              <b>Номер телефона:</b>
              {el.phone}
              
              <p />
              <Link to={`more/${el.id}`}>Подробнее</Link>
            </li>
          ))}
        </ul>
      ) : (
        <div> Номеров пока нет </div>
      )}
    </div>
  );
}
