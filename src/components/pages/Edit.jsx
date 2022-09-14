import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Edit({
  session, setSession, numbersArr, setNumbersArr,
}) {
  const { id } = useParams();
  const [editNumber, setEditNumber] = useState({ company: '', phone: '' });
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`/api/v1/number/${id}`)
      .then((res) => res.json())
      .then((data) => setEditNumber({ company: data.company, phone: data.phone }));
  }, []);

  const changeNumber = (e) => {
    setEditNumber((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const editNumberSub = (e) => {
    e.preventDefault();
    fetch(`/api/v1/number/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(editNumber),
    })
      .then(() => navigate('/'));
  };
  return (
    <div>
      <form onSubmit={editNumberSub} className="w-50 p-3">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Company name
            <input name="company" value={editNumber.company || ''} type="text" onChange={changeNumber} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Phone number
            <input name="phone" value={editNumber.phone || ''} type="text" onChange={changeNumber} className="form-control" id="exampleInputPassword1" />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Отправить</button>
      </form>
    </div>
  );
}
