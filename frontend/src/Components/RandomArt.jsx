import { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import LikeDislike from "./LikeDislike";
import UserPropic from "./UserPropic";

function RandomArtwork() {
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    const fetchRandomArtwork = async () => {
      try {
        const response = await fetch("http://localhost:8080/artworks");
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomArtwork = data[randomIndex];
        setArtwork(randomArtwork);
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
    <Card className="border-0">
      <div className="position-relative">
        <img src={artwork.art} className="card-img-top" alt="artwork" style={{ objectFit: "cover", height: "174px" }} />
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
            {abbreviate(artwork.likes)} <LikeDislike artworkId={artwork.id} />
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <button className="white fs-6 px-3 py-1 fw-bold btn-default rounded border-0">Place a bid</button>
          <button className="white fs-6 px-3 py-1 fw-bold rounded bg-transparent">View Artwork</button>
        </div>
      </CardBody>
    </Card>
  );
}

export default RandomArtwork;