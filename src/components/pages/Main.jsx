import React, { useEffect, useState } from 'react';
import { load } from '@2gis/mapgl';
import LiComponentNumber from '../ui/LiComponentNumber';

export default function Main({ numbersArr, setNumbersArr }) {
  useEffect(() => {
    fetch('/api/v1/numbers')
      .then((res) => res.json())
      .then((data) => setNumbersArr(data));
  }, []);
  return (
    <div>
      <h2>Все компании</h2>
      {numbersArr[0] ? (
        <ul className="list-group">
          {numbersArr?.map((el) => (
            <li className="list-group-item" key={el.id}>
              <LiComponentNumber el={el} />
            </li>
          ))}
        </ul>
      ) : (
        <div> Номеров пока нет </div>
      )}
    </div>
  );
}
