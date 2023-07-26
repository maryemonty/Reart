import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import LikeButton from "./LikeButton";
import { AiFillDelete } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import jwt_decode from "jwt-decode";
import Payment from "./Payment";

function MyArtworks({ username }) {
  const token = useSelector((state) => state.user.token);
  const id = useSelector((state) => state.user.id);
  const userRole = useSelector((state) => state.profile.role);
  const decodedToken = token ? jwt_decode(token) : null;
  const userEmail = decodedToken?.sub;
  const [artworks, setArtworks] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    art: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8080/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore durante il recupero delle informazioni utente");
        }
      })
      .then((data) => {
        setArtworks(data.artworks);
        setEmail(data.email);
        setUserId(data.id);
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

  const handleViewArtwork = (artwork) => {
    setSelectedArtwork(artwork);
    setShowViewModal(true);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setShowViewModal(false);
    setSelectedArtwork(null);
  };

  const handleEditArtwork = (artwork) => {
    setSelectedArtwork(artwork);
    setFormData({
      title: artwork.title,
      description: artwork.description,
      art: artwork.art,
      price: artwork.price,
      category: artwork.category,
    });
    setShowEditModal(true);
  };

  const saveEditArtwork = () => {
    if (!token) {
      return;
    }

    const updatedArtwork = {
      title: formData.title.toLowerCase(),
      description: formData.description,
      art: formData.art,
      price: formData.price,
      category: formData.category,
    };

    fetch(`http://localhost:8080/artworks/${userId}/${selectedArtwork.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedArtwork),
    })
      .then((response) => {
        if (response.ok) {
          setShowEditModal(false);
          setArtworks((prevArtworks) =>
            prevArtworks.map((artwork) =>
              artwork.id === selectedArtwork.id ? { ...artwork, ...updatedArtwork } : artwork
            )
          );
        } else {
          throw new Error("Errore durante l'aggiornamento dell'opera d'arte");
        }
      })
      .catch((error) => {
        console.log("Errore durante l'aggiornamento dell'opera d'arte:", error);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeleteArtwork = (artworkId) => {
    if (!token) {
      return;
    }

    fetch(`http://localhost:8080/artworks/${artworkId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setArtworks((prevArtworks) => prevArtworks.filter((artwork) => artwork.id !== artworkId));
        } else {
          throw new Error("Errore durante l'eliminazione dell'artwork");
        }
      })
      .catch((error) => {
        console.log("Errore durante l'eliminazione dell'artwork:", error);
      });
  };

  return (
    <Row className="mx-1 mt-5 flex-wrap-reverse">
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
              {(token && email === userEmail) || userRole === "ADMIN" ? (
                <div className="position-absolute end-0 top-0 d-flex gap-3">
                  <IoMdSettings className="zoom text-white fs-2 shadow" onClick={() => handleEditArtwork(artwork)} />
                  <AiFillDelete
                    className="zoom text-white fs-2 shadow"
                    onClick={() => handleDeleteArtwork(artwork.id)}
                  />
                </div>
              ) : null}

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
                {token && email === userEmail ? "" : <Payment userId={id} artworkId={artwork.id} />}
                <button
                  className="white fs-6 px-3 py-1 fw-bold rounded bg-transparent"
                  onClick={() => handleViewArtwork(artwork)}
                >
                  View Artwork
                </button>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}

      <Modal isOpen={showEditModal} toggle={closeModal}>
        <ModalHeader toggle={closeModal} className="text-capitalize">
          Edit Artwork
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter the title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter the description"
            />
          </FormGroup>
          <FormGroup>
            <Label for="art">Art</Label>
            <Input
              type="text"
              name="art"
              id="art"
              value={formData.art}
              onChange={handleChange}
              placeholder="Enter the art URL"
            />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="text"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter the price"
            />
          </FormGroup>
          <FormGroup>
            <Label for="category">Category:</Label>
            <Input type="select" name="category" id="category" value={formData.category} onChange={handleChange}>
              <option>--Select--</option>
              <option value="AI_ART">Ai Art</option>
              <option value="TWOD_DIGITAL_PAINTING">2D Digital Painting</option>
              <option value="THREED_DIGITAL_PAINTING">3D Digital Painting</option>
              <option value="GENERATIVE_ART">Generative Art</option>
              <option value="PIXEL_ART">Pixel Art</option>
              <option value="FRACTAL_ART">Fractal Art</option>
              <option value="ALGORITHMIC_ART">Algorithmic Art</option>
              <option value="DIGITAL_PHOTOGRAPHY">Digital Photography</option>
              <option value="VR_PAINTING">Vr Painting</option>
              <option value="TWOD_COMPUTER_GRAPHICS">2D Computer Graphics</option>
              <option value="THREED_COMPUTER_GRAPHICS">3D Computer Graphics</option>
              <option value="PHOTOBASHING">Photobashing</option>
              <option value="PHOTO_PAINTING">Photo painting</option>
              <option value="DATA_MOSHING">Data Moshing</option>
              <option value="DYNAMIC_PAINTING">Dynamic Painting</option>
              <option value="DIGITAL_COLLAGE">Digital Collage</option>
              <option value="RASTER_PAINTING">Raster Painting</option>
              <option value="VECTOR_ART">Vector Art</option>
              <option value="INTEGRATED_ART">Integrated Art</option>
              <option value="MIXED_MEDIA">Mixed Media</option>
              <option value="COMPUTER_GENERATED_DIGITAL_PAINTING">Computer Generated Digital Painting</option>
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveEditArtwork}>
            Save
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={showViewModal} toggle={() => setShowViewModal(false)} contentClassName="glass-modal">
        <ModalHeader toggle={() => setShowViewModal(false)} className="text-capitalize">
          {selectedArtwork && selectedArtwork.title}
        </ModalHeader>
        <ModalBody>
          {selectedArtwork && <img src={selectedArtwork.art} alt="Artwork" className="img-fluid mb-2" />}
          <p className="fs-3 text-white">{selectedArtwork && selectedArtwork.description}</p>
        </ModalBody>
      </Modal>
    </Row>
  );
}

export default MyArtworks;
