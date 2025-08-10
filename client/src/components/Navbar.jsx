import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { MdExitToApp } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import '../util/config';
import url from '../url';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies();
  const { t } = useTranslation();

  const Logout = () => {
    removeCookie("token");
    removeCookie("language");
    window.config.resetId();
    window.config.resetName();
    Cookies.remove('id');
    Cookies.remove('token');
    Cookies.remove('language');
    Cookies.remove('username');
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{
        margin: "12px 16px",
        backgroundColor: "#f5f9ff",
        borderRadius: "12px",
        padding: "12px 20px",
        border: "1px solid #dbe7f3"
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a
          className="navbar-brand fw-bold fs-4"
          href="/Landing"
          style={{ color: "#1e3a5f", letterSpacing: "0.5px" }}
        >
          AgriSense
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-2">
            <li className="nav-item">
              <a className="nav-link fw-semibold text-dark" href="/">
                {t('NHome')}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold text-dark" href="/update">
                {t('NUpdate')}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold text-dark" href="/forum">
                {t('NForum')}
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <button
              onClick={Logout}
              className="btn d-flex align-items-center gap-2"
              style={{
                backgroundColor: "#407BFF",
                color: "white",
                fontWeight: "600",
                padding: "8px 14px",
                borderRadius: "6px",
                border: "none",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#305fcf")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#407BFF")}
            >
              <MdExitToApp size={18} />
              {t('NLogout')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
