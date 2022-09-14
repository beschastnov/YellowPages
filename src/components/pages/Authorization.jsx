import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Authorization({ session, setSession }) {
  const navigate = useNavigate();
  const [input, setInput] = useState({ login: '', password: '' });
  const [checkAuth, setCheckAuth] = useState(true);
  const inputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const responce = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    if (responce.ok) {
      const data = await responce.json();
      setSession(data);
      navigate('/');
    } else {
      setCheckAuth(false);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="w-50 p-3">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Login
            <input onChange={inputHandler} name="login" value={input.login} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
            <input onChange={inputHandler} name="password" value={input.password} type="password" className="form-control" id="exampleInputPassword1" />
            {!checkAuth && (
            <div style={{ color: 'red' }}>
              Check entered data
            </div>
            )}
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Отправить</button>
      </form>
    </div>
  );
}
