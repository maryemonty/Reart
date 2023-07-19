import { useContext, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch } from "react-redux";
import { setTokenRedux } from "../redux/reducers";
import { AuthContext } from "./AuthContext";
import UserBar from "./UserBar";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Join = () => {
  const { isLoggedIn, setAuthState } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [joinModal, setJoinModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);

  const toggleJoinModal = () => {
    setJoinModal(!joinModal);
    setErrors([]);
  };

  const handleJoin = (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
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
        console.log("Token di autenticazione:", data.token);
        dispatch(setTokenRedux(data.token));
        setAuthState(true, data.user);
        toggleJoinModal();
      })
      .catch((error) => {
        console.log("Errore durante il login:", error);
      });
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {isLoggedIn ? (
        <UserBar email={email} />
      ) : (
        <div className="d-flex justify-content-evenly buttons-user-join">
          <button className="bg-transparent btn-join fw-bold rounded" onClick={toggleJoinModal}>
            Join
          </button>
        </div>
      )}
      <Modal isOpen={joinModal} toggle={toggleJoinModal}>
        <ModalHeader className="border-0" toggle={toggleJoinModal}>
          Join
        </ModalHeader>
        <ModalBody className="border-0">
          <p className="text-danger">{errors}</p>
          <form onSubmit={handleJoin}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                placeholder="Email here"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <div className="position-relative">
                <input
                  placeholder="Password here"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <AiOutlineEyeInvisible
                    className="position-absolute top-50 translate-middle text-white fs-2"
                    style={{ left: "95%" }}
                    onClick={handlePasswordVisibility}
                  />
                ) : (
                  <AiOutlineEye
                    className="position-absolute top-50 translate-middle text-white fs-2"
                    style={{ left: "95%" }}
                    onClick={handlePasswordVisibility}
                  />
                )}
              </div>
            </div>
            <ModalFooter className="border-0">
              <Button type="submit" className="btn-default border-0">
                Join
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Join;
