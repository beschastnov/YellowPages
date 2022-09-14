import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registration({ session, setSession }) {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    login: '',
    password: '',

  });
  const inputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const responce = await fetch('/auth/registration', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (responce.ok) {
      const data = await responce.json();
      setSession(data);
      navigate('/');
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler} className="w-50 p-3">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
            <input onChange={inputHandler} name="name" type="text" value={input.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            login
            <input onChange={inputHandler} name="login" type="text" value={input.login} className="form-control" id="exampleInputPassword1" />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
            <input onChange={inputHandler} name="password" type="password" value={input.password} className="form-control" id="exampleInputPassword1" />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Отправить</button>
      </form>
    </div>
  );
}
