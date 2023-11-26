import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Routes, Route, Link, BrowserRouter, createBrowserRouter, RouterProvider,} from 'react-router-dom';
import EndPage from './endPage/EndPage';
import Room2 from './room2/Room2'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "end",
    element: <EndPage/>
  },  
  {
    path: 'room2',
    element: <Room2/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
