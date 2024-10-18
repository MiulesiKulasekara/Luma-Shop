import { Nav, NavItem, NavbarBrand } from "reactstrap";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../core/services/user/user";
import { useCookies } from "react-cookie";
import { UserRoleEnum } from "../enums/Enum";

const Sidebar = () => {
  const { id } = useParams();

  const [cookies] = useCookies(["USER_ID"]);
  const userId = cookies.USER_ID || "";
  const { data } = useGetUserByIdQuery({ userId: userId });

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  let location = useLocation();

  const [activeItem, setActiveItem] = useState("dashboard");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  useEffect(() => {
    const getActiveItem = (location) => {
      if (location.pathname === "/dashboard") {
        setActiveItem("dashboard");
      }
      if (
        location.pathname === "/admin/users" ||
        location.pathname === "/admin/users/add" ||
        location.pathname === "/admin/users/roles" ||
        location.pathname === `/admin/users/update/${id}`
      ) {
        setActiveItem("users");
      }
      if (
        location.pathname === "/admin/product/list" ||
        location.pathname === "/admin/product/list/add" ||
        location.pathname === `/admin/product/list/update/${id}`
      ) {
        setActiveItem("productlist");
      }
      if (
        location.pathname === "/admin/product" ||
        location.pathname === "/admin/product/add" ||
        location.pathname === `/admin/product/update/${id}`
      ) {
        setActiveItem("product");
      }
      if (
        location.pathname === "/admin/order" ||
        location.pathname === `/admin/order/update/${id}`
      ) {
        setActiveItem("order");
      }
      if (location.pathname === "/admin/vendor/ratings") {
        setActiveItem("vendorRatings");
      }
    };
    getActiveItem(location);
  }, [location, activeItem]);

  return (
    <div>
      <div className="d-flex align-items-center"></div>
      <div className="sidebarNav admin-side-bar">
        <Nav vertical className="sidebarNav mt-4">
          <NavItem
            className={`cursor-pointer ${
              activeItem === "dashboard"
                ? "sidenav-bg mb-4 sidebar-item-bg"
                : "sidenav-bg mb-4"
            }`}
          >
            <Link
              to={"/admin"}
              className={`cursor-pointer p-2 d-flex align-items-center text-decoration-none ${
                activeItem === "dashboard"
                  ? "side-bar-item-txt"
                  : "side-bar-item-txt-none"
              }`}
              onClick={() => handleItemClick("dashboard")}
            >
              <i className="bi bi-speedometer2 ms-4"></i>
              <span className="ms-3 d-inline-block">Dashboard</span>
            </Link>
          </NavItem>

          {data?.role !== UserRoleEnum.VENDOR && (
            <NavItem
              className={`cursor-pointer ${
                activeItem === "users"
                  ? "sidenav-bg mb-4 sidebar-item-bg"
                  : "sidenav-bg mb-4"
              }`}
            >
              <Link
                to={"/admin/users"}
                className={`cursor-pointer p-2 d-flex align-items-center text-decoration-none ${
                  activeItem === "users"
                    ? "side-bar-item-txt"
                    : "side-bar-item-txt-none"
                }`}
                onClick={() => handleItemClick("users")}
              >
                <i className="bi bi-people ms-4"></i>
                <span className="ms-3 d-inline-block">Users</span>
              </Link>
            </NavItem>
          )}

          <NavItem
            className={`cursor-pointer ${
              activeItem === "productlist"
                ? "sidenav-bg mb-4 sidebar-item-bg"
                : "sidenav-bg mb-4"
            }`}
          >
            <Link
              to={"/admin/product/list"}
              className={`cursor-pointer p-2 d-flex align-items-center text-decoration-none ${
                activeItem === "productlist"
                  ? "side-bar-item-txt"
                  : "side-bar-item-txt-none"
              }`}
              onClick={() => handleItemClick("productlist")}
            >
              <i className="bi bi-list-check ms-4"></i>
              <span className="ms-3 d-inline-block">Product List</span>
            </Link>
          </NavItem>

          <NavItem
            className={`cursor-pointer ${
              activeItem === "product"
                ? "sidenav-bg mb-4 sidebar-item-bg"
                : "sidenav-bg mb-4"
            }`}
          >
            <Link
              to={"/admin/product"}
              className={`cursor-pointer p-2 d-flex align-items-center text-decoration-none ${
                activeItem === "product"
                  ? "side-bar-item-txt"
                  : "side-bar-item-txt-none"
              }`}
              onClick={() => handleItemClick("product")}
            >
              <i className="bi-box-seam ms-4"></i>
              <span className="ms-3 d-inline-block">Product</span>
            </Link>
          </NavItem>

          <NavItem
            className={`cursor-pointer ${
              activeItem === "order"
                ? "sidenav-bg mb-4 sidebar-item-bg"
                : "sidenav-bg mb-4"
            }`}
          >
            <Link
              to={"/admin/order"}
              className={`cursor-pointer p-2 d-flex align-items-center text-decoration-none ${
                activeItem === "order"
                  ? "side-bar-item-txt"
                  : "side-bar-item-txt-none"
              }`}
              onClick={() => handleItemClick("order")}
            >
              <i className="bi bi-cart-check ms-4"></i>
              <span className="ms-3 d-inline-block">Order</span>
            </Link>
          </NavItem>

          <NavItem
            className={`cursor-pointer ${
              activeItem === "vendorRatings"
                ? "sidenav-bg mb-4 sidebar-item-bg"
                : "sidenav-bg mb-4"
            }`}
          >
            <Link
              to={"/admin/vendor/ratings"}
              className={`cursor-pointer p-2 d-flex align-items-center text-decoration-none ${
                activeItem === "vendorRatings"
                  ? "side-bar-item-txt"
                  : "side-bar-item-txt-none"
              }`}
              onClick={() => handleItemClick("vendorRatings")}
            >
              <i className="bi bi-star-half ms-4"></i>
              <span className="ms-3 d-inline-block">Vendor Ratings</span>
            </Link>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
