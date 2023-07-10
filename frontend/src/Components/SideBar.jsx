import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { FaHome } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import logo from "../logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function SubmitArtwork({ closeModal }) {
  const token = useSelector((state) => state.user.token);
  const id = useSelector((state) => state.profile.id);
  console.log(id);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    art: "",
    price: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/artworks/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Artwork submitted successfully:", data);
        // Esegui altre operazioni dopo l'invio del form
      })
      .catch((error) => {
        console.error("Error submitting artwork:", error);
        // Gestisci l'errore di invio del form
      })
      .finally(() => {
        closeModal(); // Chiudi il modale dopo l'invio del form
      });
  };

  const toggleModal = () => {
    closeModal();
  };

  return (
    <div>
      <Modal isOpen={true} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Modale</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input type="text" name="title" value={formData.title} onChange={handleChange} />
            </label>
            <br />
            <label>
              Description:
              <input type="text" name="description" value={formData.description} onChange={handleChange} />
            </label>
            <br />
            <label>
              Art:
              <input type="text" name="art" value={formData.art} onChange={handleChange} />
            </label>
            <br />
            <label>
              Price:
              <input type="text" name="price" value={formData.price} onChange={handleChange} />
            </label>
            <br />
            <label>
              Category:
              <select name="category" value={formData.category} onChange={handleChange}>
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
              </select>
            </label>
            <br />
            <div className="d-flex justify-content-end">
              <Button type="submit" color="primary">
                Invia
              </Button>
              <Button color="secondary" onClick={toggleModal} className="ml-2">
                Chiudi
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

function List({ icon: Icon, name, active, onItemClick }) {
  const classes = `nav-link d-flex align-items-center px-3 gap-3 ${active ? "border-active" : "border-no-active"}`;
  const iconStyle = active ? "icon-active my-2" : "icon my-2";

  return (
    <div className={classes} onClick={onItemClick}>
      <Icon className={iconStyle} /> {name}
    </div>
  );
}

function ListNames() {
  const [activeItem, setActiveItem] = useState("Home");
  const [showModal, setShowModal] = useState(false);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    if (itemName === "Submit") {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveItem("Home"); // Imposta l'elemento "Home" come attivo dopo la chiusura del modale
  };

  return (
    <>
      <Link to="/">
        <img className="logo mb-4" src={logo} alt="logo Reart" style={{ width: "200px" }} />
      </Link>
      <List icon={FaHome} name="Home" active={activeItem === "Home"} onItemClick={() => handleItemClick("Home")} />
      <List
        icon={BiCategoryAlt}
        name="Categories"
        active={activeItem === "Categories"}
        onItemClick={() => handleItemClick("Categories")}
      />
      <List
        icon={BsPlusLg}
        name="Submit"
        active={activeItem === "Submit"}
        onItemClick={() => handleItemClick("Submit")}
      />
      {showModal && <SubmitArtwork closeModal={closeModal} />}
    </>
  );
}

function Sidebar() {
  return (
    <div className="d-flex flex-column">
      <ListNames />
    </div>
  );
}

export default Sidebar;
