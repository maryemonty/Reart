import { useContext, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch } from "react-redux";
import { setTokenRedux } from "../redux/reducers";
import { AuthContext } from "./AuthContext";
import UserBar from "./UserBar";

const Join = () => {
  const { isLoggedIn, setAuthState } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [joinModal, setJoinModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleJoinModal = () => {
    setJoinModal(!joinModal);
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
          console.log("Login effettuato", response);
          return response.json();
        } else {
          throw new Error("Login fallito");
        }
      })
      .then((data) => {
        console.log("Token di autenticazione:", data.token);
        dispatch(setTokenRedux(data.token)); // Utilizza useDispatch per chiamare l'azione setTokenRedux
        setAuthState(true, data.user);
        toggleJoinModal();
      })
      .catch((error) => {
        console.log("Errore durante il login:", error);
      });
  };

  return (
    <div>
      {isLoggedIn ? (
        <UserBar email={email} />
      ) : (
        <div className="d-flex justify-content-evenly buttons-user-join mb-5">
          <button className="bg-transparent btn-join fw-bold rounded" onClick={toggleJoinModal}>
            Join
          </button>
        </div>
      )}
      <Modal isOpen={joinModal} toggle={toggleJoinModal} contentClassName="default-bg-color">
        <ModalHeader className="border-0" toggle={toggleJoinModal}>
          Join
        </ModalHeader>
        <ModalBody className="border-0">
          <form onSubmit={handleJoin}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                placeholder="Inserisci la tua email qui"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                placeholder="Inserisci la tua password qui"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <ModalFooter className="border-0">
              <Button onClick={toggleJoinModal} className="btn-join bg-transparent">
                Close
              </Button>
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
