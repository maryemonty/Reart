import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const SignUp = () => {
  const { isLoggedIn, user, setUser } = useContext(AuthContext);
  const [signUpModal, setSignUpModal] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [propic] = useState("");

  const toggleModal = () => {
    setSignUpModal(!signUpModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formValues = {
      name,
      surname,
      username,
      email,
      password,
      propic,
    };
    handleSignUp(formValues);
  };

  const handleSignUp = (values) => {
    const registrationData = {
      name: values.name,
      surname: values.surname,
      username: values.username,
      email: values.email,
      password: values.password,
      propic: values.propic,
    };

    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => {
        if (response.ok) {
          // Successful registration
          console.log("Registration submitted:", values);
          // Perform desired operations after registration
          // ...
        } else {
          throw new Error("Error during registration");
        }
      })
      .catch((error) => {
        // Handle registration error
        console.log("Error during registration:", error);
      })
      .finally(() => {
        toggleModal(); // Close the modal after registration
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
          <button type="button" className="border-0 bg-transparent btn-in" onClick={toggleModal}>
            Sign up
          </button>
        </div>
      )}

      <Modal isOpen={signUpModal} toggle={toggleModal} contentClassName="default-bg-color">
        <ModalHeader className="border-0" toggle={toggleModal}>
          Sign Up
        </ModalHeader>
        <ModalBody className="border-0">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                placeholder="Insert your name here"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="surname">Surname:</label>
              <input
                placeholder="Insert your surname here"
                type="text"
                id="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                placeholder="Insert your username here"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
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
              <Button onClick={toggleModal} className="btn-join bg-transparent">
                Cancel
              </Button>
              <Button type="submit" className="btn-default border-0">
                Sign Up
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SignUp;
