# AgriSense 🌾
> **AI-Powered Crop Recommendation & Soil Health Monitoring System**

AgriSense is a smart agricultural platform that leverages **Machine Learning** to help farmers make data-driven decisions. It combines a secure **MERN Stack** web application with a **Flask-based AI engine** to recommend the best crops based on specific soil parameters (N, P, K, pH).

## 🚀 Key Features
* **🌱 AI Crop Recommendation:** Accurately suggests crops using an ensembled Machine Learning model hosted on Flask.
* **💬 Community Forum:** A dedicated space for farmers to share knowledge and ask questions.
* **🔒 Secure Authentication:** Fully secured user accounts using **Bcrypt** (encryption) and **JWT** (session management).
* **📱 Responsive Design:** Built with React.js for a seamless experience on mobile and desktop.
* **⚡ RESTful APIs:** Efficient communication between the React frontend, Node backend, and Python ML engine.

## 🛠️ Tech Stack
| Component | Technologies |
| :--- | :--- |
| **Frontend** | React.js, CSS/Tailwind |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **AI / ML** | Python, Flask, Scikit-learn, Pandas |
| **Security** | JWT, Bcrypt |

## 📂 Project Structure
The codebase is organized into three distinct micro-services:

* **`/client`** → React.js Frontend (User Interface).
* **`/server`** → Node/Express Backend (API, Auth, & Database logic).
* **`/ml`** → Python/Flask Server (Loads the trained model & handles predictions).

## 📸 Screenshots
| Dashboard | Prediction UI | Forum |
| :---: | :---: | :---: |
| ![Dash](assets/Screenshot1.png) | ![Pred](assets/Screenshot2.png) | ![Forum](assets/Screenshot3.png) |

*(Add more screenshots as needed)*

---
Made with ❤️ by [Prince Thummar](https://github.com/princethummar1)
