import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add';
import Authorization from './pages/Authorization';
import Edit from './pages/Edit';
import Main from './pages/Main';
import MyNumbers from './pages/MyNumbers';
import Registration from './pages/Registration';
import Header from './ui/Header';

export default function App({ userSession, allNumbers }) {
  const [session, setSession] = useState(userSession || null);
  const [numbersArr, setNumbersArr] = useState(allNumbers || []);
  const [myNumbers, setMyNumbers] = useState([]);
  const deleteHandler = async (id) => {
    const response = await fetch(`/api/v1/number/${id}`, { method: 'delete' });
    if (response.ok) {
      setMyNumbers((prev) => prev.filter((el) => el.id !== id));
      setNumbersArr((prev) => prev.filter((el) => el.id !== id));
    }
  };
  return (
    <div>
      <Header session={session} setSession={setSession} />
      <Routes>
        <Route path="/" element={<Main session={session} setSession={setSession} numbersArr={numbersArr} setNumbersArr={setNumbersArr} />} />
        <Route path="/add" element={<Add myNumbers={myNumbers} setMyNumbers={setMyNumbers} session={session} setSession={setSession} numbersArr={numbersArr} setNumbersArr={setNumbersArr} />} />
        <Route path="/registration" element={<Registration session={session} setSession={setSession} />} />
        <Route path="/authorization" element={<Authorization session={session} setSession={setSession} />} />
        <Route path="/mynumbers" element={<MyNumbers deleteHandler={deleteHandler} myNumbers={myNumbers} setMyNumbers={setMyNumbers} session={session} setSession={setSession} />} />
        <Route path="/number/:id/edit" element={<Edit session={session} setSession={setSession} />} />
      </Routes>
    </div>
  );
}
