import { useState, useEffect } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { BiBell } from "react-icons/bi";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

function NotifyUser() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Nuovo stato per il caricamento
  const token = useSelector((state) => state.user.token);
  const decodedToken = token ? jwt_decode(token) : null;
  const email = decodedToken?.sub;

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setId(data.id);
        } else {
          throw new Error("Errore durante il recupero delle informazioni utente");
        }
      } catch (error) {
        console.log("Errore durante il recupero delle informazioni utente:", error);
      } finally {
        setIsLoading(false); // Imposta isLoading a false dopo il completamento della chiamata
      }
    };

    fetchUserId();
  }, [email]);

  useEffect(() => {
    if (!isLoading && id) {
      // Avvia il recupero delle notifiche solo se l'ID è disponibile e isLoading è false
      const fetchNotifications = async () => {
        try {
          const response = await fetch(`http://localhost:8080/notifications/${id}`, {
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
    }
  }, [id, isLoading, token]);

  if (isLoading || !id) {
    return null;
  }

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
