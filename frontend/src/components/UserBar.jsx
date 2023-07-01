import { useState, useEffect, useContext } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import NotifyUser from "./NotifyUser";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { useSelector } from "react-redux";

function UserBar({ email }) {
  const token = useSelector((state) => state.user.token);
  const [propic, setPropic] = useState("");
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { loggedOut } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:8080/users/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("siamo qui");
          return response.json();
        } else {
          throw new Error("Errore durante il recupero delle informazioni utente");
        }
      })
      .then((data) => {
        setPropic(data.propic);
        setUsername(data.username);
      })
      .catch((error) => {
        console.log("Errore durante il recupero delle informazioni utente:", error);
      });
  }, [token, email]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logOut = () => {
    // Esegui il logout chiamando la funzione handleLogout
    loggedOut();
  };

  return (
    <div className="d-flex">
      {/* /notify */}
      <NotifyUser />

      {/* user propic */}
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle caret className="bg-transparent border-0">
          <img style={{ width: "32px", height: "32px" }} src={propic} alt="profile picture" />
        </DropdownToggle>
        <DropdownMenu className="default-bg-color">
          <DropdownItem>
            <Link to={"/youraccount/" + username} className="text-decoration-none white">
              {" "}
              <RiAccountCircleFill /> Account
            </Link>
          </DropdownItem>
          <DropdownItem className="text-decoration-none white">
            <IoMdSettings /> Settings
          </DropdownItem>
          <hr></hr>
          <DropdownItem onClick={logOut} className="text-center white">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <p>
        Welcome back, <span className="text-capitalize">{username}</span>
      </p>
    </div>
  );
}

export default UserBar;
