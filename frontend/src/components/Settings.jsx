import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const Settings = () => {
  const params = useParams();
  const profile = useSelector((state) => state.profile);
  const token = useSelector((state) => state.token);
  const url = `http://localhost:8080/auth/${params.id}`;

  const [newUsername, setNewUsername] = useState("");
  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newImage, setNewImage] = useState(null);

  const [editUsername, setEditUsername] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editSurname, setEditSurname] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const updateUser = () => {
    const updatedFields = {};

    if (newUsername !== "") {
      updatedFields.username = newUsername;
    } else {
      updatedFields.username = profile.username;
    }

    if (newName !== "") {
      updatedFields.name = newName;
    } else {
      updatedFields.name = profile.name;
    }

    if (newSurname !== "") {
      updatedFields.surname = newSurname;
    } else {
      updatedFields.surname = profile.surname;
    }

    if (newEmail !== "") {
      updatedFields.email = newEmail;
    } else {
      updatedFields.email = profile.email;
    }

    if (newPassword !== "") {
      updatedFields.password = newPassword;
    } else {
      updatedFields.password = profile.password;
    }

    if (newImage !== null) {
      updatedFields.image = newImage;
    }

    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating user");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User updated successfully:", data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setNewImage(URL.createObjectURL(file));
    setModalOpen(false);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <Row className="justify-content-start pt-4">
      <Col lg={4}>
        <div className="position-relative d-flex justify-content-end">
          <img
            style={{ maxWidth: "100px", maxHeight: "100px" }}
            src={newImage || profile.propic}
            alt="profile picture"
          />
          <MdModeEdit
            className="position-absolute end-0 bottom-0 white"
            style={{ height: "50px", width: "50px" }}
            onClick={toggleModal}
          />
        </div>
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Update Profile Picture</ModalHeader>
          <ModalBody>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Col>
      <Col lg={4}>
        <div className="position-relative">
          {editUsername ? (
            <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
          ) : (
            <>
              {newUsername !== "" ? newUsername : profile.username}{" "}
              <MdModeEdit className="position-absolute end-0 white" onClick={() => setEditUsername(true)} />
            </>
          )}
        </div>
        <div className="position-relative">
          {editName ? (
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
          ) : (
            <>
              {newName !== "" ? newName : profile.name}{" "}
              <MdModeEdit className="position-absolute end-0 white" onClick={() => setEditName(true)} />
            </>
          )}
        </div>
        <div className="position-relative">
          {editSurname ? (
            <input type="text" value={newSurname} onChange={(e) => setNewSurname(e.target.value)} />
          ) : (
            <>
              {newSurname !== "" ? newSurname : profile.surname}{" "}
              <MdModeEdit className="position-absolute end-0 white" onClick={() => setEditSurname(true)} />
            </>
          )}
        </div>
        <div className="position-relative">
          {editEmail ? (
            <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          ) : (
            <>
              {newEmail !== "" ? newEmail : profile.email}{" "}
              <MdModeEdit className="position-absolute end-0 white" onClick={() => setEditEmail(true)} />
            </>
          )}
        </div>
        <hr />
        <div className="position-relative">
          <button className="mb-3" onClick={() => setNewPassword(true)}>
            Change your password
          </button>
        </div>
        <button onClick={updateUser}>Update</button>
      </Col>
    </Row>
  );
};

export default Settings;
