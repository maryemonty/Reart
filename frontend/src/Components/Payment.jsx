import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function Payment({ userId, artworkId }) {
  const token = useSelector((state) => state.user.token);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const handleOpenPaymentModal = () => {
    setShowPaymentModal(true);
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

  return (
    <>
      <button className="white fs-6 px-3 py-1 fw-bold btn-default rounded border-0" onClick={handleOpenPaymentModal}>
        Buy license
      </button>

      <Modal isOpen={showPaymentModal} toggle={() => setShowPaymentModal(false)}>
        <ModalHeader toggle={() => setShowPaymentModal(false)}>Payment</ModalHeader>
        <ModalBody>
          <p>inserirò le cose</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handlePaymentCompleted}>
            Buy
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
