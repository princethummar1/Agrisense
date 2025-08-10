import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import Translator from '../util/Translator';
import Grow from '../components/Grow'
import Ideal from '../components/Ideal'
import { FaBorderStyle } from 'react-icons/fa';
const language = Cookies.get("language");
import toast, { Toaster } from 'react-hot-toast';
import url from '../url';
import axios from "axios";
const id = Cookies.get("id");


const NewCropCard = ({ crops }) => {
  const { t } = useTranslation();
  const [selectedCrop, setSelectedCrop] = useState(crops[0].name);
  const [translatedTexts, setTranslatedTexts] = useState([]);
  const [hasTranslated, setHasTranslated] = useState(false);
  const [showGrow, setShowGrow] = useState(false);
  const [showIdeal, setShowIdeal] = useState(false);
  const [cropForGrow, setCropForGrow] = useState(null);
  const [cropForIdeal, setCropForIdeal] = useState(null);
  const [fetchedFormData, setFetchedFormData] = useState({});

  const fetchFormData = async () => {
    try {
      const response = await axios.post(`${url}/datafetch`, { id }); // Adjust the URL according to your backend
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
    fetchFormData(); // Fetch data when the component mounts
  }, []);
  
  // Extract texts to translate from the crops array
  const textsToTranslate = crops.flatMap(crop => [crop.description]);

  const handleTranslations = (translations) => {
    setTranslatedTexts(translations);
    setHasTranslated(true); // Set to true after successful translation
  };

  const handleChange = (event) => {
    setSelectedCrop(event.target.value);
  };

  const handleGrowClick = () => {
    setCropForGrow(selectedCrop);
    setShowGrow(true);
  };
  const handleIdealClick = () => {
    setCropForIdeal(selectedCrop);
    setShowIdeal(true);
  };


  return (
    <div>
    <div id="scene" style={styles.scene}>
      <div id="left-zone" style={styles.leftZone}>
        <ul className="list" style={styles.list}>
          <h6 style={{ paddingLeft: 40, marginBottom: 30, fontSize: 20 }}>{t('HTop5')}</h6>
          {hasTranslated ? (
            crops.map((c, index) => (
              <li className="item" key={index} style={{
                ...styles.item,
                transition: 'opacity 0.75s ease-out, top 0.75s ease-out',
              }}>
                <input
                  type="radio"
                  id={`radio_${c.name}`}
                  name="basic_carousel"
                  value={c.name}
                  checked={selectedCrop === c.name}
                  onChange={handleChange}
                  style={styles.input}
                />
                <label
                  htmlFor={`radio_${c.name}`}
                  className={`label_${c.name}`}
                  style={{
                    ...styles.label,
                    opacity: selectedCrop === c.name ? 1 : 0.3,
                    textDecoration: selectedCrop === c.name ? 'underline' : '',
                  }}
                >
                  <img
                    src={`${index + 1}.svg`}
                    style={styles.svgIcon}
                  />
                  {/* Use translated text if available, otherwise use original */}
                  {t(c.name)}
                </label>
                <div
                  className={`content content_${c.name} ${selectedCrop === c.name ? 'active' : ''}`}
                  style={{
                    ...styles.content,
                    opacity: selectedCrop === c.name ? 1 : 0,
                  }}
                >
                  <span
                    className="picto"
                    style={{
                      ...styles.picto,
                      backgroundImage: `url(${c.image})`,
                    }}
                  ></span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px' }}>
                  <button 
                      style={styles.growButton}
                      onClick={() => handleGrowClick()}
                    >
                      {t("HowGrow")}?
                    </button>
                  <h1 style={{textAlign:'center'}}>{t(c.name)}</h1>
                  <button 
                      style={styles.growButton}
                      onClick={() => handleIdealClick()}
                    >
                      {t("IButton")}
                    </button>
                  </div>
                  <h5 style={{textAlign:'center'}}>{translatedTexts[index * 1] || c.description}</h5>
                </div>
              </li>
            ))
          ) : (
            <Translator 
              textsToTranslate={textsToTranslate} 
              targetLang={language} 
              onTranslated={handleTranslations} 
            />
          )}
        </ul>
      </div>
      <div id="middle-border" style={styles.middleBorder}></div>
      <div id="right-zone" style={styles.rightZone}></div>
    </div>
    {showGrow && <Grow cropName={cropForGrow}/>}
    {showIdeal && <Ideal cropName={cropForIdeal} soilConditions={fetchedFormData} />}
    </div>
  );
};

const styles = {
  scene: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    width: '1000px',
    height: '400px',
    position: 'relative',
    margin: 'auto',
    backgroundColor: '#e6f0f8', // Light professional background
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  leftZone: {
    backgroundColor: '#f0f8ff',
    height: '100%',
    display: 'flex',
    width: '300px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: '30px',
    paddingLeft: '20px',
    borderRight: '2px solid #d0e6f7',
  },
  list: {
    display: 'flex',
    listStyle: 'none',
    flexDirection: 'column',
    flexGrow: 1,
    margin: 0,
    padding: 0,
  },
  item: {},
  input: {
    display: 'none',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    color: '#333',
    height: '50px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    paddingLeft: '10px',
    borderRadius: '6px',
  },
  svgIcon: {
    width: '30px',
    height: '30px',
    marginRight: '15px',
  },
  content: {
    position: 'absolute',
    left: '300px',
    top: '0px',
    width: '700px',
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    transition: 'all 0.25s ease-out',
    padding: '30px',
    backgroundColor: '#ffffff',
  },
  picto: {
    height: '250px',
    width: '250px',
    borderRadius: '50%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    marginBottom: '20px',
  },
  growButton: {
    margin: '5px',
    padding: '8px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: '2px solid #3b82f6',
    backgroundColor: '#ffffff',
    color: '#3b82f6',
    borderRadius: '6px',
    transition: 'all 0.3s ease-in-out',
  },
  middleBorder: {
    backgroundColor: '#d0e6f7',
    width: '2px',
    height: '80%',
    opacity: 0.5,
  },
  rightZone: {
    backgroundColor: '#f9fbfc',
    height: '100%',
    flexGrow: 3,
  },
};


export default NewCropCard;
