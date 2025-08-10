import React, { useEffect, useState } from 'react';
import "../assets/Button.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import axios from "axios";
import { useCookies } from "react-cookie";
import url from '../url';

const Landing = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies();
  const [username, setUsername] = useState("");
  const [iid, setIid] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) return;

      const tok = cookies.token;

      const { data } = await axios.post(
        `${url}`,
        { tok },
        { withCredentials: true }
      );
      const { status, user, id, language } = data;

      setUsername(user);
      setIid(id);
      window.config.id = id;
      window.config.name = user;
      Cookies.set('id', id);
      Cookies.set('language', language);
      Cookies.set('languageName', language);
      Cookies.set('username', user);

      if (!status) {
        removeCookie("token");
        window.config.resetId();
        window.config.resetName();
        Cookies.remove('id');
        navigate("/login");
      }
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Start = () => {
    navigate("/update");
  };

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <h1 style={styles.title}>Agrisense</h1>
        <h2 style={styles.subtitle}>{t('LSlogan')}</h2>
        
        <button className="btnu-hover" style={styles.button} onClick={Start}>
          {t('LButton')}
        </button>
      </div>
      <div style={styles.right}>
        <img src="slider-dec.gif" alt="Crop" style={styles.image} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f4fa',
    padding: '80px 100px',
    height: '100vh',
    boxSizing: 'border-box',
  },
  left: {
    flex: 1,
    paddingRight: '50px',
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: '4rem',
    color: '#2b2d42',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '2rem',
    color: '#8d99ae',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.2rem',
    color: '#444',
    marginBottom: '30px',
    maxWidth: '550px',
  },
  button: {
    padding: '12px 28px',
    fontSize: '1.1rem',
    backgroundColor: '#2b2d42',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
  },
  image: {
    width: '500px',
    height: 'auto',
  }
};

export default Landing;
