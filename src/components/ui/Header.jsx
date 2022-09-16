import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ session, setSession }) {
  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    e.preventDefault();
    const responce = await fetch('/auth/logout');
    if (responce.ok) {
      navigate('/');
      setSession(null);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Yellow
          <em style={{ color: '#FFD700' }}>Pages</em>
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            {!session
              ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/registration">Registration</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/authorization">Authorization</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/add">Add company</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/mynumbers">My numbers</Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={logoutHandler} className="nav-link" to="/">Logout</Link>
                  </li>
                </>
              )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
