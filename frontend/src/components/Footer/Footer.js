import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <ul className="footer__nav-list">
        <li className="footer__nav-item">
          <Link className="footer__nav-link" to="/">О МурМур</Link>
        </li>
        <li className="footer__nav-item">
          <Link className="footer__nav-link" to="/">Правила</Link>
        </li>
        <li className="footer__nav-item">
          <Link className="footer__nav-link" to="/">Для бизнеса</Link>
        </li>
        <li className="footer__nav-item">
          <Link className="footer__nav-link" to="/">Разработчикам</Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
