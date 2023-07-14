import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Card, CardBody } from "reactstrap";
import LikeButton from "./LikeButton";

function MyArtworks() {
  const token = useSelector((state) => state.user.token);
  const username = useSelector((state) => state.profile.username);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Siamo qui ora");
          return response.json();
        } else {
          throw new Error("Errore durante il recupero delle informazioni utente");
        }
      })
      .then((data) => {
        setArtworks(data.artworks);
      })
      .catch((error) => {
        console.log("Errore durante il recupero delle informazioni utente:", error);
      });
  }, [token, username]);

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
    <Row className="mx-1 my-5 flex-wrap-reverse">
      {artworks.map((artwork) => (
        <Col md={4} key={artwork.id}>
          <Card className="mb-5 border-0">
            <div className="position-relative">
              <img
                src={artwork.art}
                className="card-img-top"
                alt="logo"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <p
                className="white position-absolute bottom-0 rounded px-4 py-2 fw-bold"
                style={{ backdropFilter: "blur(10px)" }}
              >
                Current Bid <br /> {abbreviate(artwork.price)} $
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
              <div className="d-flex justify-content-between mb-2">
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
                <p className="fw-bold text-white d-flex gap-1">
                  {abbreviate(artwork.likeCount)} <LikeButton artworkId={artwork.id} />
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <button className="white fs-6 px-3 py-1 fw-bold btn-default rounded border-0">Place a bid</button>
                <button className="white fs-6 px-3 py-1 fw-bold rounded bg-transparent">View Artwork</button>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default MyArtworks;
