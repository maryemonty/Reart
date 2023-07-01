import { FaHome } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import logo from "../logo.png";
import { Link } from "react-router-dom";

function List({ icon: Icon, name, active }) {
  const classes = `nav-link d-flex align-items-center px-3 gap-3 ${active ? "border-active" : "border-no-active"}`;
  const iconStyle = active ? "icon-active my-2" : "icon my-2";
  return (
    <div className={classes}>
      <Icon className={iconStyle} /> {name}
    </div>
  );
}

function ListNames() {
  return (
    <>
      <Link to="/">
        <img className="logo mb-4" src={logo} alt="logo Reart" style={{ width: "200px" }} />
      </Link>
      <List icon={FaHome} name="Home" active={true} />
      <List icon={BiCategoryAlt} name="Categories" />
      <List icon={BsPlusLg} name="Submit" />
    </>
  );
}

function Sidebar() {
  return (
    <div className="d-flex flex-column">
      <ListNames />
    </div>
  );
}

export default Sidebar;
