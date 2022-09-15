import React, { useState } from 'react';

export default function Add({
  numbersArr, setNumbersArr, myNumbers, setMyNumbers,
}) {
  const [input, setInput] = useState({ name: '', phone: '', place: '' });
  const [error, setError] = useState(true);
  const inputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const responce = fetch('/api/v1/number', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((data) => setNumbersArr((prev) => [...prev, data]))
      .then(setInput({ name: '', phone: '', place: '' }));
    if (responce.status !== 200) {
      setError(false);
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler} className="w-50 p-3">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Company name
            <input onChange={inputHandler} name="name" value={input.name} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Phone number
            <input onChange={inputHandler} name="phone" value={input.phone} type="text" className="form-control" id="exampleInputPassword1" />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Place
            <input onChange={inputHandler} name="place" value={input.place} type="text" className="form-control" id="exampleInputPassword1" />
            {!error && (
            <div style={{ color: 'red' }}>
              Данные введены некорректно
            </div>
            )}
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Отправить</button>
      </form>
    </div>
  );
}
