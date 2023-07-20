import { useState, useEffect } from "react";
import { Card, CardBody, Modal, ModalHeader, ModalBody } from "reactstrap";
import UserPropic from "./UserPropic";
import LikeButton from "./LikeButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function RandomArtwork() {
  const [artwork, setArtwork] = useState(null);
  const [user, setUser] = useState("");
  const [showModal, setShowModal] = useState(false);
  const token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.profile.email);

  const handleViewArtwork = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const fetchRandomArtwork = async () => {
      try {
        const response = await fetch("http://localhost:8080/artworks");
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomArtwork = data[randomIndex];
        setArtwork(randomArtwork);
        setUser(randomArtwork.user.username);
      } catch (error) {
        console.error("Error fetching random artwork:", error);
      }
    };

    fetchRandomArtwork();
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

  if (!artwork) {
    return null;
  }

  return (
    <>
      <Modal isOpen={showModal} toggle={() => setShowModal(false)} contentClassName="glass-modal">
        <ModalHeader toggle={() => setShowModal(false)} className="text-capitalize">
          {artwork.title}
        </ModalHeader>
        <ModalBody>
          <img src={artwork.art} alt="Artwork" className="img-fluid mb-2" />
          <p className="fs-3 text-white">{artwork.description}</p>
        </ModalBody>
      </Modal>

      <Card className="border-0">
        <div className="position-relative">
          <img
            src={artwork.art}
            className="card-img-top"
            alt="artwork"
            style={{ objectFit: "cover", height: "200px" }}
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
            className="card-title white fw-bold fs-3"
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
            <Link to={"/profile/" + user} className=" text-hover">
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
            <button className="white fs-6 px-3 py-1 fw-bold rounded bg-transparent" onClick={handleViewArtwork}>
              View Artwork
            </button>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default RandomArtwork;
