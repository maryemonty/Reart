import { Col, Row } from "reactstrap";
import React, { useState, useEffect } from "react";
import UserPropic from "./UserPropic";
import LikeButton from "./LikeButton";

function Cards() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch("http://localhost:8080/artworks");
        const data = await response.json();
        const sortedArtworks = data.sort((a, b) => b.likes - a.likes);
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
    <Row className="mb-5 me-1">
      {artworks.map((artwork) => (
        <Col lg={4} key={artwork.id}>
          <div className="d-flex mb-1">
            <div className="card mb-5 border-0" style={{ width: "100%" }}>
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
                  Current Bid <br />
                  {abbreviate(artwork.price)}$
                </p>
              </div>
              <div className="card-body default-bg-color">
                <h5 className="card-title white">{artwork.title}</h5>
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
                  <div className="d-flex gap-2 mb-2">
                    <UserPropic userPropic={artwork.user.propic} />
                    <p className="card-text white">@{artwork.user.username}</p>
                  </div>
                  <p className="fw-bold text-white d-flex gap-1">
                    {abbreviate(artwork.likeCount)} <LikeButton artworkId={artwork.id} />
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <button className="white fs-6 px-3 py-1 fw-bold btn-default rounded border-0">Place a bid</button>
                  <button className="white fs-6 px-3 py-1 fw-bold rounded bg-transparent">View Artwork</button>
                </div>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default Cards;
