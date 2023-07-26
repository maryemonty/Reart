import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CreditCard, { BuyButton } from "./CreditCard";

function Payment({ userId, artworkId }) {
  const token = useSelector((state) => state.user.token);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [logModal, setLogModal] = useState(false);
  const [isCardValid, setIsCardValid] = useState(false);
  const [isLicensePurchased, setIsLicensePurchased] = useState(false);

  const handleOpenPaymentModal = () => {
    setShowPaymentModal(true);
  };

  const handleOpenLogModal = () => {
    setLogModal(true);
  };

  const handlePaymentCompleted = () => {
    if (!token) {
      return;
    }

    fetch(`http://localhost:8080/shop/${userId}/${artworkId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    })
      .then((response) => {
        if (response.ok) {
          setIsLicensePurchased(true);
          console.log("Payment completed");
        } else {
          throw new Error("Error");
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });

    setShowPaymentModal(false);
  };

  const handleBuyClick = () => {
    if (isCardValid) {
      handlePaymentCompleted();
    }
  };

  const handleValidationChange = (isValid) => {
    setIsCardValid(isValid);
  };

  return (
    <>
      {isLicensePurchased ? (
        <p className="text-white">You already bought this license</p>
      ) : (
        <button
          className="white fs-6 px-3 py-1 fw-bold btn-default rounded border-0"
          onClick={token ? handleOpenPaymentModal : handleOpenLogModal}
        >
          Buy license
        </button>
      )}

      <Modal isOpen={logModal} toggle={() => setLogModal(false)}>
        <ModalHeader toggle={() => setLogModal(false)}>Advise</ModalHeader>
        <ModalBody>
          <p>You must be logged in to buy this license</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setLogModal(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={showPaymentModal} toggle={() => setShowPaymentModal(false)}>
        <ModalHeader toggle={() => setShowPaymentModal(false)}>Payment</ModalHeader>
        <ModalBody>
          <CreditCard onValidationChange={handleValidationChange} />
        </ModalBody>
        <ModalFooter>
          <div onClick={handleBuyClick}>
            <BuyButton isDisabled={!isCardValid} />
          </div>
          <Button color="secondary" onClick={() => setShowPaymentModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Payment;
