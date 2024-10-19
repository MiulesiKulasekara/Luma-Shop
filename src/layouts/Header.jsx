import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import user1 from "../assets/images/users/user3.jpg";
import Logo from "./Logo";
import { UserRoleEnum } from "../enums/Enum";
import { useCookies } from "react-cookie";
import { useGetUserByIdQuery } from "../core/services/user/user";
import { requestForToken } from "../core/services/firebase/firebase";

const Header = () => {
  const [cookies, removeCookie] = useCookies(["AUTH_TOKEN_KEY", "USER_ID"]);
  const userId = cookies.USER_ID || "";
  const { data } = useGetUserByIdQuery({ userId: userId });
  const navigate = useNavigate();
  //console.log(data)

  const [isOpen, setIsOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const getDisplayName = () => {
    if (data?.role === UserRoleEnum.ADMIN || data?.role === UserRoleEnum.CSR) {
      return `${data.firstName} ${data.lastName}`;
    } else if (data?.role === UserRoleEnum.VENDOR) {
      return data.companyName;
    }
    return "";
  };

  const handleLogOut = () => {
    removeCookie('AUTH_TOKEN_KEY', { path: '/' });
    removeCookie('USER_ID', { path: '/' });
    navigate("/");
  };

  return (
    <Navbar dark expand="md" className="fix-header admin-header">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/">
          <div className="d-lg-block">
            <Logo />
          </div>
        </NavbarBrand>
        <Button color="primary" className=" d-lg-none" onClick={() => showMobilemenu()}>
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button color="primary" size="sm" className="d-sm-block d-md-none" onClick={Handletoggle}>
          {isOpen ? <i className="bi bi-x"></i> : <i className="bi bi-three-dots-vertical"></i>}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          {/* <NavItem>
            <Link to="/starter" className="nav-link">
              Starter
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </NavItem>
          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              DD Menu
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img src={user1} alt="profile" className="rounded-circle" width="45"></img>
            {data && <span className="ms-2 text-white">{getDisplayName()}</span>}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem>My Account</DropdownItem>
            <DropdownItem>Edit Profile</DropdownItem>
            <DropdownItem divider />
            {/*<DropdownItem>My Balance</DropdownItem>*/}
            {/*<DropdownItem>Inbox</DropdownItem>*/}
            <DropdownItem onClick={handleLogOut}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
