import { useState, useEffect, useContext } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import NotifyUser from "./NotifyUser";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  setNewEmail,
  setNewSurname,
  setNewName,
  setNewUsername,
  setNewId,
  setNewPropic,
  setNewRole,
} from "../redux/reducers";

function UserBar({ email }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [propic, setPropic] = useState("");
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { loggedOut } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:8080/users/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore durante il recupero delle informazioni utente");
        }
      })
      .then((data) => {
        setPropic(data.propic);
        setUsername(data.username);
        setId(data.id);

        dispatch(setNewId(data.id));
        dispatch(setNewUsername(data.username));
        dispatch(setNewName(data.name));
        dispatch(setNewSurname(data.surname));
        dispatch(setNewEmail(data.email));
        dispatch(setNewPropic(data.propic));
        dispatch(setNewRole(data.role));
      })
      .catch((error) => {
        console.log("Errore durante il recupero delle informazioni utente:", error);
      });
  }, [token, email]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logOut = () => {
    loggedOut();
  };

  return (
    <div className="d-flex">
      <NotifyUser />

      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="me-3">
        <DropdownToggle caret className="bg-transparent border-0">
          <img style={{ width: "50px" }} src={propic} alt="profile picture" className="rounded-circle img-fluid" />
        </DropdownToggle>
        <DropdownMenu className="default-bg-color">
          <DropdownItem>
            <Link to={"/profile/" + username} className="text-decoration-none white">
              <RiAccountCircleFill /> Account
            </Link>
          </DropdownItem>
          <DropdownItem className="text-decoration-none white">
            <Link to={"/settings/" + id} className="text-decoration-none white">
              <IoMdSettings /> Settings
            </Link>
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
