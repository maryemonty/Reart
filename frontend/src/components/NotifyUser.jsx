import { useState, useEffect } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { BiBell } from "react-icons/bi";
import { useSelector } from "react-redux";

function NotifyUser() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.profile.id);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:8080/notifications/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Errore durante il recupero delle notifiche:", error);
      }
    };

    fetchNotifications();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  console.log(notifications, userId);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle caret className="bg-transparent border-0 notify">
        <BiBell style={{ width: "32px", height: "32px" }} />
      </DropdownToggle>
      <DropdownMenu>
        {notifications.length > 0 ? (
          notifications.map((notification) => <DropdownItem key={notification.id}>{notification.message}</DropdownItem>)
        ) : (
          <DropdownItem>Nessuna notifica</DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

export default NotifyUser;
