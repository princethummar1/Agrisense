const https = require("https");

const getGrowingSuggestion = (cropName, lang) => {
  const options = {
    method: "POST",
    hostname: "chatgpt-42.p.rapidapi.com",
    path: "/chatgpt",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": "e65ba8a9c6msh82e1b3099e3dd9bp18115cjsna3ec86e0cbba",
      "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
    },
  };

  const payload = JSON.stringify({
    messages: [{ role: "user", content: `How to grow ${cropName} in ${lang} language ?` }],
    web_access: false,
  });

  const req = https.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log("Response:", JSON.parse(data));
    });
  });

  req.on("error", (e) => {
    console.error("Error:", e.message);
  });

  req.write(payload);
  req.end();
};

// Example usage:
const cropName = "tomato"; // Replace with any crop name you want to input
getGrowingSuggestion(cropName);