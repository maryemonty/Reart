import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function Licenses() {
  const [userId, setUserId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [artworkList, setArtworkList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const mapArtwork = async () => {
    try {
      const response = await fetch(`http://localhost:8080/shop/${userId}`);
      const data = await response.json();
      const filteredArtwork = data.filter((artwork) => artwork.license === searchTerm);
      setArtworkList(filteredArtwork);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error fetching artwork:", error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="container">
      <h1>Artwork con Licenze</h1>
      <input type="text" placeholder="Inserisci UserID" value={userId} onChange={handleUserIdChange} />
      <input type="text" placeholder="Search" value={searchTerm} onChange={handleInputChange} />
      <button onClick={mapArtwork}>Mappa Artwork</button>

      <Modal isOpen={modalIsOpen} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Artwork con Licenze</ModalHeader>
        <ModalBody>
          <div id="artworkContainer">
            {artworkList.map((artwork) => (
              <div key={artwork.id} className="artworkCard">
                <h3>{artwork.title}</h3>
                <p>{artwork.license}</p>
                <img src={artwork.image} alt={artwork.title} />
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <button color="secondary" onClick={closeModal}>
            Close
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Licenses;
