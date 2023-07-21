import React, { useState, useRef, useEffect } from "react";

const CreditCard = ({ onValidationChange }) => {
  const cardNumberInputs = useRef([]);
  const maxCardNumberLength = 16;

  const isValidCardNumber = (cardNumber) => {
    return cardNumber.replace(/\s/g, "").length === maxCardNumberLength;
  };

  const isValidExpiryDate = (expiryDate) => {
    const pattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return pattern.test(expiryDate);
  };

  const isValidSecurityCode = (securityCode) => {
    const pattern = /^\d{3}$/;
    return pattern.test(securityCode);
  };

  const isValidCardHolderName = (name) => {
    return name.trim().length > 0;
  };

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [isCardNumberValid, setIsCardNumberValid] = useState(false);
  const [isExpiryDateValid, setIsExpiryDateValid] = useState(false);
  const [isSecurityCodeValid, setIsSecurityCodeValid] = useState(false);

  useEffect(() => {
    setIsCardNumberValid(isValidCardNumber(cardNumber));
  }, [cardNumber]);

  useEffect(() => {
    setIsExpiryDateValid(isValidExpiryDate(expiryDate));
  }, [expiryDate]);

  useEffect(() => {
    setIsSecurityCodeValid(isValidSecurityCode(securityCode));
  }, [securityCode]);

  useEffect(() => {
    const isValid =
      isCardNumberValid && isExpiryDateValid && isSecurityCodeValid && isValidCardHolderName(cardHolderName);
    onValidationChange(isValid);
  }, [isCardNumberValid, isExpiryDateValid, isSecurityCodeValid, isValidCardHolderName, cardHolderName]);

  const isCheckoutDisabled = !(
    isCardNumberValid &&
    isExpiryDateValid &&
    isSecurityCodeValid &&
    isValidCardHolderName(cardHolderName)
  );

  const handleCardNumberChange = (e, index) => {
    const { value } = e.target;
    setCardNumber((prevCardNumber) => {
      const updatedCardNumber = prevCardNumber.split(" ");
      updatedCardNumber[index] = value;
      return updatedCardNumber.join(" ");
    });

    if (value.length === 4 && index < cardNumberInputs.current.length - 1) {
      cardNumberInputs.current[index + 1].focus();
    }
  };

  const handleExpiryDateChange = (e) => {
    const { value } = e.target;
    setExpiryDate(value);
  };

  const handleSecurityCodeChange = (e) => {
    const { value } = e.target;
    setSecurityCode(value);
  };

  return (
    <div className="container">
      <p>Card Number</p>
      <div className="d-flex gap-3 mb-3">
        {[0, 1, 2, 3].map((i) => (
          <input
            key={i}
            ref={(el) => (cardNumberInputs.current[i] = el)}
            type="text"
            value={cardNumber.split(" ")[i]}
            onChange={(e) => handleCardNumberChange(e, i)}
            placeholder="0000"
            maxLength="4"
            className={isCardNumberValid ? "valid" : "invalid"}
          />
        ))}
      </div>
      {!isCardNumberValid && <p className="text-danger">Card number is invalid!</p>}

      <div className="mb-3">
        <p>Credit Card holder name</p>
        <input
          type="text"
          placeholder="John Smith"
          value={cardHolderName}
          onChange={(e) => setCardHolderName(e.target.value)}
        />
      </div>
      {!isValidCardHolderName(cardHolderName) && <p className="text-danger">Card holder name is invalid!</p>}

      <div className="mb-3">
        <p>Card Issuance Date</p>
        <input
          style={{ width: "20%" }}
          onChange={handleExpiryDateChange}
          className={isExpiryDateValid ? "valid" : "invalid"}
        />
      </div>
      {!isExpiryDateValid && <p className="text-danger">Expiry date is invalid!</p>}

      <div className="mb-3">
        <p>Security Code</p>
        <input
          placeholder="000"
          style={{ width: "20%" }}
          onChange={handleSecurityCodeChange}
          className={isSecurityCodeValid ? "valid" : "invalid"}
        />
      </div>
      {!isSecurityCodeValid && <p className="text-danger">Security code is invalid!</p>}
    </div>
  );
};

export const BuyButton = ({ isDisabled }) => {
  return (
    <button disabled={isDisabled} className={`btn btn-primary${isDisabled ? " disabled" : ""}`}>
      Buy
    </button>
  );
};

export default CreditCard;
