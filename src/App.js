import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'animate.css'; 
import './CurrencyConverter.css'; // Import the custom CSS file

const CurrencyConverter = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [sourceCurrency, setSourceCurrency] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [showConvertedAmount, setShowConvertedAmount] = useState(false);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual API key
    const API_KEY = "fc5e03d8cd8b4474826e0546c32a9f32";
    const API_URL = `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`;

    axios.get(API_URL)
      .then((response) => {
        setExchangeRates(response.data.rates);
        setSourceCurrency(Object.keys(response.data.rates)[0]);
        setTargetCurrency(Object.keys(response.data.rates)[1]);
      })
      .catch((error) => {
        console.error('Error fetching exchange rates:', error);
      });
  }, []);

  const handleConvert = () => {
    if (exchangeRates[sourceCurrency] && exchangeRates[targetCurrency]) {
      const conversionRate = exchangeRates[targetCurrency] / exchangeRates[sourceCurrency];
      setConvertedAmount(amount * conversionRate);
      setShowConvertedAmount(true);
    }
  };

  return (
    <div className="container mt-5">   
      <h1 className="mb-4">Currency Converter</h1>
      <div className="form-group">
        <label>Amount:</label>
        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>From:</label>
        <select
          className="form-control"
          value={sourceCurrency}
          onChange={(e) => setSourceCurrency(e.target.value)}
        >
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>To:</label>
        <select
          className="form-control"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
        >
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div className="button-container">
      <button className="btn btn-primary" onClick={handleConvert}>Convert</button>
      </div>
      <div className="mt-3">
        {showConvertedAmount && (
          <div className="converted-amount flip">
            <p>Converted Amount: {convertedAmount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
