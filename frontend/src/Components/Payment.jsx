import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CreditCard, { BuyButton } from "./CreditCard";

function Payment({ userId, artworkId }) {
  const token = useSelector((state) => state.user.token);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [logModal, setLogModal] = useState(false);
  const [isCardValid, setIsCardValid] = useState(false);

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
          console.log("Pagamento completato con successo!");
        } else {
          throw new Error("Errore durante l'acquisto dell'opera d'arte");
        }
      })
      .catch((error) => {
        console.log("Errore durante l'acquisto dell'opera d'arte:", error);
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
      <button
        className="white fs-6 px-3 py-1 fw-bold btn-default rounded border-0"
        onClick={token ? handleOpenPaymentModal : handleOpenLogModal}
      >
        Buy license
      </button>

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
          <Button color="primary" onClick={handleBuyClick}>
            <BuyButton isDisabled={!isCardValid} />
          </Button>
          <Button color="secondary" onClick={() => setShowPaymentModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Payment;
