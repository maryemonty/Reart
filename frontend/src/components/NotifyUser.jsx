import { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { BiBell } from "react-icons/bi";

function NotifyUser() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle caret className="bg-transparent border-0 notify">
        <BiBell style={{ width: "32px", height: "32px" }} />
      </DropdownToggle>
      <DropdownMenu>
        <p>notifiche, colon ti ha messo like ole</p>
      </DropdownMenu>
    </Dropdown>
  );
}

export default NotifyUser;
