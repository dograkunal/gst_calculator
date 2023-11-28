import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const gstRateArr = [0.25, 3, 12, 18, 28];
  const saleType = ["Local Sale", "Inter-State Sale"];

  const [value, setValue] = useState("");
  const [selectedGstRate, setSelectedGstRate] = useState(gstRateArr[0]);
  const [selectedSaleType, setselectedSaleType] = useState(saleType[0]);
  const [originalAmount, setOriginalAmount] = useState(null);
  const [gstAmount, setGstAmount] = useState(null);
  const [roundoff, setRoundOff] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const roundOffWithSign = (original, gst, totalSale) => {
    const calculatedTotal = Number(original) + Number(parseFloat(gst));
    const roundOffAmount = totalSale - calculatedTotal;

    return {
      roundedAmount: calculatedTotal.toFixed(2),
      sign: roundOffAmount >= 0 ? "+" : "-",
      difference: Math.abs(roundOffAmount).toFixed(2),
    };
  };

  useEffect(() => {
    if (submitted) {
      const original = Number(value / (1 + selectedGstRate / 100)).toFixed(2);
      setOriginalAmount(original);

      const gst = (original * (selectedGstRate / 100)).toFixed(2);
      setGstAmount(gst);

      const roundOffResult = roundOffWithSign(original, gst, value);
      setRoundOff(roundOffResult);
    }
  }, [submitted, value, selectedGstRate]);

  const calculateValue = () => {
    if (!value || isNaN(value)) {
      alert("Please enter a valid numeric value.");
      return;
    }

    // setOriginalAmount(null);
    // setGstAmount(null);
    // setRoundOff({});
    setSubmitted(true);
  };

  const handleRadioChange = (event) => {
    setSelectedGstRate(parseFloat(event.target.value));
  };

  const handleTypeChange = (event) => {
    setselectedSaleType(event.target.value);
  };

  console.log(roundoff, "roundoff");

  const cgstPercentage = (selectedGstRate / 2).toFixed(2);
  const cgstAmount = (gstAmount / 2).toFixed(2);

  return (
    <section className="baseContainer">
      <div className="headerBase">
        <h1>GST Sale Calculator</h1>
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
      <div className="radioButton">
        <h2 className="rateHead">Please select sale Type :</h2>
        {saleType.map((el) => (
          <label key={el} className="rateValue">
            <input
              type="radio"
              value={el}
              checked={selectedSaleType === el}
              onChange={handleTypeChange}
            />
            {`${el}`}
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
      {submitted && (
        <div className="resultContainer">
          <h3>Sale amount: &#x20B9;{value}</h3>
          <h3>Taxable Value: &#x20B9;{originalAmount}</h3>
          <div className="taxDetailContainer">
            <i className="taxLabel">Total GST: {`${gstAmount}`}</i>
            <i className="infoLabel">
              CGST: {`@ ${cgstPercentage}% on`}{" "}
              {selectedSaleType === saleType[0] ? `${cgstAmount}` : "NIL"}
            </i>
            <i className="infoLabel">
              SGST: {`@ ${cgstPercentage}% on`}{" "}
              {selectedSaleType === saleType[0] ? `${cgstAmount}` : "NIL"}
            </i>
            <i className="infoLabel">
              IGST: {`@ ${selectedGstRate}% on`}{" "}
              {selectedSaleType === saleType[1] ? `${gstAmount}` : "NIL"}
            </i>
            <p>RoundOff: {`${roundoff.sign} ${roundoff.difference}`} </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default App;
