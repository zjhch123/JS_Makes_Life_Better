import React from 'react'
import './HomeLayout.css'
import { Link } from 'react-router-dom'
export default ({
  title = '', 
  children
}) => (
  <div className="app">
    <header className="header">App</header>
    <main className="main">
      <aside className="aside">
        <ul>
          <li>
            <Link to="/">主页</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
          <li>页面2</li>
          <li>页面3</li>
        </ul>
      </aside>
      <div className="container">
        { children }
      </div>
    </main>
    <footer className="footer">zjh</footer>
  </div>

)