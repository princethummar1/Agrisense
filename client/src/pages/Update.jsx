import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../assets/Button.css";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import url from '../url';
import LanguageSelector from '../components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import './Update.css'; // Create this file for additional custom styles

const id = Cookies.get("id");
const lang = Cookies.get('language');

const Update = () => {
  const [reloadPage, setReloadPage] = useState(false);
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(lang);
  const { t } = useTranslation();
  const [fetchedFormData, setFetchedFormData] = useState({});

  useEffect(() => {
    if (!id && !reloadPage) {
      setReloadPage(true);
      window.location.reload();
    }
  }, [id, reloadPage]);

  useEffect(() => {
    const handleLanguageChange = () => {
      const newLanguage = Cookies.get('language') || 'en';
      setSelectedLanguage(newLanguage);
      i18n.changeLanguage(newLanguage);
    };

    const interval = setInterval(() => {
      const currentLanguage = Cookies.get('language');
      if (currentLanguage !== selectedLanguage) {
        handleLanguageChange();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [selectedLanguage]);

  const fetchFormData = async () => {
    try {
      const response = await axios.post(`${url}/datafetch`, { id });
      if (response.data.status) {
        setFetchedFormData(response.data);
      } else {
        toast.error("No data found for the provided ID.");
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
      toast.error("Error fetching form data.");
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  const [formData, setFormData] = useState({
    id: id,
    Nitrogen: fetchedFormData.Nitrogen || "",
    Phosphorus: fetchedFormData.Phosphorus || "",
    Potassium: fetchedFormData.Potassium || "",
    Temperature: fetchedFormData.Temperature || "",
    Humidity: fetchedFormData.Humidity || "",
    pH: fetchedFormData.pH || "",
    Rainfall: fetchedFormData.Rainfall || "",
  });

  useEffect(() => {
    if (Object.keys(fetchedFormData).length > 0) {
      setFormData({
        id: id,
        Nitrogen: fetchedFormData.Nitrogen || "",
        Phosphorus: fetchedFormData.Phosphorus || "",
        Potassium: fetchedFormData.Potassium || "",
        Temperature: fetchedFormData.Temperature || "",
        Humidity: fetchedFormData.Humidity || "",
        pH: fetchedFormData.pH || "",
        Rainfall: fetchedFormData.Rainfall || "",
      });
    }
  }, [fetchedFormData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/datatoml`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const predictdata = await response.json();

      const datatoapi = await fetch(`${url}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const detailsdata = await datatoapi.json();

      toast.success(detailsdata.message, {
        onClose: setTimeout(function () { navigate("/"); }, 1500)
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container fluid className="update-container py-4">
      <Row className="justify-content-center">
        <Col lg={8} xl={6}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-4 p-md-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Card.Title className="mb-0">
                  <h3 className="fw-bold text-primary">
                    {t('URecomSystem')}{" "}
                    <span role="img" aria-label="plant">🌱</span>
                  </h3>
                </Card.Title>
                <LanguageSelector 
                  selectedLanguage={selectedLanguage} 
                  setSelectedLanguage={setSelectedLanguage} 
                  className="ms-3"
                />
              </div>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('Nitrogen')}</Form.Label>
                      <Form.Control
                        type="number"
                        id="Nitrogen"
                        name="Nitrogen"
                        placeholder={t('Enter Nitrogen')}
                        value={formData.Nitrogen}
                        onChange={handleChange}
                        min="0"
                        max="150"
                        required
                        className="form-control-lg"
                      />
                      <Form.Text className="text-muted">
                        {t('Range')}: 0 - 150
                      </Form.Text>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('Phosphorus')}</Form.Label>
                      <Form.Control
                        type="number"
                        id="Phosphorus"
                        name="Phosphorus"
                        placeholder={t('Enter Phosphorus')}
                        value={formData.Phosphorus}
                        onChange={handleChange}
                        min="0"
                        max="150"
                        required
                        className="form-control-lg"
                      />
                      <Form.Text className="text-muted">
                        {t('Range')}: 0 - 150
                      </Form.Text>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('Potassium')}</Form.Label>
                      <Form.Control
                        type="number"
                        id="Potassium"
                        name="Potassium"
                        placeholder={t('Enter Potassium')}
                        value={formData.Potassium}
                        onChange={handleChange}
                        min="0"
                        max="250"
                        required
                        className="form-control-lg"
                      />
                      <Form.Text className="text-muted">
                        {t('Range')}: 0 - 250
                      </Form.Text>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('Temperature')}</Form.Label>
                      <Form.Control
                        type="number"
                        id="Temperature"
                        name="Temperature"
                        placeholder={t('Enter Temperature')}
                        value={formData.Temperature}
                        onChange={handleChange}
                        min="0"
                        max="50"
                        required
                        className="form-control-lg"
                      />
                      <Form.Text className="text-muted">
                        {t('Range')}: 0 - 50 °C
                      </Form.Text>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('Humidity')}</Form.Label>
                      <Form.Control
                        type="number"
                        id="Humidity"
                        name="Humidity"
                        placeholder={t('Enter Humidity')}
                        value={formData.Humidity}
                        onChange={handleChange}
                        min="10"
                        max="100"
                        required
                        className="form-control-lg"
                      />
                      <Form.Text className="text-muted">
                        {t('Range')}: 10 - 100%
                      </Form.Text>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('pH')}</Form.Label>
                      <Form.Control
                        type="number"
                        id="pH"
                        name="pH"
                        placeholder={t('Enter pH')}
                        value={formData.pH}
                        onChange={handleChange}
                        min="2"
                        max="10"
                        required
                        className="form-control-lg"
                      />
                      <Form.Text className="text-muted">
                        {t('Range')}: 2 - 10
                      </Form.Text>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('Rainfall')}</Form.Label>
                      <Form.Control
                        type="number"
                        id="Rainfall"
                        name="Rainfall"
                        placeholder={t('Enter Rainfall')}
                        value={formData.Rainfall}
                        onChange={handleChange}
                        min="15"
                        max="300"
                        required
                        className="form-control-lg"
                      />
                      <Form.Text className="text-muted">
                        {t('Range')}: 15 - 300 mm
                      </Form.Text>
                    </Form.Group>
                  </Col>

                  <Col md={12} className="mt-4">
                    <button type="submit" className="btn-hover color-1 w-100 py-3">
                      {t('UButton')}
                    </button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Toaster position="top-center" />
    </Container>
  );
};

export default Update;