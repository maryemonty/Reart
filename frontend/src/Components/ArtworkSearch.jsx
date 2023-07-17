import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import LikeButton from "./LikeButton";

const ArtworkSearch = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const match = path.match(/^\/searched\/([^/]+)/);
    const searchParam = match ? match[1] : "";
    setSearch(searchParam);
  }, [location]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    navigate(`/searched/${value}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    navigate(`/searched/${search}`);
  };

  const Searched = ({ search }) => {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
      const fetchArtworks = async () => {
        try {
          const response = await fetch(`http://localhost:8080/artworks/search?q=${search}`);
          if (response.ok) {
            const data = await response.json();
            setArtworks(data);
          } else {
            console.error("Error retrieving artworks.");
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchArtworks();
    }, [search]);

    const abbreviate = (number) => {
      if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + "M";
      } else if (number >= 1000) {
        return (number / 1000).toFixed(0) + "k";
      } else {
        return number.toString();
      }
    };

    return (
      <div className="p-4 m-2">
        <Row>
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
      </div>
    );
  };

  return (
    <div>
      <div className="d-flex">
        <input
          className="mt-3 input"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      {search && <Searched search={search} />}
    </div>
  );
};

export default ArtworkSearch;
