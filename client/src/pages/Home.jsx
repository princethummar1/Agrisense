import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from 'js-cookie';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NewCropCard from '../components/NewCropCard';
import TopCropCard from '../components/TopCropCard';
import RestCropCards from '../components/RestCropCards';
import '../util/config';
import getCropDetails from "../util/CropDetails";
import { FaInstagram, FaTwitter, FaLinkedin, FaLeaf } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import url from '../url';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies();
  const [username, setUsername] = useState("");
  const [iid, setIid] = useState('');
  const { t } = useTranslation();
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        // navigate("/login");
      }
      const tok = cookies.token;

      try {
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
      } catch (error) {
        toast.error("Error verifying session");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  useEffect(() => {
    const fetchCrops = async () => {
      if (window.config.id) {
        try {
          setLoading(true);
          const response = await axios.post(`${url}/Cropfetch`, { id: window.config.id });
          const { Crop1, Crop2, Crop3, Crop4, Crop5 } = response.data;
          const cropNames = [Crop1, Crop2, Crop3, Crop4, Crop5];
          const cropDetailsArray = [];

          for (const cropName of cropNames) {
            const cropDetails = getCropDetails(cropName);
            cropDetailsArray.push(cropDetails);
          }

          setCrops(cropDetailsArray);
        } catch (error) {
          toast.error("Error fetching crop recommendations");
          console.error('Error fetching crops:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCrops();
  }, [window.config.id]);

  return (
    <div className="home-page">
      {/* Navigation Bar */}

      {/* Main Content */}
      <main className="main-content">
        <Container>
          {/* Hero Section */}
          <section className="py-4 hero-section">
            <Row className="align-items-center">
              <Col lg={6} className="mb-4 mb-lg-0">
                <h1 className="mb-3 display-5 fw-bold">Smart Crop Recommendations</h1>
                <p className="mb-4 text-muted">
                  Get personalized crop suggestions based on your soil conditions and climate factors.
                </p>
                <div className="gap-3 d-flex">
                  <Button variant="primary" size="lg" onClick={() => navigate("/update")}>
                    Update Soil Data
                  </Button>
                  <Button variant="outline-primary" size="lg" onClick={() => navigate("/about")}>
                    Learn More
                  </Button>
                </div>
              </Col>
              <Col lg={6}>
                <div className="hero-image-container">
                  <div className="hero-image"></div>
                </div>
              </Col>
            </Row>
          </section>

          {/* Crop Recommendations Section */}
          <section className="py-4 crop-recommendations">
            <Row className="mb-3">
              <Col>
                <h2 className="section-title">
                  <span className="section-title-text">Your Recommended Crops</span>
                </h2>
              </Col>
            </Row>

            {loading ? (
              <div className="py-4 text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Analyzing your soil data...</p>
              </div>
            ) : crops.length > 0 ? (
              <>
                <Row className="g-3">
                  <Col lg={12}>
                    <NewCropCard crop={crops[0]} crops={crops} />
                  </Col>
                  {/* Uncomment when ready */}
                  {/* <Col lg={12}>
                    <TopCropCard crop={crops[0]} />
                  </Col>
                  <Col lg={12}>
                    <RestCropCards crops={crops} />
                  </Col> */}
                </Row>
              </>
            ) : (
              <Card className="shadow-sm no-crops-card">
                <Card.Body className="py-4 text-center">
                  <div className="mb-3 no-crops-icon">
                    <FaLeaf size={40} className="text-primary" />
                  </div>
                  <h3 className="mb-2">No Crop Recommendations Yet</h3>
                  <p className="mb-3 text-muted">
                    We need your soil data to provide personalized crop suggestions.
                  </p>
                  <Button variant="primary" size="lg" onClick={() => navigate("/update")}>
                    Submit Soil Data
                  </Button>
                </Card.Body>
              </Card>
            )}
          </section>
        </Container>
      </main>

      {/* Compact Footer */}
      <footer className="pt-0 pb-0 footer bg-dark">
        <Container>
          <Row className="g-3">
            <Col md={4} className="mb-3 mb-md-0">
              <div className="mb-2 footer-brand d-flex align-items-center">
                <FaLeaf className="me-2" size={20} />
                <span className="fw-bold">Agrisense</span>
              </div>
              <p className="text-muted small">
                Intelligent crop recommendation system for modern agriculture.
              </p>
              <div className="social-links ">
                <a href="https://www.instagram.com" className="text-dark me-2">
                  <FaInstagram size={16} />
                </a>
                <a href="https://www.twitter.com" className="text-dark me-2">
                  <FaTwitter size={16} />
                </a>
                <a href="https://www.linkedin.com" className="text-dark">
                  <FaLinkedin size={16} />
                </a>
              </div>
            </Col>

            <Col md={2} className="mb-3 mb-md-0">
              <h5 className="mb-2 footer-heading text-dark">Quick Links</h5>
              <ul className="list-unstyled small">
                <li className="mb-1">
                  <Link to="/" className="footer-link ">Home</Link>
                </li>
                <li className="mb-1">
                  <Link to="/about" className="footer-link">About</Link>
                </li>
                <li>
                  <Link to="/update" className="footer-link">Recommendations</Link>
                </li>
              </ul>
            </Col>

            <Col md={3} className="mb-3 mb-md-0">
              <h5 className="mb-2 footer-heading text-dark">Contact</h5>
              <ul className="list-unstyled small">
                <li className="mb-2 d-flex align-items-center">
                  <MdEmail className="me-2" size={16} />
                  <span>contact@agrisense.ag</span>
                </li>
                <li className="d-flex align-items-center">
                  <MdPhone className="me-2" size={16} />
                  <span>+1 (123) 456-7890</span>
                </li>
              </ul>
            </Col>

            <Col md={3}>
              <h5 className="mb-2 footer-heading text-dark">Newsletter</h5>
              <p className="mb-2 text-muted small">
                Subscribe for agricultural insights.
              </p>
              <div className="input-group input-group-sm">
                <input 
                  type="email" 
                  className="form-control form-control-sm" 
                  placeholder="Your email" 
                />
                <button className="btn btn-primary btn-sm" type="button">
                  Subscribe
                </button>
              </div>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <hr className="my-2 border-secondary" />
              <div className="text-center text-muted small">
                <p className="mb-0">
                  &copy; {new Date().getFullYear()} Agrisense. All rights reserved.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Home;