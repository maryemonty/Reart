import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from "reactstrap";
import { FaBars, FaHome } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { BsPlusLg, BsSearchHeart } from "react-icons/bs";
import logo from "../logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SubmitArtwork({ closeModal }) {
  const token = useSelector((state) => state.user.token);
  const id = useSelector((state) => state.profile.id);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    art: "",
    price: "",
    category: "",
  });

  const imageUrlRegex = /\.(jpeg|jpg|gif|png|bmp|webp)$/i;
  const numberRegex = /^[0-9]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imageUrlRegex.test(formData.art)) {
      setErrors("Invalid image URL. Please provide a valid image URL.");
      return;
    }
    if (!numberRegex.test(formData.price)) {
      setErrors("Invalid price");
      return;
    }

    fetch(`http://localhost:8080/artworks/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            setErrors(data.message);
            throw new Error("Error");
          });
        }
      })
      .then((data) => {
        console.log("Artwork submitted successfully:", data);
        closeModal();
      })
      .catch((error) => {
        console.error("Error submitting artwork:", error);
      });
  };

  const toggleModal = () => {
    closeModal();
  };

  return (
    <div>
      <Modal isOpen={true} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Submit</ModalHeader>
        <ModalBody>
          <p className="text-danger">{errors}</p>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Title:</Label>
              <Input type="text" name="title" id="title" value={formData.title.toLowerCase()} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description:</Label>
              <Input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="art">Art:</Label>
              <Input
                type="text"
                name="art"
                placeholder="http://..."
                id="art"
                value={formData.art}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price:</Label>
              <Input type="text" name="price" id="price" value={formData.price} onChange={handleChange} />
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
            <div className="d-flex justify-content-end">
              <Button type="submit" className="btn-default">
                Submit
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

function List({ icon: Icon, name, active, onItemClick }) {
  const classes = `nav-link d-flex align-items-center px-3 gap-3 ${
    active ? "border-active text-white" : "border-no-active"
  }`;
  const iconStyle = active ? "icon-active my-1" : "icon my-2 text-secondary";
  const nameStyle = active ? "text-white fw-bold" : "text-secondary";

  return (
    <div className={classes} onClick={onItemClick}>
      <Icon className={iconStyle} /> <span className={nameStyle}>{name}</span>
    </div>
  );
}

function ListNames({ errors }) {
  const token = useSelector((state) => state.user.token);

  const [activeItem, setActiveItem] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/categories") {
      setActiveItem("Categories");
    } else if (path.startsWith("/searched")) {
      setActiveItem("Search");
    } else {
      setActiveItem("Home");
    }
  }, [location]);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    if (itemName === "Submit") {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    if (errors.length === 0) {
      setShowModal(false);
      const path = location.pathname;
      if (path === "/categories") {
        setActiveItem("Categories");
      } else if (path === "/") {
        setActiveItem("Home");
      } else if (path.startsWith("/searched")) {
        setActiveItem("Search");
      } else {
        navigate(path);
      }
    }
  };

  return (
    <div className="d-flex flex-column">
      <Link to="/" className="text-decoration-none">
        <img className="logo mb-4" src={logo} alt="logo Reart" style={{ maxWidth: "200px" }} />
      </Link>
      <Navbar expand="md">
        <NavbarToggler onClick={toggleNavbar} className="position-relative border-0" style={{ boxShadow: "none" }}>
          <FaBars style={{ color: "white", bottom: "65px", left: "205px" }} className="position-absolute border-0" />
        </NavbarToggler>
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="flex-column" navbar>
            <NavItem>
              <Link to="/" className="text-decoration-none">
                <List
                  icon={FaHome}
                  name="Home"
                  active={activeItem === "Home"}
                  onItemClick={() => handleItemClick("Home")}
                />
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/categories" className="text-decoration-none">
                <List
                  icon={BiCategoryAlt}
                  name="Categories"
                  active={activeItem === "Categories"}
                  onItemClick={() => handleItemClick("Categories")}
                />
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/searched" className="text-decoration-none">
                <List
                  icon={BsSearchHeart}
                  name="Search"
                  active={activeItem === "Search"}
                  onItemClick={() => handleItemClick("Search")}
                />
              </Link>
            </NavItem>
            {token && (
              <NavItem>
                <List
                  icon={BsPlusLg}
                  name="Submit"
                  active={activeItem === "Submit"}
                  onItemClick={() => handleItemClick("Submit")}
                />
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      {showModal && <SubmitArtwork closeModal={closeModal} />}
    </div>
  );
}

function Sidebar() {
  const errors = [];
  return <ListNames errors={errors} />;
}

export default Sidebar;
