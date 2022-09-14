import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MyNumbers({
  myNumbers, setMyNumbers, deleteHandler,
}) {
  useEffect(() => {
    fetch('/api/v1/mynumbers')
      .then((res) => res.json())
      .then((data) => setMyNumbers(data));
  }, []);
  return (
    <div>
      <h2>Ваши номера</h2>
      <ul className="list-group">
        {myNumbers?.map((el) => (
          <li className="list-group-item" key={el.id}>
            <b>Кампания:</b>
            {el.company}
            <p />
            <b>Номер телефона:</b>
            {el.phone}
            <p />
            <button onClick={() => deleteHandler(el.id)} type="button" className="btn btn-danger">Удалить</button>
            <Link to={`/number/${el.id}/edit`}><button type="button" className="btn btn-primary">Изменить</button></Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
