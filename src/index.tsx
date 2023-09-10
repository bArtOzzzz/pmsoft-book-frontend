import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import HomePage from './Components/HomePage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeContent from './Components/HomeContent';
import BookPage from './Components/BookPage';
import LoginPage from './Components/LoginPage';
import CreateBookPage from './Components/CreateBookPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<HomePage />}>
          <Route path='home' element={<HomeContent />} />
          <Route path='book/*' element={<BookPage />} />
          <Route path='book/create' element={<CreateBookPage />} />  
          <Route path='login' element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
