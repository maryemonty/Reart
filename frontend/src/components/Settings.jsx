import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Toast, ToastHeader, Fade } from "reactstrap";

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
  const [newPropic, setNewPropic] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [editUsername, setEditUsername] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editSurname, setEditSurname] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const updateUser = () => {
    const updatedFields = {
      username: newUsername || profile.username,
      name: newName || profile.name,
      surname: newSurname || profile.surname,
      email: newEmail || profile.email,
      password: newPassword || profile.password,
      propic: newPropic || profile.propic,
      oldPassword: oldPassword,
    };

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
          setToastMessage("Error updating user");
          throw new Error("Error updating user");
        }
        return response.json();
      })
      .then((data) => {
        setToastMessage("User updated successfully");
        setShowToast(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const toggleProfileModal = () => {
    setProfileModalOpen(!profileModalOpen);
  };

  const togglePasswordModal = () => {
    setPasswordModalOpen(!passwordModalOpen);
    setPasswordError(false);
  };

  const handlePasswordUpdate = () => {
    if (oldPassword !== profile.password) {
      setPasswordError(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    setNewPassword(newPassword);
    togglePasswordModal();
  };

  return (
    <Row className="justify-content-start pt-4">
      <Col lg={4}>
        <div className="position-relative d-flex justify-content-end">
          <img
            style={{ width: "100px", height: "100px" }}
            src={newPropic || profile.propic}
            alt="profile picture"
            className="rounded-circle img-fluid"
          />
          <MdModeEdit
            className="position-absolute end-0 bottom-0 white rounded-circle p-1 border bg-black"
            style={{ height: "25px", width: "25px" }}
            onClick={toggleProfileModal}
          />
        </div>
        <Modal isOpen={profileModalOpen} toggle={toggleProfileModal}>
          <ModalHeader toggle={toggleProfileModal}>Update Profile Picture</ModalHeader>
          <ModalBody>
            <input
              type="text"
              placeholder="http://..."
              accept="image/*"
              onChange={(e) => setNewPropic(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleProfileModal}>
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
              <MdModeEdit className="position-absolute end-0 white " onClick={() => setEditUsername(true)} />
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
        <button className="mb-3 btn btn-outline-light mt-2" onClick={togglePasswordModal}>
          Change your password
        </button>
        <button className="btn-default white border-0 p-2 d-block btn" onClick={updateUser}>
          Update
        </button>
        <hr />
        <div className="position-relative">
          <button className="mb-3 btn btn-danger" onClick={() => setNewPassword(true)}>
            Delete your account
          </button>
        </div>
      </Col>

      <div className="toast-container position-fixed top-50 start-50 translate-middle p-3">
        <Fade in={showToast} className="fade-transition">
          <Toast isOpen={showToast} onClose={() => setShowToast(false)}>
            <ToastHeader toggle={() => setShowToast(false)}>{toastMessage}</ToastHeader>
          </Toast>
        </Fade>
      </div>

      <Modal isOpen={passwordModalOpen} toggle={togglePasswordModal}>
        <ModalHeader toggle={togglePasswordModal}>Change Password</ModalHeader>
        <ModalBody>
          <div className="mb-3">
            <label htmlFor="oldPassword" className="form-label">
              Old Password
            </label>
            <input
              type="password"
              className="form-control"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {passwordError && (
            <div className="text-danger">
              Old password is incorrect or new password and confirm password do not match.
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={togglePasswordModal}>
            Cancel
          </Button>
          <Button color="primary" onClick={handlePasswordUpdate}>
            Update
          </Button>
        </ModalFooter>
      </Modal>
    </Row>
  );
};

export default Settings;
