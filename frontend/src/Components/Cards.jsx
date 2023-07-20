import { Col, Row, Card, CardBody, Modal, ModalHeader, ModalBody } from "reactstrap";
import React, { useState, useEffect } from "react";
import UserPropic from "./UserPropic";
import LikeButton from "./LikeButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Cards() {
  const [artworks, setArtworks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.profile.email);

  const handleViewArtwork = (artwork) => {
    setSelectedArtwork(artwork);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch("http://localhost:8080/artworks");
        const data = await response.json();
        const sortedArtworks = data.sort((a, b) => b.likeCount - a.likeCount);
        const slicedArtworks = sortedArtworks.slice(0, 6);
        setArtworks(slicedArtworks);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };

    fetchArtworks();
  }, []);

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
    <>
      <Modal isOpen={showModal} toggle={() => setShowModal(false)} contentClassName="glass-modal">
        <ModalHeader toggle={() => setShowModal(false)} className="text-capitalize">
          {selectedArtwork && selectedArtwork.title}
        </ModalHeader>
        <ModalBody>
          {selectedArtwork && <img src={selectedArtwork.art} alt="Artwork" className="img-fluid mb-2" />}
          <p className="fs-3 text-white">{selectedArtwork && selectedArtwork.description}</p>
        </ModalBody>
      </Modal>

      <Row className=" me-1">
        {artworks.map((artwork) => (
          <Col lg={4} key={artwork.id}>
            <div className="d-flex mb-1">
              <Card className="mb-5 border-0" style={{ width: "100%" }}>
                <div className="position-relative">
                  <img
                    src={artwork.art}
                    className="card-img-top"
                    alt="logo"
                    style={{ height: "200px", width: "100%", objectFit: "cover" }}
                  />
                  <p
                    className="white position-absolute bottom-0 rounded px-4 py-2"
                    style={{ backdropFilter: "blur(10px)" }}
                  >
                    Current Price <br />
                    {abbreviate(artwork.price)}$
                  </p>
                </div>
                <CardBody className="default-bg-color">
                  <h5 className="card-title white text-capitalize">{artwork.title}</h5>
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
                  <div className="d-flex justify-content-between">
                    {token && email === artwork.user.email ? (
                      ""
                    ) : (
                      <button className="white fs-6 px-3 py-1 fw-bold btn-default rounded border-0">Buy it</button>
                    )}
                    <button
                      className="white fs-6 px-3 py-1 fw-bold rounded bg-transparent"
                      onClick={() => handleViewArtwork(artwork)}
                    >
                      View Artwork
                    </button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cards;
