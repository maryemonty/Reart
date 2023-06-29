import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Join = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [joinModal, setJoinModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleJoinModal = () => {
    setJoinModal(!joinModal);
  };

  const handleJoin = (e) => {
    e.preventDefault();

    const loginData = {
      username: email,
      password: password,
    };

    fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((r) => {
        if (r.ok) {
          console.log("login effettuato", r);
          return r.json();
        } else {
          console.log(isLoggedIn);
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        console.log("Authentication token:", data.token);
      })
      .catch((error) => {
        console.log("Error during login:", error);
      });
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <img src={user.propic} alt="Profile" />
        </div>
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
                placeholder="Insert your email here"
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
                placeholder="Insert your password here"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <ModalFooter className="border-0">
              <Button onClick={toggleJoinModal} className="btn-join bg-transparent">
                Cancel
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
