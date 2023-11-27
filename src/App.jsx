import React, { useState } from "react";
import "./App.css";

function App() {
  const gstRateArr = [0.25, 3, 12, 18, 28];
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);
  const [selectedGstRate, setSelectedGstRate] = useState(gstRateArr[0]);

  const calculateValue = () => {
    if (!value || isNaN(value)) {
      alert("Please enter a valid numeric value.");
      return;
    }
    // const cgstValue = Number((value * 9) / 100).toFixed(2);
    // const sgstValue = Number((value * 9) / 100).toFixed(2);
    const gstValue = Number((value * selectedGstRate) / 100).toFixed(2);

    const finalAmount = Number(gstValue) + Number(value);
    setResult(finalAmount.toFixed(2));
  };

  const handleRadioChange = (event) => {
    setSelectedGstRate(parseFloat(event.target.value));
  };
  const cgstValue = (selectedGstRate / 2).toFixed(2);

  return (
    <section className="baseContainer">
      <div className="headerBase">
        <h1>GST Calculator</h1>
      </div>
      <div className="radioButton">
        <h2 className="rateHead">Please select GST Rate :</h2>
        {gstRateArr.map((rate) => (
          <label key={rate} className="rateValue">
            <input
              type="radio"
              value={rate}
              checked={selectedGstRate === rate}
              onChange={handleRadioChange}
            />
            {`${rate}%`}
          </label>
        ))}
      </div>
      <div className="amountContainer">
        <input
          placeholder="Amount"
          value={value}
          type="number"
          onChange={(e) => setValue(e.target.value)}
          className="inputField"
        />
        <button type="button" onClick={calculateValue}>
          Submit
        </button>
      </div>
      <div>
        {result !== null && (
          <div className="resultContainer">
            <h4>Final amount: &#x20B9;{result}</h4>
            <i className="infoLabel">
              Including : {`${cgstValue}%`} of CGST and {`${cgstValue}%`} of
              SGST
            </i>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
