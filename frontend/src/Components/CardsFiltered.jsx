import React, { useState } from "react";
import { Card, CardBody, Modal, ModalHeader, ModalBody } from "reactstrap";
import UserPropic from "./UserPropic";
import LikeButton from "./LikeButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Payment from "./Payment";

function CardsFiltered({ selectedCategory, artworks }) {
  const filteredArtworks = artworks.filter((artwork) => artwork.category === selectedCategory);
  const [showModal, setShowModal] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.profile.email);

  const handleViewArtwork = (artwork) => {
    setSelectedArtwork(artwork);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedArtwork(null);
  };

  function abbreviate(n) {
    if (n >= 1000000) {
      return (n / 1000000).toFixed(1) + "M";
    } else if (n >= 1000) {
      return (n / 1000).toFixed(0) + "k";
    } else {
      return n.toString();
    }
  }

  return (
    <div className="d-flex gap-3">
      {filteredArtworks.map((artwork) => (
        <Card key={artwork.id} className="text-bg-dark border-0">
          <div className="position-relative">
            <img
              src={artwork.art}
              className="card-img-top"
              alt={artwork.title}
              style={{ objectFit: "cover", height: "174px" }}
            />
            <p
              className="white position-absolute bottom-0 rounded px-4 py-2 fw-bold"
              style={{ backdropFilter: "blur(10px)" }}
            >
              Current Price <br /> {abbreviate(artwork.price)} $
            </p>
          </div>
          <CardBody className="default-bg-color">
            <h5
              className="card-title white fw-bold fs-3 text-capitalize"
              style={{
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {artwork.title}
            </h5>
            <p
              className="card-text white fs-6"
              style={{
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {artwork.category.replace(/_/g, " ").replace(/TWO/g, "2").replace(/THREE/g, "3")}
            </p>
            <div className="d-flex justify-content-between mb-2">
              <Link to={"/profile/" + artwork.user.username} className=" text-hover">
                <div className="d-flex gap-2 mb-2">
                  <UserPropic userPropic={artwork.user.propic} />
                  <p className="card-text white">@{artwork.user.username}</p>
                </div>
              </Link>
              <p className="fw-bold text-white d-flex gap-1">
                {abbreviate(artwork.likeCount)} <LikeButton artworkId={artwork.id} />
              </p>
            </div>
            <div className="d-flex justify-content-between gap-3">
              {token && email === artwork.user.email ? "" : <Payment userId={artwork.user.id} artworkId={artwork.id} />}
              <button
                className="white fs-6 px-3 py-1 fw-bold rounded bg-transparent"
                onClick={() => handleViewArtwork(artwork)}
              >
                View Artwork
              </button>
            </div>
          </CardBody>
        </Card>
      ))}

      <Modal isOpen={showModal} toggle={closeModal} contentClassName="glass-modal">
        <ModalHeader toggle={closeModal} className="text-capitalize">
          {selectedArtwork?.title}
        </ModalHeader>
        <ModalBody>
          {selectedArtwork && <img src={selectedArtwork.art} alt="Artwork" className="img-fluid mb-2" />}
          <p className="fs-3 text-white">{selectedArtwork && selectedArtwork.description}</p>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default CardsFiltered;
